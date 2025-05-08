////////////////////////////////////////////–1Setup


const fileSelect = document.getElementById("fileSelect"),//where you upload files
    fileElem = document.getElementById("fileElem"),//<input id="fileElem" type="file" multiple />
    preview = document.getElementById("preview"), sliderW = document.getElementById("sliderW"),
    sliderX = document.getElementById("sliderX");



let sliderWidth, sliderPosX

let imgObjWidth, imgObjHeight, imgObjBorderRadious

var images = ["IMG/IMGCount.png", "IMG/IMGCount2.png", "IMG/IMGCount3.png", "IMG/IMGCount4.png", "IMG/IMGCount5.png"];

const imgArray = [];






////////////////////////////////////////////–2FileUpload


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








////////////////////////////////////////////–3ImageObjectConstructor


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
        this.style = {}
        this.vwValue
        this.vhValue        //generic atribute, can contain any style property 
        // this.img.style.borderRadius = ImgborderRadius
        this.img.style.position = "absolute"



    }







    ////////////////////////////////////////////–3.1ImageObject//DragElem


    dragElement(elm) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;



        // otherwise, move the DIV from anywhere inside the DIV:
        elm.onmousedown = dragMouseDown;


        function dragMouseDown(e) {
            e = e || window.Event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.Event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elm.style.top = (elm.offsetTop - pos2) + "px";
            elm.style.left = (elm.offsetLeft - pos1) + "px";

            //valuetoConvertX = (elm.offsetLeft - pos1) + "px";
            // valuetoConvertY = (elm.offsetTop - pos2) + "px";

            //vwValue = (elm.offsetLeft - pos1) + "px";//viewport_convert(valuetoConvertX, 0, 0);
            //vhValue = (elm.offsetTop - pos2) + "px";//viewport_convert(valuetoConvertY, 0, 0);

        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }










    ////////////////////////////////////////////–3.2ImageObject//vievportConvertValueVwPx


    viewport_convert(px = 0, vw = 0, vh = 0) {
        if (px != 0) {
            if (vw) {
                return (100 * px / window.innerWidth);
            } else {
                return (100 * px / window.innerHeight);
            }
        } else if (vw != 0 && vh != 0) {
            var w_h_arr = [];
            w_h_arr["width"] = Math.ceil((window.innerWidth * vw / 100));
            w_h_arr["height"] = Math.ceil((window.innerHeight * vh / 100));
            return w_h_arr;
        } else if (vw != 0) {
            return Math.ceil((window.innerWidth * vw / 100));
        } else if (vh != 0) {
            return Math.ceil((window.innerHeight * vh / 100));
        }
    }






    ////////////////////////////////////////////–3.3ImageObject//Functions






    placeOnPage(elm) {

        for (let i = 0; i < imgArray.length; i++) {
            this.img.id = 'IMG-Object' + imgArray.length;

            this.dragElement(this.img);
            (this.img).id = 'IMG-Object' + i;
            elm.appendChild(this.img);
            console.log(this.name)
        }

    }

    setStyle(prop, units, value) {
        this.style[prop] = value + units        //Generic varaiables. This function generaly 
        this.img.style[prop] = value + units
        console.log(this.x);
        //handles inputs for styling

    }



}







////////////////////////////////////////////–4Global Code// INPUT++GUI


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

    for (i = 0; i < imgArray.length; i++) {
        let initPosition = getRandomInt(50);
        this.x = initPosition;
        imgArray[i].setStyle("left", "vw", this.x);
    }
});




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}