import { createNoteValidator, deleteNoteValidator, updateNoteValidator } from "../validator/note.validator.js";

class createNoteSchema {
   constructor({ title, content }) {
      title = title.trim();
      createNoteValidator({ title, content });
      this.title = title;
      this.content = content;
   }
}

class deleteNoteSchema {
   constructor({ title }) {
      title = title.trim();
      deleteNoteValidator({ title });
      this.title = title;
   }
}

class updateNoteSchema {
   constructor({ title, content }) {
      title = title.trim();
      updateNoteValidator({ title, content });
      this.title = title;
      this.content = content;
   }
}

export { updateNoteSchema, createNoteSchema, deleteNoteSchema }