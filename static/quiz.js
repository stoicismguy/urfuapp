console.log("test12")
const url = window.location.href
const url_data = url.replace('solve', 'data', 1)
$.ajax({
    type: 'GET',
    url: url_data,
    success: function(response) {
        const data = response.data;
        console.log(response);
        const titleH = document.getElementById("quiz_title");
        const topicH = document.getElementById("quiz_topic");

        titleH.textContent = response.title;
        topicH.textContent = response.topic;

        const qTitle = document.getElementById("question_title");
        const aList = document.getElementById("answers_list");

        var current_question = 0
        upload_question(current_question);
        const data_send = {};
        data_send['length'] = response.data['length']

        function upload_question(current_question) {
            qTitle.textContent = response.data[current_question].title;
            aList.innerHTML = "";
            for (var i=0; i < response.data[current_question].answers.length; i++){
                const ans_text = response.data[current_question].answers[i];
                aList.innerHTML += `<li class="button-item"><button id="${i}"><span class="button-text">${ans_text}</span></button></li>`;
            }

            Array.from(aList.children).forEach(element => {
            const ans_button = element.children[0];
            ans_button.addEventListener("click", function (e) {
                data_send[data[current_question].title] = data[current_question].answers[Number(ans_button.id)];
                current_question += 1;
                if (current_question < data['length']) {
                    upload_question(current_question);
                }
                else {
                    console.log("enought questions")
                    sendData();

                }
                });
            });
        }
        const scrf = document.getElementsByName('csrfmiddlewaretoken')

        const sendData = () => {
            data_send['csrfmiddlewaretoken'] = scrf[0].value;
            const url_save = url.replace('solve', 'save/', 1);

            $.ajax({
                type: 'POST',
                url: url_save,
                data: data_send,
                success: function(response) {
                    const frame = document.getElementsByClassName("wrapper")[0];
                    frame.innerHTML = `<p class='question-text' id='question_title'>${response['user']}</p>`
                    frame.innerHTML += `<p class='question-text' id='question_title'>Ваш результат:</p>`
                    frame.innerHTML += `<p class='question-text' id='question_title'>${response['result']} / ${response['length']}</p>`
                    frame.innerHTML += `<p class='question-text' id='question_title' style="font-size: 60px"><b>${response['percentage']}%</b></p>`
                    frame.innerHTML += `<button class='back-button'><p>На главную</p></button>`
                    frame.innerHTML += `<button class='again-button'><p>Пройти заново</p></button>`

                    const back_button = document.getElementsByClassName("back-button")[0];
                    const again_button = document.getElementsByClassName("again-button")[0];

                    back_button.addEventListener("click", function (e) {
                        const current_url = window.location.href.split("/");
                        const arr = current_url.slice(0, 3).join("/");
                        console.log(arr);
                        window.location.replace(arr);
                    });


                    again_button.addEventListener("click", function (e) {
                         location.reload();
                    });
                }
            });
        }
    }
})