const createUserValidator = ({ countryCode, whatsappNumber, otp }) => {
   if ((!(+countryCode) || !whatsappNumber) || (otp.length !== 6) || (whatsappNumber.length > 12 || whatsappNumber.length < 8)) {
      throw {
         status: 401,
         message: "Auth Faild"
      };
   }
}

const loginAndSignupValidator = ({ countryCode, whatsappNumber, password }) => {
   if (! +countryCode || !whatsappNumber) {
      throw {
         status: 401,
         message: "Auth Faild"
      };
   }

   if (whatsappNumber.length > 12 || whatsappNumber.length < 8) {
      throw {
         status: 401,
         message: "Auth Faild"
      };
   }

   if (password.length < 8) {
      throw {
         status: 401,
         message: "Auth Faild"
      };
   }
}



export { createUserValidator, loginAndSignupValidator }