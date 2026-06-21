let CurrentTitle = null;

$(".panal-button").onclick = async e => {
   switch (e.target.className) {
      case "panal-hide-show": {
         showAndHideSidebar();
         break;
      }

      case "delete": {
         await deleteTitle(CurrentTitle);
         if (window.innerHeight > window.innerWidth && isSidebarHide) {
            showAndHideSidebar();
         }
         break;
      }

      case "save": {
         const content = $(".editor-input").value;
         await updateContent(CurrentTitle, content);
         if (window.innerHeight > window.innerWidth && isSidebarHide) {
            showAndHideSidebar();
         }
         break;
      }

      case "AI": {
         if (CurrentTitle == null) {
            $(".AI").innerHTML = "&#xf9f3;";
            setTimeout(() => {
               $(".AI").innerHTML = "&#x1025b;";
            }, 2000);
            return;
         }
         $("dialog.give-prompt-ai").setAttribute("open", "");
         break;
      }

      case "translate": {
         if (CurrentTitle == null) {
            $(".translate").innerHTML = "&#xf9f3;";
            setTimeout(() => {
               $(".translate").innerHTML = "&#xebbe;";
            }, 2000);
            return;
         }
         $("dialog.translate-dialog").setAttribute("open", "");
         break;
      }
   }
}

$(".sidebar").onclick = async e => {
   if (e.target.className === "note-title") {
      CurrentTitle = e.target.innerText;
      $(".editor-input").removeAttribute("disabled");
      noteItemFocus(e);
      await previewContent(e.target.innerText);
   }

   else if (e.target.className === "reload") {
      await previewTitle();
   }

   else if (e.target.className === "newNote") {
      if (window.innerHeight > window.innerWidth) {
         showAndHideSidebar();
      }
      $("dialog.create-note").setAttribute("open", "");
   }
}

$("dialog.create-note").onclick = async e => {
   if (e.target.value === "Cancel") {
      if (window.innerHeight > window.innerWidth && isSidebarHide) {
         showAndHideSidebar();
      }
      e.target.parentNode.removeAttribute("open");
   }

   else if (e.target.value === "Create") {
      const title = $("dialog.create-note input").value;
      const p = $("dialog.create-note p");
      if (!title) {
         p.innerText = "Plese Input a valid title";
         return;
      }
      p.innerText = "";
      $("dialog.create-note input").value = "";
      await createTitle(title, "Blank Text");
      if (window.innerHeight > window.innerWidth && isSidebarHide) {
         showAndHideSidebar();
      }
      e.target.parentNode.removeAttribute("open");
   }
}

$("dialog.give-prompt-ai").onclick = async e => {
   if (e.target.value === "Cancel") {
      if (window.innerHeight > window.innerWidth && isSidebarHide) {
         showAndHideSidebar();
      }
      e.target.parentNode.removeAttribute("open");
   }

   else if (e.target.value === "Create") {
      const aiPrompt = $("dialog.give-prompt-ai input").value;
      const p = $("dialog.give-prompt-ai p");
      if (!aiPrompt) {
         p.innerText = "Plese Input a valid title";
         return;
      }
      p.innerText = "";
      generateNoteWithAi(aiPrompt);
      $("dialog.give-prompt-ai input").value = "";
      e.target.parentNode.removeAttribute("open");
   }
}

$("dialog.translate-dialog").onclick = e => {
   if (e.target.value === "Cancel") {
      if (window.innerHeight > window.innerWidth && isSidebarHide) {
         showAndHideSidebar();
      }
      e.target.parentNode.removeAttribute("open");
   }

   else if (e.target.value === "Create") {
      const sourceLang = $$("dialog.translate-dialog select")[0].value;
      const targetLang = $$("dialog.translate-dialog select")[1].value;
      const text = $(".editor-input").value;
      translateNote({ text, targetLang, sourceLang });
      e.target.parentNode.removeAttribute("open");
   }
}