export default async function resizeImage(file, sizeW, sizeH) {
    // sizeW ??= 2000
    //sizeH ??= 2000
    //console.log("size :" + size)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    console.log("sizeW :" + sizeW)
    console.log("sizeH :" + sizeH)

    canvas.width = sizeW
    canvas.height = sizeH

    console.log(" Cwidth 1 :" + canvas.width)
    console.log(" Cheight 1 :" + canvas.height)

    const bitmap = await createImageBitmap(file)
    const { width, height } = bitmap

    console.log(" Cwidth 2 :" + canvas.width)
    console.log(" Cheight 2 :" + canvas.height)

    const ratio = Math.max(sizeW / width, sizeH / height)

    console.log("ratio :" + ratio)

    // const newWidth = (size - (width * ratio)) / 2
    // const newHeight = (size - (height * ratio)) / 2

    canvas.width = (width * ratio);
    canvas.height = (height * ratio);



    console.log("cWidth3 :" + canvas.width)
    console.log("cHeight3 :" + canvas.height)


    const x = (sizeW - (width * ratio)) / 2;
    const y = (sizeH - (height * ratio)) / 2;

    console.log(x + "x")
    console.log(y + "y")
    console.log("width " + width)
    console.log("heigth " + height)


    ctx.drawImage(bitmap, 0, 0, width, height, x, y, canvas.width, canvas.height)

    //
    // let base64 = canvas.toDataURL("image/webp")//.split(";base64,")[1]
    // //console.log(base64)
    // var tempImg = document.createElement("img");
    // tempImg.onload = function () {
    //     document.body.appendChild(this);
    // }
    // // document.body.appendChild(tempImg);
    // tempImg.src = base64



    return new Promise(resolve => {




        let base64 = canvas.toDataURL("image/webp")//.split(";base64,")[1]
        resolve(base64)

        // canvas.toDataURL("image/webp")
        // // canvas.toBlob((blob) => {

        // //     const reader = new FileReader();
        // //     reader.onload = () => resolve(reader.result);
        // //     reader.readAsDataURL(blob);
        // //     console.log("reader result:" + resolve(reader.result))

        // // }, 'image/webp', 1)
        // // //
    });

}

