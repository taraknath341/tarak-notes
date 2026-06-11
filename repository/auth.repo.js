import connectDB from "../database/connectDB.js";

let db = null;

// get DB
(async () => {
   db = await connectDB();
})();

// repo

// Create User Repo
const getOtpDocumentRepo = async ({ whatsappNumber, countryCode }) => {
   const find_data = await db.tarakprogram.collection("otp").findOne({
      whatsappNumber,
      countryCode
   }, {
      projection: ["otp", "password"]
   });
   return find_data;
}

const createAccountRepo = async ({ countryCode, whatsappNumber, password }) => {
   await db.tarakprogram.collection("account").insertOne({
      countryCode, whatsappNumber, password
   });
}

const deleteAccountRepo = async ({ countryCode, whatsappNumber }) => {
   await db.tarakprogram.collection("account").deleteOne({
      countryCode, whatsappNumber
   });
}

// login repo

const getUserAccountPasswordRepo = async ({ whatsappNumber, countryCode }) => {
   const userAccountInfo = await db.tarakprogram.collection("account").findOne({
      whatsappNumber, countryCode
   }, {
      projection: ["password"]
   });
   return userAccountInfo;
}

// signup repo

const deleteOtpDocumentRepo = async ({ whatsappNumber, countryCode }) => {
   await db.tarakprogram.collection("otp").deleteMany({
      whatsappNumber, countryCode
   });
}

const createOtpDocumentRepo = async ({ whatsappNumber, countryCode, otp, password, expiresAt }) => {
   await db.tarakprogram.collection("otp").insertOne({
      whatsappNumber, countryCode, otp, password, expiresAt
   });
}

export {
   getOtpDocumentRepo, createAccountRepo, deleteAccountRepo,
   getUserAccountPasswordRepo,
   deleteOtpDocumentRepo, createOtpDocumentRepo
}