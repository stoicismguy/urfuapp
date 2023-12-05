console.log("works1")

document.addEventListener('DOMContentLoaded', function () {
    console.log("works1")

    question_list = document.getElementsByClassName("question-list")[0];
    add_question_btn = document.getElementsByClassName("add-question-btn")[0];
    remove_question_btn = document.getElementsByClassName("remove-question-btn");
    add_answer_btn = document.getElementsByClassName("add-answer-btn");
    remove_answer_btn = document.getElementsByClassName("remove-answer-btn");
    var buttons_array = [remove_question_btn, add_answer_btn, remove_answer_btn];

    add_question_btn.addEventListener("click", function (e) {
            new_question = document.createElement("li");
            new_question.innerHTML += `
                    <div class="question-wrapper">
                            <p>Вопрос</p>
                            <input type="text">
                            <p>Ответы</p>
                            <ul class="answer-list">
                                <li class="question-answer">
                                    <input type="text">
                                    <div class="title-input">
                                        <p class="right-ans">Правильный ответ</p>
                                        <input type="checkbox">
                                    </div>
                                    <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">
                                </li>
                            </ul>
                            <button class="add-answer-btn" onclick="add_answer()">Добавить ответ</button>
                            <button class="remove-question-btn">Удалить вопрос</button>
                        </div>`
            question_list.appendChild(new_question);

            update_binds();
        });
    update_binds();

    function remove_question(element) {
        current_li = element.parentElement.parentElement;
        question_list.removeChild(current_li);
    }

    function add_answer(element) {
        list = element.parentElement.getElementsByClassName("answer-list")[0];
        new_answer = document.createElement("li");
        new_answer.innerHTML += `<input type="text">
                            <div class="title-input">
                                <p class="right-ans">Правильный ответ</p>
                                <input type="checkbox">
                            </div>
                            <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">`;
        new_answer.classList += 'question-answer';
        list.appendChild(new_answer);
    }


    function update_binds() {

        Array.from(remove_question_btn).forEach(element => element.addEventListener("click", function (e) {
            console.log("print");
            current_li = element.parentElement.parentElement;
            question_list.removeChild(current_li);
        }));

        Array.from(add_answer_btn).forEach(element => {
            element.removeEventListener();
            element.addEventListener("click", function (e) {
            list = element.parentElement.getElementsByClassName("answer-list")[0];
            new_answer = document.createElement("li");
            new_answer.innerHTML += `<input type="text">
                                <div class="title-input">
                                    <p class="right-ans">Правильный ответ</p>
                                    <input type="checkbox">
                                </div>
                                <img class="remove-answer-btn" src="static/trash.svg" alt="" width="20">`;
            new_answer.classList += 'question-answer';
            list.appendChild(new_answer);
        })
        });

        Array.from(remove_answer_btn).forEach(element => element.addEventListener("click", function (e) {
        }));
    }
});