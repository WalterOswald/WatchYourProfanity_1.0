

document.getElementById("export").addEventListener("click", () => {
    document.querySelector('#preview').querySelectorAll('img').forEach((e) => {



    });
})


//document.getElementById("export").addEventListener("click", download_file()) // Blob()



// Use: outerHTML property // cloneNode() method


function dynamic_text() {





    return "create your dynamic text here";
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

    console.log("click")
}






