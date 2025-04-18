const fileSelect = document.getElementById("fileSelect"),//where you upload files
    fileElem = document.getElementById("fileElem"),//<input id="fileElem" type="file" multiple />
    preview = document.getElementById("preview"), slider1 = document.getElementById("slider1");//container

let ImgObjName = ""
let ImgObjWidth, ImgObjHeight, ImgObjBorderR





const ImgArray = [];

fileElem.addEventListener("change", handleFiles, false);



//the "change" listens to wether a file was uploaded, the handle files function then awaits an (event)
//in this case the "change" 

function handleFiles(event) {
    //creates an <ul> in the container "preview"
    const files = event.target.files;   //.files is a FileList object, holds the selected files.
    const list = document.createElement("ul");
    preview.appendChild(list);


    for (let i = 0; i < files.length; i++) {

        const imageObj = new imageObject(files[i], 150, 150);
        ImgObjName = ("ImgObj" + i)
        ImgArray.push(imageObj);
        imageObj.display(list);



        //const img = document.createElement("img");
        // img.src = URL.createObjectURL(this.files[i]);
        //img.height = 100;
        //ImgArray.push(img)
    }



}

class imageObject {




    constructor(file, ImgObjWidth = 20, ImgObjHeight = 20, ImgObjBorderR = 20) {
        this.file = file;
        this.img = document.createElement("img");
        this.img.src = URL.createObjectURL(file);
        this.img.width = ImgObjWidth;
        this.img.height = ImgObjHeight;
        this.ImgObjName = ImgObjName
        this.ImgObjBorderR = ImgObjBorderR


    }

    changeStyle(imgFocus) {
        this.imgFocus.setAttribute("style", "border-color:#FFFFFF;");
    }

    display(preview) {
        preview.appendChild(this.img);
        console.log(this.ImgObjName)
    }

}



