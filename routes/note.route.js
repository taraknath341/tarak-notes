import express from "express";
import {
   createNoteControll, readNoteControll,
   updateNoteControll, deleteNoteControll
} from "../controllers/note.controller.js";
import COOKIE_VALIDATION_MIDDLEWARE from "../middleware/cookie-validation.js";
import contentEncrypt from "../middleware/content-encrypt.js";

const apiRoute = express.Router();

apiRoute.use([
   express.json(),
   COOKIE_VALIDATION_MIDDLEWARE,
   contentEncrypt
]);

// CRUD
apiRoute.route("/")
   .post(createNoteControll)
   .patch(readNoteControll) // জাতে browser থেকে request send করা না যায় তাই GET এর বদলে PATCH use করেছি । 
   .put(updateNoteControll)
   .delete(deleteNoteControll);

apiRoute.use((err, req, res, next) => {
   res.status(400).json({
      error: err.message
   });
});

export default apiRoute;