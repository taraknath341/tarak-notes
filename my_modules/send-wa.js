
async function sendWA(fullNumber, message) {
	const { ok } = await fetch('https://textsnap.in/api/send', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			number: fullNumber, // 91XXXXX (without +)
			type: 'text',
			message,
			instance_id: process.env.INSTANCE_ID_TEXTSNAP,
			access_token: process.env.ACCESS_TOKEN_TEXTSNAP
		})
	});
	return ok;
}

export default sendWA;

// (async function () {
//   await sendWA('919800457290', "I am Tarak 2");
// })()