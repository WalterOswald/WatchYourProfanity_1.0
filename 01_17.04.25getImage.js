const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    preview = document.getElementById("preview");



fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {


    const list = document.createElement("ul");
    preview.appendChild(list);
    for (let i = 0; i < this.files.length; i++) {
        const li = document.createElement("li");
        list.appendChild(li);

        const img = document.createElement("img");
        img.src = URL.createObjectURL(this.files[i]);
        img.height = 1 / 2;
        li.appendChild(img);
        const info = document.createElement("span");
        info.textContent = `${this.files[i].name}: ${this.files[i].size} bytes`;
        li.appendChild(info);
    }

}
