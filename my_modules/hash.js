async function textToHash(_hash) {
  // টেক্সট কে Uint8Array তে কনভার্ট করা
  const encoder = new TextEncoder();
  const data = encoder.encode(_hash);

  // SHA-256 দিয়ে hash করা
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // ArrayBuffer → Hex string এ কনভার্ট করা
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export default textToHash;

// My Code

// (async () => {
//   console.log(await textToHash("taraknath560"))
// })()