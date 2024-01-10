console.log("base3.js");

document.addEventListener('DOMContentLoaded', function () {


//    $('.stat').on('click', function(){
////        console.log(this.getAttribute('id'));
//        parent = this.parentElement.parentElement.parentElement;
//        var url= window.location.href;
//        var link = url + parent.getAttribute('id') + '/statistics';
//        console.log(link);
//        window.location = link;
//    });


//    $('.del-button').on('click', function() {
//        window.myDialog.showModal();
//        pk = this.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
//        console.log(pk);
//        parent = this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("quiz-name")[0];
//        console.log(parent);
//        window.myDialog.getElementsByClassName("dialog-title")[0].textContent = parent.textContent;
//        $(".confirm").unbind("click");
//        $(".confirm").on('click', function() {
//            delete_data(pk);
//        });
//    });

    const delete_data = (pk) => {
        data_send = {}
        const scrf = document.getElementsByName('csrfmiddlewaretoken');
        console.log(scrf);
        data_send['csrfmiddlewaretoken'] = scrf[0].value;
        $.ajax({
            type: 'POST',
            data: data_send,
            url: window.location.href + pk + '/' + 'delete',
            success: function (response) {
                    location.reload();
                }
            });
    }

});