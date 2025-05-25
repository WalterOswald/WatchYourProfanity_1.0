

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


    let svgPath = doc.querySelector("svg path")
    const totalLenght = svgPath.getTotalLength();
    let numberOfSamples = imgArray.length;



    document.getElementById("hidden-svg").appendChild(doc.documentElement);




    svgPoints.length = 0;

    for (let i = 0; i < numberOfSamples; i++) {

        const bbox = svgPath.getBBox()

        console.log("bbox: " + bbox)

        let scaleX = 100 / bbox.width;
        let scaleY = 100 / bbox.height;
        console.log("bbox width: " + bbox.width)

        const svgPts = svgPath.getPointAtLength(i * 2)
        svgPoints.push({ x: svgPts.x, y: svgPts.y })

        console.log("svgPoints after prcsPath result: " + svgPoints)

    }
    console.log("prcsPath is running")
}

// get bBox