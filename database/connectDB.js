import { MongoClient } from "mongodb";

let db = null;

const connectDB = async () => {
   try {
      if (db != null) {
         return db;
      }
      const client = await MongoClient.connect(process.env.MONGODB_URL);
      console.log("Mongodb Connect Success");

      db = {
         tarakprogram: client.db("tarakprogram"),
         notepad: client.db("notepad")
      }

      await db.tarakprogram.collection("otp").createIndex(
         { expiresAt: 1 },
         { expireAfterSeconds: 0 }
      );

      return db;
   } catch (err) {
      console.log(err.message);
   }
}

export default connectDB;