var data = new Date("Jul 9, 2024 10:00:00").getTime();

var x = setInterval(function (){
    var now = new Date().getTime();

    var dist = data - now;

    var days = Math.floor(dist / (1000 * 60 * 60 * 24));
    var hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((dist % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

    if(dist < 0){
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Nos estamos viendo :)";
    }
}, 1000);