console.log("preview")
const url = window.location.href
const url_data = url.replace('preview', 'data', 1)
$.ajax({
    type: 'GET',
    url: url_data,
    success: function(response) {
        console.log(response);
        document.getElementsByClassName("name")[0].textContent = response["title"];
        document.getElementsByClassName("title")[0].textContent = "Тема: " + response["topic"];
        document.getElementsByClassName("difficulty")[0].textContent = "Сложность: " + response["difficulty"];
        document.getElementsByClassName("question-count")[0].textContent = "Количество вопросов: " + response["length"];

        var qrcode = new QRCode("qrcode", {
            text: url,
            width: 300,
            height: 300,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        const back_button = document.getElementsByClassName("back-button")[0];
        const again_button = document.getElementsByClassName("again-button")[0];

        back_button.addEventListener("click", function (e) {
            window.location.replace(url.replace('preview', 'solve', 1));
        });


        again_button.addEventListener("click", function (e) {
             location.reload();
        });
    }
});