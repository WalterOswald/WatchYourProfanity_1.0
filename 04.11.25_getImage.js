
let myImages = []
let count = 0;

let fileInput = document.getElementById("fileElem"),
    preview = document.getElementById("preview"),
    fileList = document.getElementById("fileList");

console.log(fileInput)


fileInput.addEventListener("change", handleFiles, false);



function handleFiles(files) {
    //const fileList = this.files; /* now you can work with the file list */
    console.log(fileList)





    if (fileInput.multiple) {

        for (const file of fileInput.files) {

            myImages.push(fileInput.files)
        }

    } else {
        let [file] = fileInput.files;
    }



    console.log(myImages.length)
    const list = document.createElement("ul");
    fileList.appendChild(list);

    for (let i = 0; i < myImages.length; i++) {

        const li = document.createElement("li");
        list.appendChild(li);

        console.log(i)

        const img = document.createElement("img");
        img.src = URL.createObjectURL(this.myImages[i]);
        img.height = 60;
        li.appendChild(img);
        //document.getElementById("preview").appendChild(img);
    }



}














// for (let i = 0; i < files.length; i++) {
//     const file = files[i];

//     if (!file.type.startsWith("image/")) {
//         continue;
//     }

//     const img = document.createElement("img");
//     img.classList.add("obj");
//     img.file = file;
//     document.getElementById('preview').appendChild(img);
//     // preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

//     const reader = new FileReader();
//     reader.onload = (e) => {
//         img.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
// }