
let distance = 10


export const svgPoints = [];

//////////////////////////////////////////////////////////WORK_PIECE
export async function handleSVG(event) {

    const svgFiles = event.target.files;

    const svgBlob = new Blob(svgFiles, { type: "image/svg+xml" });

    const svgReader = new FileReader();


    const svgReaderResult = await new Promise((resolve, reject) => {
        svgReader.onload = () => resolve(svgReader.result);
        svgReader.onerror = reject;
        svgReader.readAsText(svgBlob);
    });


    var parser = new DOMParser();
    var doc = parser.parseFromString(svgReaderResult, "application/xml"); // image/svg+xml

    function convertString1(svgReaderResult) {

        const converted = svgReaderResult
            // close path for polygon
            .replace(/(<polygon[\w\W]+?)points=(["'])([\.\d- ]+?)(["'])/g, "$1d=$2M$3z$4")
            // don't close path for polyline
            .replace(/(<polyline[\w\W]+?)points=(["'])([\.\d-, ]+?)(["'])/g, "$1d=$2M$3$4")
            .replace(/<line[^>]*x1=["']([\d.]+)["'][^>]*y1=["']([\d.]+)["'][^>]*x2=["']([\d.]+)["'][^>]*y2=["']([\d.]+)["'][^>]*\/?>/g,
                (match, x1, y1, x2, y2) => {
                    return `<path d="M${x1} ${y1} L${x2} ${y2}" />`;
                })
            .replace(/poly(gon|line)/g, "path");

        return converted;
    }


    if (svgReaderResult.includes("polygon")) {
        console.log("polygon");
        var result = convertString1(svgReaderResult);
        var parsedDoc = new DOMParser().parseFromString(result, "image/svg+xml");
        await prcsPath(parsedDoc).then(() => {
            console.log("polygon Sucsessfuly processed and converted to path points");
        });

        alert("SVG✅LOADED");

    } else if (svgReaderResult.includes("line")) {
        console.log("line");
        var result = convertString1(svgReaderResult);
        var parsedDoc = new DOMParser().parseFromString(result, "image/svg+xml");
        await prcsPath(parsedDoc).then(() => {
            console.log("line Sucsessfuly processed and converted to path points");
        });

    } else if (svgReaderResult.includes("path")) {
        await prcsPath(doc);

    }
}














export async function prcsLine(doc) {
    let svgLine = doc.querySelector("svg line")
    console.log("type: Line")
}



export async function prcsPath(doc) {





    let numberOfSamples = 200 //imgArray.length;
    var bbox
    var svgPaths

    const hiddenSvg = document.getElementById("hidden-svg");
    hiddenSvg.innerHTML = "";


    hiddenSvg.appendChild(doc.documentElement);






    await new Promise((resolve) => {
        requestAnimationFrame(() => {
            svgPaths = document.querySelectorAll("#hidden-svg path")

            svgPaths.forEach((svgPath) => {
                bbox = svgPath.getBBox()

                const targetWidth = window.innerWidth;
                const targetHeight = window.innerHeight;

                const scaleX = targetWidth / bbox.width;
                const scaleY = targetHeight / bbox.height;
                const scale = Math.min(scaleX, scaleY);

                const translateX = 0 / bbox.x;
                const translateY = 0 / bbox.y;


                svgPath.setAttribute("transform", `translate(${translateX}, ${translateY}) scale(${scale})`);


                svgPoints.length = 0;
                const totalLength = svgPath.getTotalLength();


                for (let i = 0; i < numberOfSamples; i++) {

                    const distance = (i / (numberOfSamples)) * totalLength


                    const svgPts = svgPath.getPointAtLength(distance)

                    svgPoints.push({ x: svgPts.x * scale, y: svgPts.y * scale })
                    // document.body.innerHTML += `<div style = "position: absolute; left : ${svgPts.x * scale} top : ${svgPts.y * scale}; width: 20px; height:20px; background: black;"></div>`
                }

                resolve();
                alert("SVG✅LOADED");
            });

        });
    })









}

