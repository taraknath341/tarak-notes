"use strict";
// ---------- Utility Encoders ----------
const _crypto_enc = new TextEncoder();
const _crypto_dec = new TextDecoder();
const _crypto_toBase64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const _crypto_fromBase64 = (b64) =>
	Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;
// ---------- Create AES Key from Custom String ----------
async function _crypto_makeKeyFromString(userKey) {
	const keyHash = await crypto.subtle.digest("SHA-256", _crypto_enc.encode(userKey));
	return await crypto.subtle.importKey("raw", keyHash, "AES-GCM", false, [
		"encrypt",
		"decrypt",
	]);
}

const CRYPTO = {
	// Encrypt Function
	encrypt: async (userKey, plainText) => {
		const aesKey = await _crypto_makeKeyFromString(userKey);
		const iv = crypto.getRandomValues(new Uint8Array(12));
		const encryptedBuffer = await crypto.subtle.encrypt(
			{ name: "AES-GCM", iv },
			aesKey,
			_crypto_enc.encode(plainText)
		);
		return `${_crypto_toBase64(iv)}:${_crypto_toBase64(encryptedBuffer)}`;
	},
	// Decrypt Function
	decrypt: async (userKey, encryptedText) => {
		const [ivB64, dataB64] = encryptedText.split(":");
		const aesKey = await _crypto_makeKeyFromString(userKey);
		const iv = new Uint8Array(_crypto_fromBase64(ivB64));
		const decryptedBuffer = await crypto.subtle.decrypt(
			{ name: "AES-GCM", iv },
			aesKey,
			_crypto_fromBase64(dataB64)
		);
		return _crypto_dec.decode(decryptedBuffer);
	}
}

export default CRYPTO;