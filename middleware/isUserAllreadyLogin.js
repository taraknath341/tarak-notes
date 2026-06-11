import jwt from "jsonwebtoken";

// user আগের থেকে লগইন আছে নাকি চেক করে 
const isUserAllreadyLogin = (req, res, next) => {
   try {
      jwt.verify(req.signedCookies.token, process.env.JWT_KEY);
      res.redirect("/notepad");
   } catch (err) {
      next();
   }
}

export default isUserAllreadyLogin;