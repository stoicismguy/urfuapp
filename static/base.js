console.log("base.js");

document.addEventListener('DOMContentLoaded', function () {


    $('.stat').on('click', function(){
//        console.log(this.getAttribute('id'));
        parent = this.parentElement.parentElement.parentElement;
        var url= window.location.href;
        var link = url + parent.getAttribute('id') + '/statistics';
        console.log(link);
        window.location = link;
    });

    $('.existing-item').on('click', function(){
//        console.log(this.getAttribute('id'));
        var url= window.location.href;
        window.location = url + this.getAttribute('id');
    });

});