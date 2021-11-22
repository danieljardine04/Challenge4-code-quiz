var headerEl = document.querySelector("#head");
var answerListEl = document.querySelector("#answerList");
var pageContentEl = document.querySelector(".page-content");
var timerEl = document.getElementById('timer');
var btnEl = document.querySelector(".btn");
var questionEl = document.querySelector(".question");
var highScoreEl = document.getElementById("viewScores");
var paragraphEl = document.getElementById("paragraph");

timerEl.textContent = "Time: " + 0;
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
var timeInterval;


var countdown = function(){
    timeLeft = 75;
    timerEl.textContent = "Time: " + timeLeft;
    timeInterval = setInterval(function(){
        timeLeft--
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft < 1){
            endGame(timeLeft);
        }
    }, 1000)
    
    
}

var clearPage = function(){
    headerEl.textContent = "";
    paragraphEl.textContent = "";
    answerListEl.innerHTML = "";
    btnEl.innerHTML = "";
    statusEl.textContent = "";
}


var startUp = function(){
    clearPage();
    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Quiz!"
    btnEl.appendChild(buttonEl);
    headerEl.textContent = "Final Fantasy Quiz!";
    paragraphEl.textContent = "Welcome to the Final Fantasy JavaScript code quiz. Please click the start button below to start the quiz. You will have 75 seconds to complete the quiz. Keep in mind that getting a wrong answer will penalize you 10 seconds each."
    
    buttonEl.addEventListener("click", function(){
        countdown();
        buttonEl.remove();
        displayQuestion(testQuestions[0]);
        
    })
    


};

var answerQuestion = function(question, answer){
    if(timeLeft < 1){
        endGame(timeLeft);
    }
    if(question.correctAnswer === answer){
        displayQuestion(testQuestions[question.id+1], "Correct!");
        
        
    } else{
        timeLeft -= 20;
        timerEl.textContent = "Time: " + timeLeft;
        displayQuestion(testQuestions[question.id+1], "Wrong!" );
        
    }

}


var buttonListener = function(question, answer){
    return function(){
        answerQuestion(question, answer);
    };
}

var displayQuestion = function(question, status){
    //need to create an ordered list for all the buttons
    clearPage();
    if(!question){
        answerListEl.innerHTML = "";
        return endGame(timeLeft);
    }
    answerListEl.innerHTML = "";

    for(var i = 0; i < question.answers.length; i++){
        if(timeLeft < 1){
            timerEl.textContent = "Time: " + 0;
           return endGame(timeLeft);
        } else{
        var answer = question.answers[i]; 
        var button = document.createElement("button");

            button.addEventListener("click", buttonListener(question, answer)) 
            button.textContent = answer;
            var listEl = document.createElement("li");
            listEl.appendChild(button);
            answerListEl.appendChild(listEl);
        }
    } 

    headerEl.textContent = question.question;
    
    
    if(status){
        statusEl.textContent = status
    }
               
}

var endGame = function(number){
    clearInterval(timeInterval);
    clearPage();
    if(number < 1){
        timeLeft = 0;
         highScore("You Lost! Your score is 0. Welcome to the Hall of Shame!");
    } else {
        saveScore();
    }
    
    
}

var resetScore = function(){
    localStorage.removeItem('scores');
    highScore("High Scores have been cleared");
}

var highScore = function(title){
    clearPage();
    headerEl.textContent = !title ? "High Scores!": title;
    btnEl.innerHTML = "<button onclick='startUp()'>Start Over</button><button onclick='resetScore()'>Reset HighScores</button>";
    var scores = JSON.parse(localStorage.getItem('scores'));
    if(scores){
        scores.sort((a, b) => b.score - a.score);
        for(var i = 0; i < scores.length; i++){
            var listItemEl = document.createElement("li");
            answerListEl.appendChild(listItemEl);
            listItemEl.textContent = scores[i].name + ": " + scores[i].score;
        }
    }
}

var saveScore = function(){
    clearPage();
    headerEl.textContent = "Great Job! You finished. Your score is " + (timeLeft);
    
    var button = document.createElement("button");
    btnEl.innerHTML = "<input type='text' name='name' id='text-box' class='text' /> ";
    btnEl.appendChild(button);
    
    
    
    button.textContent = "Save";
    button.className = ".btn";
    button.addEventListener("click", function(){
        
        var name = document.querySelector("input[name='name']").value;
        
        
        console.log("clicked!");
        if(!name){
            window.alert("You need to write your name.");
        }else {
            saveName(name);
            highScore();
        }
    })
    
}

var saveName = function(name, score){
    var scores = localStorage.getItem('scores');
    if(!scores){
        scores = [];
    }else{
        scores = JSON.parse(scores);
    }
     scores.push({name: name, score: timeLeft});
    
    localStorage.setItem("scores", JSON.stringify(scores));
    console.log("name");
    return name;
    

}

highScoreEl.addEventListener("click", function(){
    clearInterval(timeInterval);
    highScore();
})
        
startUp();



    






