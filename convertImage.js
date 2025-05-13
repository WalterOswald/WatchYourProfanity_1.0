export default async function resizeImage(file, size) {
    size ??= 1080

    //size = 800
    //console.log(size + " size 1")
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = size
    canvas.height = size
    console.log(" Cwidth 1" + canvas.width)
    console.log(" Cheight 1" + canvas.height)

    const bitmap = await createImageBitmap(file)
    const { width, height } = bitmap

    const ratio = Math.max(size / width, size / height)
    console.log("size" + size + "/" + "Cwidth" + width + "=" + size / width)
    console.log(ratio + "ratio")

    // const newWidth = (size - (width * ratio)) / 2
    // const newHeight = (size - (height * ratio)) / 2

    canvas.width = (width * ratio);
    canvas.height = (height * ratio);



    console.log(canvas.width + "cWidth1")
    console.log(canvas.height + "cHeight2")

    const x = (size - (width * ratio)) / 2
    const y = (size - (height * ratio)) / 2

    console.log(canvas.width + "cWidth2")
    console.log(canvas.height + "cHeight2")
    //console.log(size + "size 3")
    console.log(x + "x")
    console.log(y + "y")
    console.log("width " + width)
    console.log("heigth " + height)


    ctx.drawImage(bitmap, 0, 0, width, height, x, y, canvas.width, canvas.height)

    //


    return new Promise(resolve => {
        canvas.toBlob((blob) => {
            console.log(blob)
            resolve(blob);

        }, 'image/webp', 1)
        //
    });

}

