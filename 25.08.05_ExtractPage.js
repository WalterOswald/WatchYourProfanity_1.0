
let dynamic_html_content;


document.getElementById("export").addEventListener("click", () => {
    document.querySelector('#preview').querySelectorAll('img').forEach((e) => {



    });
})





function gatherHtmlElms() {

    const images = document.querySelector('#preview').querySelectorAll('img')


    images.forEach((e) => {


        dynamic_html_content += e.outerHTML;
        console.log("outerhtml" + e.outerHTML);

    });

}
// Use: outerHTML property // cloneNode() method


function dynamic_text() {
    gatherHtmlElms();
    return dynamic_html_content;
}

function download_file(name, contents, mime_type) {
    mime_type = mime_type || "text/html";

    var blob = new Blob([contents], { type: mime_type });

    var dlink = document.createElement('a');
    dlink.download = name;
    dlink.href = window.URL.createObjectURL(blob);
    dlink.onclick = function (e) {
        // revokeObjectURL needs a delay to work properly
        var that = this;
        setTimeout(function () {
            window.URL.revokeObjectURL(that.href);
        }, 1500);
    };

    dlink.click();
    dlink.remove();
    console.log(dynamic_html_content + "test");
    //console.log("click")
}













