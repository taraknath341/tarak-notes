import express from "express";
import apiRoute from "./routes/note.route.js";
import jwt from "jsonwebtoken";

const app = express.Router();

app.use((req, res, next) => {
	try {
		jwt.verify(req.signedCookies.token, process.env.JWT_KEY);
		next();
	} catch (err) {
		res.redirect("//" + req.host);
	}
});

app.use("/api", apiRoute);

export default app;