////////////////////////////////////////////–1Setup
import resizeImage from './convertImage.js';

const fileSelect = document.getElementById("fileSelect"),//where you upload files
    fileElem = document.getElementById("fileElem"),//<input id="fileElem" type="file" multiple />
    preview = document.getElementById("preview"), sliderW = document.getElementById("sliderW"),
    sliderX = document.getElementById("sliderX");



let sliderWidth, sliderPosX

let imgObjWidth, imgObjHeight, imgObjBorderRadious

//var images = [ "IMG/IMGCount.png", "IMG/IMGCount2.png", "IMG/IMGCount3.png", "IMG/IMGCount4.png", "IMG/IMGCount5.png"];

//const imgArray = ["IMG/IMGCount.png", "IMG/IMGCount2.png", "IMG/IMGCount3.png", "IMG/IMGCount4.png", "IMG/IMGCount5.png"];



const imgArray = []


////////////////////////////////////////////–2FileUpload


fileElem.addEventListener("change", handleFiles, false);
//the "change" listens to wether a file was uploaded, the handle files function then awaits an (event)
//in this case the "change" 



async function handleFiles(event) {


    const files = event.target.files;   //.files is a FileList object, holds the selected files.



    for (let i = 0; i < files.length; i++) {




        const dimensions = await getImageDimensions(files[i]);

        const resizedBase64 = await resizeImage(files[i], dimensions.width, dimensions.height);

        //const resizedFile = new File([resizedBase64], files[i].name, { type: 'image/webp' });
        const imageObj = new imageObject(resizedBase64, dimensions.width, dimensions.height);

        imageObj.name = "ImgObj-" + i
        imgArray.push(imageObj);
        imageObj.placeOnPage(preview);

    }



}


////////////////////////////////////////////–2.1//Get image Width/height

function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}








////////////////////////////////////////////–3ImageObjectConstructor


class imageObject {




    constructor(fileOrUrl, x, y, z) {
        //this.file = file;



        this.img = document.createElement("img");

        if (typeof fileOrUrl === "string") {
            this.img.src = fileOrUrl;
        } else {
            this.file = fileOrUrl;
            this.img.src = URL.createObjectURL(fileOrUrl);//fileOrUrl //
            console.log(this.img.src)
        }




        this.x = x
        this.y = y
        this.z = z
        this.style = {}
        this.vwValue
        this.vhValue        //generic atribute, can contain any style property 
        // this.img.style.borderRadius = ImgborderRadius
        this.img.style.position = "absolute"



    }

    ////////////////////////////////////////////–3.0ImageObjectActive/passive

    focusImage(elm) {
        var pos5 = 0, pos6 = 0, pos7 = 0, pos8 = 0;
        let isActive = false

        function klickOnImage(e) {
            e = e || window.Event;
            // get the mouse cursor position at startup:
            pos5 = e.clientX;
            pos6 = e.clientY;
            document.onclick = setImgAsActive;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }


        function setImgAsActive(e) {
            let isActive = true;
            console.log("yeyy")
        };

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






    setStyle(prop, units, value) {
        this.style[prop] = value + units        //Generic varaiables. This function generaly 
        this.img.style[prop] = value + units
        // console.log(this.x);
        //handles inputs for styling

    }

    setRandomPos() {
        this.x = getRandomInt(50);
        this.setStyle("left", "vw", this.x)

    }

    placeOnPage(elm) {

        for (let i = 0; i < imgArray.length; i++) {
            (this.img).id = 'IMG-Object' + i;


            this.dragElement(this.img);
            elm.appendChild(this.img);
            // console.log(this.name)
        }

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

// window.addEventListener("DOMContentLoaded", () => {
//     for (let i = 0; i < imgArray.length; i++) {
//         const imageObj = new imageObject(imgArray[i], 100, 100);
//         imageObj.setStyle("left", "vw", getRandomInt(50));
//         imageObj.name = "ImgObj-" + i;
//         imgArray.push(imageObj);
//         imageObj.placeOnPage(preview);

//     }
// });




// window.addEventListener("DOMContentLoaded", function (event) {

//     for (let i = 0; i < imgArray.length; i++) {
//         let initPosition = getRandomInt(50);
//         this.x = initPosition;
//         imgArray[i].setStyle("left", "vw", this.x);
//     }
// });




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}





