console.log("result")
url = window.location.href
url_req = url + "/data/"


document.addEventListener('DOMContentLoaded', function () {
    console.log(url_req);
    tbody = document.querySelector(".tbody");
    result_text = document.querySelector(".result_text");
    $.ajax({
    type: 'GET',
    url: url_req,
    success: function(response) {
        console.log(response);
        const data = response['data'];
        console.log(data)
        result_text.textContent = "Результат [из " + response['nums']  + "]"
        for (res of data){
            console.log(res);
            tbody.innerHTML += `<tr>
                    <td>${res['name']}</td>
                    <td>${res['time_day']}</td>
                    <td>${res['time_time']}</td>
                    <td>${res['score']}</td>
                </tr>`
            }
        }
    });
});