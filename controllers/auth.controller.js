import jwt from "jsonwebtoken";
import { createUserSchema, loginAndSignupSchema } from "../schema/auth.schema.js";
import { loginService, signupService, createUserService } from "../service/auth.service.js";

const loginControll = async (req, res) => {
   const { whatsappNumber, countryCode, password } = new loginAndSignupSchema(req.body);
   await loginService({ whatsappNumber, countryCode, password });
   const token = jwt.sign(
      { whatsappNumber, countryCode },
      process.env.JWT_KEY
   );

   res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      signed: true
   });
   res.redirect("/");
}

const signupControll = async (req, res) => {
   const { whatsappNumber, countryCode, password } = new loginAndSignupSchema(req.body);
   await signupService({ whatsappNumber, countryCode, password });
   res.redirect(`/otp.html?whatsappNumber=${whatsappNumber}&countryCode=${countryCode}`);
};

const createUserControll = async (req, res) => {
   const { whatsappNumber, countryCode, otp } = new createUserSchema(req.body);
   await createUserService({ whatsappNumber, countryCode, otp });
   const token = jwt.sign(
      { whatsappNumber, countryCode },
      process.env.JWT_KEY
   );

   res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      signed: true
   });
   res.redirect("/");
}

export { signupControll, loginControll, createUserControll };