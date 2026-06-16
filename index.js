import express from "express";
import auth from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import notepad from "./notepad.js";
import isUserAllreadyLogin from "./middleware/isUserAllreadyLogin.js";
import errorHandle from "./middleware/error-handle.js";
import error404 from "./middleware/404-error.js";

const app = express();

app.use(cookieParser(process.env.COOKIE_SIGN_KEY));

app.use("/notepad", notepad);

app.all("/", isUserAllreadyLogin);

app.use("/auth", auth);

app.use([
	express.static("public"),
	error404,
	errorHandle
]);

app.listen(process.env.PORT, async err => {
	if (err) {
		console.log(err.message);
		return;
	}
	console.log(`Server is listen on port ${process.env.PORT}`);
});