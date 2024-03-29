console.log("new3")

document.addEventListener('DOMContentLoaded', function () {
    question_list = document.getElementsByClassName("question-list")[0];

    document.querySelector(".main-logo").onclick = function () {
            cur_loc = window.location.href.split("/");
            window.location.replace(cur_loc.slice(0, 3).join("/"));
        }

    add_q_btn = document.getElementsByClassName("add-question-btn")[0];
    add_q_btn.onclick = function (e) {
        li_to_add = document.createElement('li');
        li_to_add.innerHTML += `
                    <div class="question-wrapper">
                        <div class="question-header">
                            <img src="static/trash.svg" alt="Удалить" width="30" class="delete_question">
                            <input type="text" class="question-text" placeholder="Введите текст вопроса">
                        </div>
                        <ul class="answer-list">
                            <li class="question-answer">
                                <div class="title-input">
                                    <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">
                                    <input type="checkbox" class="check-box">
                                </div>
                                <input type="text" placeholder="Введите текст здесь" class="answer-text">
                            </li>
                            <li class="question-answer">
                                <div class="title-input">
                                    <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">
                                    <input type="checkbox" class="check-box">
                                </div>
                                <input type="text" placeholder="Введите текст здесь" class="answer-text">
                            </li>
                            <li class="question-answer">
                                <div class="title-input">
                                    <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">
                                    <input type="checkbox" class="check-box">
                                </div>
                                <input type="text" placeholder="Введите текст здесь" class="answer-text">
                            </li>
                            <li class="question-answer">
                                <div class="title-input">
                                    <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">
                                    <input type="checkbox" class="check-box">
                                </div>
                                <input type="text" placeholder="Введите текст здесь" class="answer-text">
                            </li>
                            <img src="static/add-icon.svg" alt="" class="add-answer-btn" width="30" height="30">
                        </ul>
                    </div>
                `
        question_list.appendChild(li_to_add);
        add_ans_btn = question_list.lastChild.getElementsByClassName("add-answer-btn")[0];
        console.log(add_ans_btn);

        add_ans_btn.onclick = function (e) {
            ans_list =  e.target.parentElement.parentElement.getElementsByClassName("answer-list")[0];
            if (ans_list.childElementCount < 6){
                new_li = document.createElement("li");
                new_li.classList += "question-answer";
                new_li.innerHTML += `<div class="title-input">
                                        <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">
                                        <input type="checkbox" class="check-box">
                                    </div>
                                    <input type="text" placeholder="Введите текст здесь" class="answer-text">`;

                ans_list.insertBefore(new_li, ans_list.children[ans_list.childElementCount - 1]);
                current = ans_list.children[ans_list.childElementCount - 2];
                current_del_btn = current.getElementsByClassName("remove-answer-btn");
                Array.from(current_del_btn).forEach(element => {
                    element.addEventListener("click", function (e) {
                        if (element.parentElement.parentElement.parentElement.childElementCount > 3){
                            element.parentElement.parentElement.parentElement.removeChild(element.parentElement.parentElement);
                        }
                    });
                });
            }
        };

        delete_buttons = question_list.lastChild.getElementsByClassName("remove-answer-btn");
        Array.from(delete_buttons).forEach(element => {
            element.addEventListener("click", function (e) {
                console.log("here");
                if (element.parentElement.parentElement.parentElement.childElementCount > 3){
                    element.parentElement.parentElement.parentElement.removeChild(element.parentElement.parentElement);
                }
            });
        })

        delete_question = question_list.lastChild.getElementsByClassName("delete_question")[0];
        delete_question.onclick = function (e) {
            console.log(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.childElementCount);
            console.log(e.target.parentElement.parentElement.parentElement.parentElement);
            if (e.target.parentElement.parentElement.parentElement.parentElement.childElementCount > 1){
                e.target.parentElement.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement);
            }
        };
    };

    add_q_btn.click();

    send_button = document.getElementsByClassName("create-quiz")[0];
    send_button.addEventListener("click", function (e) {
        sendData();
    });

    const sendData = () => {
        data_send = {}
        const scrf = document.getElementsByName('csrfmiddlewaretoken');
        data_send['csrfmiddlewaretoken'] = scrf[0].value;
        const url_save = window.location.href + '/save/';

        data_send['title'] = document.getElementsByClassName("input-name")[0].value;
        data_send['topic'] = document.getElementsByClassName("input-topic")[0].value;
        data_send['difficulty'] = document.getElementsByClassName("input-difficulty")[0].value;
        data_send['time'] = document.getElementsByClassName("input-time")[0].value;

        questions_send = []
        Array.from(document.getElementsByClassName("question-list")[0].children).forEach(element => {
            console.log(element)
            data_q = {};
            data_q["name"] = element.getElementsByClassName("question-text")[0].value;
            answers = [];
            Array.from(element.getElementsByClassName("answer-list")[0].children).slice(0, element.getElementsByClassName("answer-list")[0].childElementCount - 1).forEach(ans => {
                console.log(ans);
                text = ans.getElementsByClassName("answer-text")[0].value;
                correct = ans.getElementsByClassName("check-box")[0].checked;
                to_push = {}
                to_push["text"] = text
                to_push["is_correct"] = correct
                answers.push(to_push);
            });
            data_q['answers'] = Array.from(answers);
            questions_send.push(data_q);
        });
        data_send['questions'] = JSON.stringify(Array.from(questions_send));

        $.ajax({
            type: 'POST',
            url: url_save,
            data: data_send,
            success: function (response) {
                console.log("good response");
                window.location.replace(window.location.href.replace("/create", "", 1));
            }
        });
    }
});

