console.log("preview")
const url = window.location.href
const url_data = url.replace('preview', 'data', 1)
$.ajax({
    type: 'GET',
    url: url_data,
    success: function(response) {

        var qrcode = new QRCode("qrcode", {
            text: url,
            width: 300,
            height: 300,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        console.log(qrcode);

//        const back_button = document.getElementsByClassName("back-button")[0];
//        const again_button = document.getElementsByClassName("again-button")[0];
//
//        back_button.addEventListener("click", function (e) {
//            window.location.replace(url.replace('preview', 'solve', 1));
//        });
//        document.querySelector(".main-logo").onclick = function () {
//            cur_loc = window.location.href.split("/");
//            window.location.replace(cur_loc.slice(0, 3).join("/"));
//        }
//
//        again_button.addEventListener("click", function (e) {
//            cur_loc = window.location.href.split("/");
//            window.location.replace(cur_loc.slice(0, 3).join("/"));
//        });
    }
});