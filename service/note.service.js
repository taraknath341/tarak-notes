import {
   createNoteRepo, readAllNoteRepo, readANoteRepo,
   updateNoteRepo, deleteNoteRepo
} from "../repository/note.repo.js";


const createNoteService = async (body) => {
   await createNoteRepo({
      username: body.username,
      body
   });
}

const readNoteService = async (body) => {
   if (body?.title) {
      const data = await readANoteRepo({
         username: body.username,
         title: body.title
      })
      return data;
   } else {
      const data = await readAllNoteRepo({
         username: body.username
      });
      return data;
   }
}

const updateNoteService = async (body) => {
   await updateNoteRepo({
      username: body.username,
      body
   });
}

const deleteNoteService = async (body) => {
   await deleteNoteRepo({
      username: body.username,
      body
   });
}

export {
   createNoteService, readNoteService,
   updateNoteService, deleteNoteService
}