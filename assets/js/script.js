var headerEl = document.querySelector("#head");
var answerListEl = document.querySelector("#answerList");
var pageContentEl = document.querySelector(".page-content");
var timerEl = document.getElementById('timer');
var btnEl = document.querySelector(".btn");
var buttonEl = document.createElement("button");
var questionEl = document.querySelector(".question");
btnEl.appendChild(buttonEl);
buttonEl.className ="btn";
buttonEl.textContent = "Start Quiz!"
timerEl.textContent = "Time: " + 0;
var currentQuestion = null;
var statusEl = document.querySelector("#status");


var timeLeft = 0;

var testQuestions = [
    {
        question: "Who is Tidus's Father in Final Fantasy X?",
        answers: ["Jehct", "Braska", "Auron", "Lulu"],
        correctAnswer: "Jehct",
        id: 0,
        
    },
    {
        question: "What is the name of Cloud's sword in Final Fantasy 7?",
        answers: ["BrotherHood", "Excalibur", "Buster Sword", "Masamune"],
        correctAnswer: "Buster Sword",
        id: 1,
    },
    {
        question: "Which two classes were in Final Fantasy 1?",
        answers: ["Warrior, Bard", "Red Mage, Blue Mage", "Dragoon, White Mage", "Black Mage, Theif"],
        correctAnswer: "Black Mage, Theif",
        id: 2,
    },
    {
        question: "What are the real game numbers of the First 3 Final Fantasy games that came out in America?",
        answers: ["2, 5, 6", "1, 4, 6", "1, 2, 3", "1, 3, 4"],
        correctAnswer: "1, 4, 6",
        id: 3,
    },
    {
        question: "The song 'Melodies of Life' came from which Final Fantasy?",
        answers: ["Final Fantasy 7", "Final Fantasy 8", "Final Fantasy 9", "Final Fantasy 10"],
        correctAnswer:"Final Fantasy 9",
        id: 4,

    }
];
console.log(testQuestions.length);




var countdown = function(){
    timeLeft += 75;
    timerEl.textContent = "Time: " + timeLeft;
    var timeInterval = setInterval(function(){
        timeLeft--
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft < 0){
            endGame();
        }
    }, 1000);

    
}


var startUp = function(){
    
    headerEl.textContent = "Final Fantasy Quiz!";
    var paragraphEl = document.createElement("p");
    questionEl.appendChild(paragraphEl);
    paragraphEl.textContent = "Welcome to the Final Fantasy JavaScript code quiz. Please click the start button below to start the quiz. You will have 75 seconds to complete the quiz. Keep in mind that getting a wrong answer will penalize you 10 seconds each."
    
    btnEl.addEventListener("click", function(){
        paragraphEl.textContent = "";
        
        countdown();
        if(btnEl.after){
            btnEl.remove();
            displayQuestion(testQuestions[0]);
        }
    })
    


};

var answerQuestion = function(question, answer){
    if(question.correctAnswer === answer){
        displayQuestion(testQuestions[question.id+1], "Correct!");
        
        
    } else{
        timeLeft -= 10;
        displayQuestion(testQuestions[question.id+1], "Wrong!" );
        
    }

}

var randomQuestion = function(question){
    
    return question[question.length * Math.random() | 0];
}

var getAnswers = function(id){
    
}

var buttonListener = function(question, answer){
    return function(){
        answerQuestion(question, answer);
    };
}

var displayQuestion = function(question, status){
    //need to create an ordered list for all the buttons.
    if(!question){
        return endGame();
    }
    answerListEl.innerHTML = "";

    for(var i = 0; i < question.answers.length; i++){
        var answer = question.answers[i]; 
        var button = document.createElement("button");
        button.addEventListener("click", buttonListener(question, answer)) 
        button.textContent = answer;
        var listEl = document.createElement("li");
        listEl.appendChild(button);
        answerListEl.appendChild(listEl);
    } 

    headerEl.textContent = question.question;
    
    
    if(status){
        statusEl.textContent = status
    }
               
}

var endGame = function(number){
    clearInterval(timeInterval);
    var score = timeLeft;
    if(timeLeft < 1){
        return highScore();
    }
    

}

var highScore = function(){

}
        
        
startUp();



    






