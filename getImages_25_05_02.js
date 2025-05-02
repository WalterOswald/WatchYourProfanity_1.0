const fileSelect = document.getElementById("fileSelect"),//where you upload files
    fileElem = document.getElementById("fileElem"),//<input id="fileElem" type="file" multiple />
    preview = document.getElementById("preview"), sliderW = document.getElementById("sliderW"),
    sliderX = document.getElementById("sliderX");
//container

//let ImgObjName = ""
let sliderWidth, sliderPosX

let imgObjWidth, imgObjHeight, imgObjBorderRadious

var images = ["IMG/IMGCount.png", "IMG/IMGCount4.png"];





const imgArray = [];

fileElem.addEventListener("change", handleFiles, false);



//the "change" listens to wether a file was uploaded, the handle files function then awaits an (event)
//in this case the "change" 
function handleFiles(event) {
    //GetSliderValue()
    //creates an <ul> in the container "preview"
    const files = event.target.files;   //.files is a FileList object, holds the selected files.



    for (let i = 0; i < files.length; i++) {

        const imageObj = new imageObject(files[i], 100, 100); // size is being set here

        imageObj.name = "ImgObj-" + i
        imgArray.push(imageObj);
        imageObj.placeOnPage(preview);  //on 

    }



}


class imageObject {




    constructor(fileOrUrl, imgObjWidth, imgObjHeight, imgObjBorderRadious) {
        //this.file = file;



        this.img = document.createElement("img");

        if (typeof fileOrUrl === "string") {
            this.img.src = fileOrUrl;
        } else {
            this.file = fileOrUrl;
            this.img.src = URL.createObjectURL(fileOrUrl);
        }





        // this.img.src = URL.createObjectURL(file);
        //this.img.width = imgObjWidth;
        //this.img.height = imgObjHeight;
        this.borderRadius = imgObjBorderRadious
        this.x
        this.y
        this.z
        this.style = {}             //generic atribute, can contain any style property 
        // this.img.style.borderRadius = ImgborderRadius
        this.img.style.position = "absolute"



    }





    placeOnPage(elm) {
        elm.appendChild(this.img);

        console.log(this.name)
    }

    setStyle(prop, units, value) {
        this.style[prop] = value + units        //Generic varaiables. This function generaly 
        this.img.style[prop] = value + units
        console.log(this.x);
        //handles inputs for styling

    }



}

//Global Code for INPUT
document.getElementById("sliderW").addEventListener("change", function (event) {
    sliderWidth = sliderW.value;

    imgArray[0].setStyle("width", "vw", sliderWidth) // here the setStyle() function dynamicaly 
});                                                  //gets filled with proppertys for prop-->width, units-->vw,value-->sldierWidth




document.getElementById("sliderX").addEventListener("change", function (event) {
    this.x = sliderX.value;

    imgArray[0].setStyle("left", "vw", this.x);
});




//Default Display setup/ global code

window.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < images.length; i++) {
        const imageObj = new imageObject(images[i], 100, 100);
        imageObj.name = "ImgObj-" + i;
        imgArray.push(imageObj);
        imageObj.placeOnPage(preview);
    }
});




window.addEventListener("DOMContentLoaded", function (event) {
    let initPosition = Math.random(20);
    this.x = initPosition;

    imgArray[0].setStyle("left", "vw", this.x);
});