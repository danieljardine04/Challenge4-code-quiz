var headerEl = document.querySelector("#head");
var answerListEl = document.querySelector("#answerList");
var pageContentEl = document.querySelector(".page-content");
var timerEl = document.getElementById('timer');
var buttonEl = document.createElement("button");
timerEl.textContent = "Time: " + 0;





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

var quizFlow = function(){
    startUp();

}

var startUp = function(event){
    
    headerEl.textContent = "Final Fantasy Code Quiz!";
    var paragraphEl = document.createElement("p");
    pageContentEl.appendChild(paragraphEl);
    paragraphEl.textContent = "Welcome to the Final Fantasy JavaScript code quiz. Please click the start button below to start the quiz. You will have 75 seconds to complete the quiz. Keep in mind that getting a wrong answer will penalize you 10 seconds each."
    pageContentEl.appendChild(buttonEl);
    buttonEl.textContent = "Start Quiz!"
    
    
    pageContentEl.addEventListener("click", function(){
        paragraphEl.textContent = "";
        headerEl.textContent = "";
        pageContentEl.remove(buttonEl);
        countdown();
        
    })
    
};


quizFlow();


    






