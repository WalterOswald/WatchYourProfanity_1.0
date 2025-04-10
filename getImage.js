
let count = 0;
var images = ["IMG/IMGCount.png",
    "IMG/IMGCount2.png",
    "IMG/IMGCount3.png",
    "IMG/IMGCount4.png",
    "IMG/IMGCount5.png",];

function myImages() {

    document.getElementById("images").src = images[count];



}

document.addEventListener('mousedown', function (event) {

    myImages()
    console.log(count);
    count++


    if (count > 4) {
        count = 0
    }

});