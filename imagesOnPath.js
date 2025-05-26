

import { imgArray } from "./getImages_25_05_02.js";
let distance = 10


export const svgPoints = [];





//fileSelect.addEventListener("change", handleSVG, false);


export async function handleSVG(event) {

    return new Promise((resolve) => {

        const svgFiles = event.target.files;

        const svgBlob = new Blob(svgFiles, { type: "image/svg+xml" });

        const svgReader = new FileReader(); //fires asyncronisly, meaning that it will independantly run and return, whilst other functions lower down the execution order will fire befor it.


        svgReader.addEventListener("load", () => {


            var parser = new DOMParser();
            var doc = parser.parseFromString(svgReader.result, "application/xml");//image/svg+xml

            console.log("svgReaderResult: " + svgReader.result)

            if (svgReader.result.includes("polygon")) {

                prcsPolygon(doc)


            } else if (svgReader.result.includes("line")) {

                prcsLine(doc)

            } else if (svgReader.result.includes("path")) {

                prcsPath(doc)

                console.log("result: " + svgPoints)
            }








            // console.log(svgReader.result)


            //includes to check file type



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

    document.getElementById("hidden-svg").appendChild(doc.documentElement);


    console.log(document.querySelector("svg"));      // should return <svg> element
    console.log(document.querySelector("svg path")); // check if it’s null


    let svgPath = document.querySelector("#hidden-svg path")


    const bbox = svgPath.getBBox()
    console.log("bboxw: " + bbox.width)
    console.log("bboxH: " + bbox.height)

    const targetWidth = window.innerWidth;
    const targetHeight = window.innerHeight


    const scaleX = bbox.width / targetWidth;
    const scaleY = bbox.height / targetHeight;
    const scale = Math.min(scaleX, scaleY);

    const translateX = -bbox.x;
    const translateY = -bbox.y;


    //svgPath.setAttribute("transform", `translate(${translateX}, ${translateY}) scale(${scale})`);





    svgPoints.length = 0;

    for (let i = 0; i < numberOfSamples; i++) {


        const svgPts = svgPath.getPointAtLength(i * 2)
        svgPoints.push({ x: (svgPts.x + translateX) * scale, y: (svgPts.y + translateY) * scale })




    }
}

// get bBox