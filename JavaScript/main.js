let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];

const Editor = toastui.Editor;

const editor = new Editor({
    el: document.querySelector("#editor"),
    height: "600px",
    initialEditType: "markdown",
    previewStyle: "vertical",
});
// editor.getHTML()
// editor.getMarkdown()

render();

function saveNote() {
    const title = document.getElementById("title").value;
    // const content = document.getElementById("content").value;
    const content = editor.getHTML();

    allMemo.push({ title, content, len: allMemo.length });

    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();
}

function render() {
    const display = document.getElementById("display");
    display.innerHTML = "";

    // // 최신 게시물이 위로 올라오도록
    // for (let i = allMemo.length; i > 0 ; i--) {
    //     // 아래와 유사 코드
    // }

    for (const item of allMemo) {
        const saveTitle = document.createElement("h2");
        const saveContent = document.createElement("div");
        const saveId = document.createElement("p");
        const deleteMemoBtn = document.createElement("button");

        saveTitle.textContent = item.title;
        saveContent.innerHTML = item.content;
        saveId.textContent = item.len + 1;
        deleteMemoBtn.textContent = "삭제";
        deleteMemoBtn.setAttribute("id", item.len);
        deleteMemoBtn.setAttribute("onclick", "remove()");

        display.appendChild(saveId);
        display.appendChild(saveTitle);
        display.appendChild(saveContent);
        display.appendChild(deleteMemoBtn);
    }
}

function remove() {
    // console.log(event.srcElement.id);
    // console.log(allMemo);
    const idx = allMemo.find(
        (item) => item.len == event.srcElement.id
    );
    if (idx) {
        allMemo.splice(
            allMemo.findIndex((item) => item.len == idx.len),
            1
        );
    }
    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();
}