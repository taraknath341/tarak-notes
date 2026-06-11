let isSidebarHide = false;
const showAndHideSidebar = () => {
  if (isSidebarHide) {
    $(".sidebar").style.width = "280px";
    isSidebarHide = false;
  } else {
    $(".sidebar").style.width = "0px";
    isSidebarHide = true;
  }
}

const noteItemFocus = (e) => {
  $$(".note-title").forEach(one => {
    one.style.backgroundColor = "var(--bg-primary)";
  })
  e.target.style.backgroundColor = "var(--bg-tertiary)";
  if (window.innerHeight > window.innerWidth) {
    showAndHideSidebar();
  }
}

const createNoteTitle = (title) => {
  // <div class="note-title">Welcome to NoteHub</div>

  const note_title = document.createElement("div");
  note_title.className = "note-title";
  note_title.innerText = title;
  return note_title;
}