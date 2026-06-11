import textToHash from "../my_modules/hash.js"
import { getOtpDocumentRepo, createAccountRepo, deleteAccountRepo, deleteOtpDocumentRepo, getUserAccountPasswordRepo, createOtpDocumentRepo } from "../repository/auth.repo.js";
import otpCreate from "../my_modules/create-otp.js";
import sendWA from "../my_modules/send-wa.js";

const loginService = async ({ whatsappNumber, countryCode, password }) => {
   const userAccountInfo = await getUserAccountPasswordRepo({ whatsappNumber, countryCode });
   if (await textToHash(password) !== userAccountInfo?.password) {
      throw {
         status: 401,
         message: "Auth Faild"
      };
   }
}

const createUserService = async ({ whatsappNumber, countryCode, otp }) => {
   const find_data = await getOtpDocumentRepo({
      whatsappNumber, countryCode
   });
   if (await textToHash(otp) !== find_data?.otp) {
      throw {
         status: 401,
         message: "Auth Faild"
      }
   }
   await deleteOtpDocumentRepo({ whatsappNumber, countryCode });
   await deleteAccountRepo({ countryCode, whatsappNumber });
   await createAccountRepo({
      countryCode, whatsappNumber,
      password: find_data.password
   });
}

const signupService = async ({ whatsappNumber, countryCode, password }) => {
   const otp = otpCreate();
   const isOk = await sendWA(countryCode + whatsappNumber, `Your Tarak Program login OTP is *${otp}*. Do not share it with anyone.`);
   if (!isOk) {
      throw {
         status: 500,
         message: "Server Error"
      };
   }
   await deleteOtpDocumentRepo({ whatsappNumber, countryCode });
   await createOtpDocumentRepo({
      whatsappNumber, countryCode,
      otp: await textToHash(otp),
      password: await textToHash(password),
      expiresAt: new Date(Date.now() + 2 * 60 * 1000) // 2 min
   });
}

export {
   loginService,
   signupService,
   createUserService
}