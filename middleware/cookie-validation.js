import jwt from "jsonwebtoken";

const COOKIE_VALIDATION_MIDDLEWARE = (req, res, next) => {
	try {
		const data = jwt.verify(req.signedCookies.token, process.env.JWT_KEY);
		const username = data?.countryCode + data?.whatsappNumber;
		req.body.username = username;
	} catch (err) {
		res.redirect("/");
	}
	next();
}

export default COOKIE_VALIDATION_MIDDLEWARE;