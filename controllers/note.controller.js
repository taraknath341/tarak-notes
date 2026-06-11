import {
   createNoteService, deleteNoteService,
   readNoteService, updateNoteService
} from "../service/note.service.js";

// Post Request
const createNoteControll = async (req, res) => {
   await createNoteService(req.body);
   res.status(200).json({
      message: "Created"
   });
}

// patch Request
const readNoteControll = async (req, res) => {
   const data = await readNoteService(req.body);
   res.json(data);
}

// Put request
const updateNoteControll = async (req, res) => {
   await updateNoteService(req.body);
   res.status(200).json({
      message: "updated"
   });
}

// delete Request
const deleteNoteControll = async (req, res) => {
   await deleteNoteService(req.body);
   res.status(200).json({
      message: "Deleted"
   });
}

export {
   createNoteControll, readNoteControll,
   updateNoteControll, deleteNoteControll
};