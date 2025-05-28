

import { imgArray } from "./getImages_25_05_02.js";
let distance = 10


export const svgPoints = [];





//fileSelect.addEventListener("change", handleSVG, false);


export async function handleSVG(event) {

    return new Promise((resolve) => {

        const svgFiles = event.target.files;

        const svgBlob = new Blob(svgFiles, { type: "image/svg+xml" });

        const svgReader = new FileReader(); //fires asyncronisly, meaning that it will independantly run and return, whilst other functions lower down the execution order will fire befor it.


        svgReader.addEventListener("load", async () => {


            var parser = new DOMParser();
            var doc = parser.parseFromString(svgReader.result, "application/xml");//image/svg+xml

            console.log("svgReaderResult: " + svgReader.result)

            if (svgReader.result.includes("polygon")) {

                prcsPolygon(doc)


            } else if (svgReader.result.includes("line")) {

                prcsLine(doc)

            } else if (svgReader.result.includes("path")) {

                await prcsPath(doc);

                console.log("result: " + svgPoints)
            }
            resolve()
        });
        svgReader.readAsText(svgBlob);



    })
}

export async function prcsPolygon(doc) {
    let svgPoly = doc.querySelector("svg polygon")

    console.log(svgPoly.points + "type: Polygon")
}



export async function prcsLine(doc) {
    let svgLine = doc.querySelector("svg line")
    console.log("type: Line")
}



export async function prcsPath(doc) {

    console.log("doc at start of prcsPath: " + doc)

    let numberOfSamples = imgArray.length;
    var bbox
    var svgPaths

    const hiddenSvg = document.getElementById("hidden-svg");
    hiddenSvg.innerHTML = "";


    hiddenSvg.appendChild(doc.documentElement);



    console.log(document.querySelector("svg"));
    console.log(document.querySelector("svg path"));


    await new Promise((resolve) => {
        requestAnimationFrame(() => {
            svgPaths = document.querySelectorAll("#hidden-svg path")

            svgPaths.forEach((svgPath) => {
                bbox = svgPath.getBBox()

                const targetWidth = window.innerWidth;
                const targetHeight = window.innerHeight

                const scaleX = bbox.width / targetWidth;
                const scaleY = bbox.height / targetHeight;
                const scale = Math.min(scaleX, scaleY);

                const translateX = 0 - bbox.x;
                const translateY = 0 - bbox.y;


                svgPath.setAttribute("transform", `translate(${translateX}, ${translateY}) scale(${scale})`);


                svgPoints.length = 0;
                const totalLength = svgPath.getTotalLength();
                for (let i = 0; i < numberOfSamples; i++) {

                    const distance = (i / (numberOfSamples - 1)) * totalLength
                    const svgPts = svgPath.getPointAtLength(distance)
                    svgPoints.push({ x: svgPts.x, y: svgPts.y })
                }

                resolve();

            });

        });
    })









}

// get bBox

// document.addEventListener('mousemove', function (event) {
//     console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
// });