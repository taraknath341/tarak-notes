const generateNoteWithAi = async (aiPrompt) => {
	try {
		// loading icon
		$(".AI").innerHTML = "&#xeca3;";
		const response = await fetch(`https://api.amitdas.site/WhatsAppAI/api/?text=${aiPrompt}`);
		if (!response.ok) {
			throw "client error: API is not working, res.ok is false"
		}
		const aiResponse = await response.text();
		$(".AI").innerHTML = "&#x1025b;";
		$(".editor-input").value = aiResponse;
	} catch (err) {
		$(".AI").innerHTML = "&#xfc75;";
		setTimeout(() => {
			$(".AI").innerHTML = "&#x1025b;";
		}, 2000)
		console.log(err);
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
			const p = $("dialog.create-note p");
			p.innerText = error;
			return;
		}
		await previewTitle();
	} catch (err) {
		console.log(err);
	}
}

const deleteTitle = async (title) => {
	try {
		if (!title) {
			throw "client error: title not found";
		}
		// loading icon
		$(".delete").innerHTML = "&#xeca3;";
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
			throw error;
		}
		// success icon
		$(".delete").innerHTML = "&#xfeb8;";
		setTimeout(() => {
			$(".delete").innerHTML = "&#xeb41;";
		}, 2000);
	} catch (err) {
		console.log(err);
		// error icon
		$(".delete").innerHTML = "&#xed65;";
		setTimeout(() => {
			$(".delete").innerHTML = "&#xeb41;";
		}, 2000);
	} finally {
		previewTitle();
	}
}

const updateContent = async (title, content) => {
	try {
		if (!title || !content) {
			throw "client error: title or content not found";
		}
		$(".save").innerHTML = "&#xeca3;";

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
			console.log(error);
		}
		const { message } = await res.json();
		console.log(message);
		// success icon
		$(".save").innerHTML = "&#xfeb8;";
		setTimeout(() => {
			$(".save").innerHTML = "&#xeb62;";
		}, 2000);

	} catch (err) {
		console.log(err);
		// faild icon
		$(".save").innerHTML = "&#xf16a;";
		setTimeout(() => {
			$(".save").innerHTML = "&#xeb62;";
		}, 2000);
	}
}

const previewContent = async (title) => {
	try {
		if (!title) {
			throw "client error: title not found";
		}
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
		console.log(err);
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
		console.log(err);
	}
}

previewTitle();