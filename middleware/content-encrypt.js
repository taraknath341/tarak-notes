import CRYPTO from "../my_modules/crypto.js";

export default async (req, res, next) => {
   if (req.body?.content) {
      req.body.content = await CRYPTO.encrypt(process.env.CRYPTO_KEY, req.body.content);
   }
   next();
}