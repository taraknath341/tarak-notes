import { createNoteValidator, deleteNoteValidator, updateNoteValidator } from "../validator/note.validator.js";

class createNoteSchema {
   constructor({ title, content }) {
      createNoteValidator({ title, content });
      this.title = title.trim();
      this.content = content;
   }
}

class deleteNoteSchema {
   constructor({ title }) {
      deleteNoteValidator({ title });
      this.title = title.trim();
   }
}

class updateNoteSchema {
   constructor({ title, content }) {
      updateNoteValidator({ title, content });
      this.title = title.trim();
      this.content = content;
   }
}

export { updateNoteSchema, createNoteSchema, deleteNoteSchema }