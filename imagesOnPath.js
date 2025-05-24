

import { imgArray } from "./getImages_25_05_02.js";

const templateShape = document.getElementById("svgShape"),
    halfLength = templateShape.getTotalLength() / 2,
    templateShapeMidPoint = templateShape.getPointAtLength(halfLength),
    fileSelect = document.getElementById("svgFileElem");
let distance = 10


export const svgPoints = [];





fileSelect.addEventListener("change", handleSVG, false);


async function handleSVG(event) {

    const svgFiles = event.target.files;

    const svgBlob = new Blob(svgFiles, { type: "image/svg+xml" });

    const svgReader = new FileReader();

    svgReader.addEventListener("load", (event) => {


        var parser = new DOMParser();
        var doc = parser.parseFromString(svgReader.result, "application/xml");//image/svg+xml



        if (svgReader.result.includes("polygon")) {
            let svgPoly = doc.querySelector("svg polygon")

            console.log(svgPoly.points + "type: Polygon")



        } else if (svgReader.result.includes("line")) {
            let svgLine = doc.querySelector("svg line")
            console.log("type: Line")



        } else if (svgReader.result.includes("path")) {


            return new promise
            let svgPath = doc.querySelector("svg path")
            const totalLenght = svgPath.getTotalLength();
            let numberOfSamples = imgArray.length;
            for (let i = 0; i < numberOfSamples; i++) {

                const svgPts = svgPath.getPointAtLength(i * 2)
                svgPoints.push({ x: svgPts.x, y: svgPts.y })



            }


            console.log(svgPoints + " type: Path")


        }


        console.log(svgReader.result)


        //includes to check file type





    });
    svgReader.readAsText(svgBlob);


}





// get bBox