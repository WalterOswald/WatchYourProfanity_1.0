
let count = 0;
const btn = document.querySelector('button');

var images = ["IMG/IMGCount.png",
    "IMG/IMGCount2.png",
    "IMG/IMGCount3.png",
    "IMG/IMGCount4.png",
    "IMG/IMGCount5.png",];


btn.addEventListener('click', () => {
    myImages("img")

});



function myImages(type) {

    let element = document.createElement("img");
    element.type = type;
    element.value = "img";
    document.body.appendChild(element);

    //document.getElementById("images").src = images[count];
    //count++
    //if (count > 4) {
    //   count = 0
    // }

}