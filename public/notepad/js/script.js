let CurrentTitle = null;

$(".panal-button").onclick = async e => {
  if (e.target.className === "panal-hide-show") {
    showAndHideSidebar();
  } else if (e.target.className === "delete") {
    await deleteTitle(CurrentTitle);
    if (window.innerHeight > window.innerWidth && isSidebarHide) {
      showAndHideSidebar();
    }
  } else if (e.target.className === "save") {
    const content = $(".editor-input").value;
    if (!content) {
      return;
    }
    await updateContent(CurrentTitle, content);
    if (window.innerHeight > window.innerWidth && isSidebarHide) {
      showAndHideSidebar();
    }
  }
}

$(".sidebar").onclick = async e => {
  if (e.target.className === "note-title") {
    CurrentTitle = e.target.innerText;
    $(".editor-input").removeAttribute("disabled");
    noteItemFocus(e);
    await previewContent(e.target.innerText);
  } else if (e.target.innerText === "Reload") {
    await previewTitle();
  } else if (e.target.innerText === "New Note") {
    if (window.innerHeight > window.innerWidth) {
      showAndHideSidebar();
    }
    $("dialog").setAttribute("open", "");
  }
}

$("dialog").onclick = async e => {
  if (e.target.value === "Cancel") {
    if (window.innerHeight > window.innerWidth && isSidebarHide) {
      showAndHideSidebar();
    }
    e.target.parentNode.removeAttribute("open");
  } else if (e.target.value === "Create") {
    const title = $("dialog input").value;
    const p = $("dialog p");
    if (!title) {
      p.innerText = "Plese Input a valid title";
      return;
    }
    p.innerText = "";
    $("dialog input").value = "";
    await createTitle(title, "Blank Text");
    if (window.innerHeight > window.innerWidth && isSidebarHide) {
      showAndHideSidebar();
    }
  }
}

const createTitle = async (title, content) => {
  try {
    const res = await fetch(`${window.location.origin}/notepad/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content
      })
    })
    if (res.status === 400) {
      const { error } = await res.json();
      const p = $("dialog p");
      p.innerText = error;
      return;
    }
    await previewTitle();
    $("dialog").removeAttribute("open");
  } catch ({ message }) {
    console.log(message);
  }
}

const deleteTitle = async (title) => {
  try {
    const res = await fetch(`${window.location.origin}/notepad/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title
      })
    })
    if (res.status === 400) {
      const { error } = await res.json();
      alert(error);
    }
    previewTitle();
  } catch ({ message }) {
    console.log(message);
  }
}

const updateContent = async (title, content) => {
  try {
    const res = await fetch(`${window.location.origin}/notepad/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content
      })
    })
    if (res.status === 400) {
      const { error } = await res.json();
      alert(error);
    }
    const { message } = await res.json();
    alert(message);
  } catch ({ message }) {
    console.log(message);
  }
}

const previewContent = async (title) => {
  try {
    const res = await fetch(`${window.location.origin}/notepad/api`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title
      })
    })
    if (res.status === 400) {
      const { error } = await res.json();
      alert(error);
    }
    const { content } = await res.json();
    $(".editor-input").value = content;
  } catch (err) {
    console.log(err.message);
  }
}

const previewTitle = async () => {
  try {
    const res = await fetch(`${window.location.origin}/notepad/api`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    if (res.status === 400) {
      const { error } = await res.json();
      alert(error);
    }
    const titles = await res.json();
    const sidebar_content = $(".sidebar-content");
    sidebar_content.innerText = $(".editor-input").value = "";
    CurrentTitle = null;
    $(".editor-input").setAttribute("disabled", "");
    titles.forEach(({ title }) => {
      sidebar_content.appendChild(createNoteTitle(title));
    })
  } catch (err) {
    console.log(err.message);
  }
}

previewTitle();