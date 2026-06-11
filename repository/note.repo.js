import connectDB from "../database/connectDB.js";
import CRYPTO from "../my_modules/crypto.js";
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "../schema/note.schema.js";

let db = null;

// get DB
(async () => {
   db = await connectDB();
})();

// এই নামের Note এর title Database এ allready exist করে নাকি চেক করে 
async function isNotepadTitleAllreadyExistChackerFromDatabase(username, title) {
   const findData = await db.notepad.collection(username).findOne({ title }, {
      projection: ["title"]
   });
   return findData == null ? false : true;
}

// main repo
const createNoteRepo = async ({ username, body }) => {
   const data = new createNoteSchema(body);
   if (await isNotepadTitleAllreadyExistChackerFromDatabase(username, data.title)) {
      throw new Error("Title Allready Exist");
   }
   await db.notepad.collection(username).insertOne(data);
}

const readAllNoteRepo = async ({ username }) => {
   let data = await db.notepad.collection(username).find({}, {
      projection: ["title"]
   })
      .toArray();
   data = data.map(iv => {
      delete iv._id;
      return iv;
   });
   return data;
}

const readANoteRepo = async ({ username, title }) => {
   const data = await db.notepad.collection(username)
      .findOne({ title }, {
         projection: ["content"]
      });
   delete data._id;
   data.content = await CRYPTO.decrypt(process.env.CRYPTO_KEY, data.content);
   return data;
}

const updateNoteRepo = async ({ username, body }) => {
   const { title, content } = new updateNoteSchema(body);
   // Title Not Exist নাকি চেক করে 
   if (!(await isNotepadTitleAllreadyExistChackerFromDatabase(username, title))) {
      console.log("Title Not Exist");
      throw new Error("Title Not Exist");
   }

   await db.notepad.collection(username).updateOne({ title }, {
      $set: { content }
   });
}

const deleteNoteRepo = async ({ username, body }) => {
   const data = new deleteNoteSchema(body);
   // Title Not Exist নাকি চেক করে 
   if (!(await isNotepadTitleAllreadyExistChackerFromDatabase(username, data.title))) {
      console.log("Title Not Exist");
      throw new Error("Title Not Exist");
   }
   await db.notepad.collection(username).deleteOne(data);
}

export {
   createNoteRepo, readAllNoteRepo, readANoteRepo,
   updateNoteRepo, deleteNoteRepo
}