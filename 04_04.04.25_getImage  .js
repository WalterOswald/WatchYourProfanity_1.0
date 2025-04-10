
let count = 0;
const btn = document.querySelector('button');

var images = ["IMG/IMGCount.png",
    "IMG/IMGCount2.png",
    "IMG/IMGCount3.png",
    "IMG/IMGCount4.png",
    "IMG/IMGCount5.png",];


btn.addEventListener('click', () => {
    myImages()

});



function myImages() {

    if (count < images.length) {

        let img = document.createElement("img");
        img.src = images[count];
        //element.type = type;

        document.body.appendChild(img);

        count++;
    }

    //document.getElementById("images").src = images[count];
    //count++
    //if (count > 4) {
    //   count = 0
    // }

}