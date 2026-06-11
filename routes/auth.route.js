import express from "express";
import { signupControll, loginControll, createUserControll } from "../controllers/auth.controller.js";

const auth = express.Router();

auth.use(express.urlencoded());

auth.post("/login", loginControll);

auth.post("/signup", signupControll);

auth.post("/create-user", createUserControll);

auth.get("/logout", (req, res) => {
   res.clearCookie("token");
   res.redirect("//" + req.host);
});

export default auth;