console.log("Hello first script")
const url = window.location.href + 'data'

$.ajax({
    type: 'GET',
    url: url,
    success: function(response) {
        const data = response.data;
        console.log(response);
        const titleH = document.getElementById("quiz_title");
        const topicH = document.getElementById("quiz_topic");

        titleH.textContent = response.title;
        topicH.textContent = response.topic;

        const qTitle = document.getElementById("question_title");
        const aList = document.getElementById("answers_list");

        qTitle.textContent = response.data[0].title;
        for (var i=0; i < response.data[0].answers.length; i++){
            const ans_text = response.data[0].answers[i];
            aList.innerHTML += `<li class="button-item"><button><span class="button-text">${ans_text}</span></button></li>`
        }
    }
})