const createNoteValidator = ({ title, content }) => {
   if (!title || !content) {
      throw new Error("title & content must be send");
   }
}

const deleteNoteValidator = ({ title }) => {
   if (!title) {
      throw new Error("title must be send");
   }
}

const updateNoteValidator = ({ title, content }) => {
   if (!title || !content) {
      throw new Error("title & content must be send");
   }
}

export { createNoteValidator, deleteNoteValidator, updateNoteValidator }