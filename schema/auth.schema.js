import { createUserValidator, loginAndSignupValidator } from "../validator/auth.validator.js";

class createUserSchema {
   constructor({ countryCode, whatsappNumber, otp }) {
      // Validate Data
      createUserValidator({ countryCode, whatsappNumber, otp });

      // Create Object
      this.whatsappNumber = whatsappNumber;
      this.countryCode = countryCode;
      this.otp = otp;
   }
}

class loginAndSignupSchema {
   constructor({ countryCode, whatsappNumber, password }) {
      // Validate Data
      loginAndSignupValidator({ countryCode, whatsappNumber, password });

      // Create Object
      this.whatsappNumber = whatsappNumber;
      this.countryCode = countryCode;
      this.password = password;
   }
}

export { createUserSchema, loginAndSignupSchema }