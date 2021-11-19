var headerEl = document.querySelector("#head");
var answerListEl = document.querySelector("#answerList");
var timerEl = document.getElementById('timer');
var button = document.createElement("<button class='btn'></button>");




var countdown = function(){
    var timeLeft = 75;
    timerEl.textContent = "Time: " + timeLeft;
    var timeInterval = setInterval(function(){
        timeLeft--
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft === -1){
            clearInterval(timeInterval);
            alert("You have lost the game.");
        }
    }, 1000);

    timeInterval;
}





