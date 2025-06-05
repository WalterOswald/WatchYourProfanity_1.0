////////////////////////////////////////////–1Setup
import resizeImage from './convertImage.js';

import { handleSVG, svgPoints } from './imagesOnPath.js';

const fileElem = document.getElementById("fileElem"),//<input id="fileElem" type="file" multiple />
    preview = document.getElementById("preview"), sliderW = document.getElementById("sliderW"),
    sliderZ = document.getElementById("sliderZ"), placeOnPath = document.getElementById("checkbox1"),
    svgFileElem = document.getElementById("svgFileElem");



let sliderWidth, sliderPosX

let imgObjWidth, imgObjHeight, imgObjBorderRadious
let activeImageObject = null;
let inActiveImageObject = null;
let gridMarginX = 5;
let gridMarginY
let ProcessNumber = 0
export const imgArray = [];


// window.onload = () => {
//     alert("This bitch ass program intends to chalange you. It intends you to say stuff like Fuck this or what the fuck is going on, whyy is it not working. It is my first atemot at creating any kind of 'real' software and a testiment to actual coders who get do do this shit every day. Its pretty fucking hard what they do. and then the software brakes and you, the user, gets mad because you find a stupid way of working with the software that brakes it beacuse fuck the software. be gratfull what code can do for you and bitch even thos it seems easy it is not. so the next time you get mad at a oiece of programming just shut the fuck up and try to do it yourself. ");
// };


////////////////////////////////////////////–2FileUpload


fileElem.addEventListener("change", handleFiles, false);
//the "change" listens to wether a file was uploaded, the handle files function then awaits an (event)
//in this case the "change" 



async function handleFiles(event) {


    const files = event.target.files;   //.files is a FileList object, holds the selected files.



    for (let i = 0; i < files.length; i++) {




        const dimensions = await getImageDimensions(files[i]);
        const resizedBase64 = await resizeImage(files[i], dimensions.width, dimensions.height);
        const imageObj = new imageObject(resizedBase64, dimensions.width, dimensions.height);

        imageObj.name = "ImgObj-" + i
        imageObj.setGridPos(imgArray.length);
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




    constructor(fileOrUrl, x, y, z, isActive) {
        //this.file = file;



        this.img = document.createElement("img");

        if (typeof fileOrUrl === "string") {
            this.img.src = fileOrUrl;
        } else if (typeof fileOrUrl === "img") {
            this.file = fileOrUrl;
            this.img.src = URL.createObjectURL(fileOrUrl);//fileOrUrl //

        }




        this.x = x
        this.y = y
        this.z = z
        this.style = {}
        this.vwValue
        this.vhValue        //generic atribute, can contain any style property 
        // this.img.style.borderRadius = ImgborderRadius
        this.img.style.position = "absolute"
        this.img.style.width = "5vw"
        this.img.style.height = "auto"
        this.isActive = false



    }

    ////////////////////////////////////////////–3.0ImageObjectActive/passive



    focusImage(elm) {
        activeImageObject = this;
        this.isActive = true;
        if (this.isActive) {
            this.setStyle("border", "px", 10)
            this.setStyle("border-style", "", "solid")
        }

    }

    unFocusImage(elm) {
        // inActiveImageObject = this;
        // this.isInActive = true

        this.setStyle("border", "px", 0)
        this.setStyle("border-style", "", "none")
        console.log("duble click")




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


            const newTop = elm.offsetTop - pos2;
            const newLeft = elm.offsetLeft - pos1;

            const topVH = viewport_convert(newTop, 0, 1)
            const leftVW = viewport_convert(newLeft, 1, 0)

            //DEBUG: redo in terms of function setStyle()
            elm.style.top = topVH + "vh"
            elm.style.left = leftVW + "vw"


        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }



        function viewport_convert(px = 0, vw = 0, vh = 0) {
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


    }

    setGridPos(index) {

        gridMarginX
        gridMarginY



        if ((index) * gridMarginX < 100) {

            this.x = index * gridMarginX;
            this.y = gridMarginY;

            this.setStyle("left", "vw", this.x);
            this.setStyle("top", "vh", this.y);
            console.log("under 20")

        } else if ((index + 1) * gridMarginX > 100) {



            gridMarginY = 20
            index = index - (20 * ProcessNumber);
            let j = (index + 1) * gridMarginX

            if (j > 100) {

                ProcessNumber++
                index = index - (20 * ProcessNumber);
            }


            this.x = index * gridMarginX;
            this.y = gridMarginY;

            this.setStyle("left", "vw", this.x);
            this.setStyle("top", "vh", this.y);
            console.log("over 20")
            gridMarginY = gridMarginY * ProcessNumber


        }



    }

    placeOnPage(elm) {



        if (checkbox1.checked) {

            svgFileElem.addEventListener("change", (event) => {
                handleSVG(event).then(() => {
                    console.log("svgPoints after handleSVG:", svgPoints);

                    for (let i = 0; i < imgArray.length; i++) {

                        const imgObj = imgArray[i];
                        const points = svgPoints[i];


                        console.log("i: " + i)
                        console.log("points:" + points)
                        console.log("pointsX: " + svgPoints[0].x + "pointsY: " + svgPoints[0].y)
                        imgObj.x = points.x
                        imgObj.y = points.y

                        //  imgObj.x = imgObj.x * 100
                        //imgObj.y = imgObj.y



                        const topVH = this.viewport_convert(imgObj.y, 0, 1)
                        const leftVW = this.viewport_convert(imgObj.x, 1, 0)

                        imgObj.setStyle("top", "vh", topVH)
                        imgObj.setStyle("left", "vw", leftVW)

                        // imgObj.setStyle("top", "px", imgObj.y)
                        // imgObj.setStyle("left", "px", imgObj.x)


                        imgObj.id = 'IMG-Object' + i;
                        imgObj.dragElement(imgObj.img);
                        imgObj.img.onclick = () => imgObj.focusImage(imgObj.img)
                        imgObj.img.onmouseleave = () => imgObj.unFocusImage(imgObj.img)
                        elm.appendChild(imgObj.img);
                        //console.log("svgPoints: " + svgPoints[i].x)
                    }

                });
            })

            console.log("checked")
        } else {

            this.setGridPos(elm)

            for (let i = 0; i < imgArray.length; i++) {



                (this.img).id = 'IMG-Object' + i;

                this.dragElement(this.img);
                this.img.onclick = () => this.focusImage(this.img)
                this.img.onmouseleave = () => this.unFocusImage(this.img)
                elm.appendChild(this.img);
                // console.log(this.name)
            }

        }




    }



}







////////////////////////////////////////////–4Global Code// INPUT++GUI


document.getElementById("sliderW").addEventListener("change", function (event) {
    sliderWidth = sliderW.value;
    if (!activeImageObject) {
        console.error("noImageLoaded");
    } else { activeImageObject.setStyle("width", "vw", sliderWidth) }

});

document.getElementById("sliderZ").addEventListener("change", function (event) {
    let sliderZval = sliderZ.value;
    if (!activeImageObject) {
        console.error("noImageLoaded");
    } else { activeImageObject.setStyle("z-index", "", sliderZval) }

});

document.getElementById("inputOffX").addEventListener("change", (event) => {
    gridMarginX = inputOffX.value

})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

for (let i = 0; i < imgArray.length; i++) {
    if (!activeImageObject) {
        console.error("noImageLoaded");
    } else {
        activeImageObject.setStyle("border", "px", 2);
        activeImageObject.setStyle("border", "px", 2)
    }
}



