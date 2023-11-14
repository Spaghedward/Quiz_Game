// I set up a myriad of variables to use in my logic.
var questionEl = $('#question');
var choicesEl = $('#choices');
var timerEl = $('#timer');
var nextEl = $("#next");
var highScoreEl = $('#high-score');
var infoEl = $('#info');
var startEl = $('#start');
var currentQuestion = {};
var score = 0;
var availableQuestions = 4;
var questionCounter = 0;
var existingScores = JSON.parse(localStorage.getItem("scores"))??[];
// This is my array of questions.
var questionArr = [{
    q: "What does the 'M' in MERN stand for?",
    a: [{text: "MongoDB", isCorrect: true},
    {text: "Mode", isCorrect: false},
    {text: "Mono", isCorrect: false},
    {text: "Mongoose", isCorrect: false},
    ]
},
{   q: "What is the capital of Massachusetts?",
    a: [{text: "Salem", isCorrect: false},
    {text: "Pawtucket", isCorrect: false},
    {text: "New York", isCorrect: false},
    {text: "Boston", isCorrect: true},
    ]

},
{   q: "Penny Hardaway was drafted by what NBA team?",
    a: [{text: "Sacramento Kings", isCorrect: true},
    {text: "Utah Jazz", isCorrect: false},
    {text: "Chicago Bulls", isCorrect: false},
    {text: "Orlando Magic", isCorrect: false}
    ]
},
{   q: "Josh Homme is the lead singer for what band?",
    a: [{text: "Foo Fighters", isCorrect: false},
    {text: "Queens of the Stone Age", isCorrect: true},
    {text: "Creed", isCorrect: false},
    {text: "Tool", isCorrect: false},
    ]
}
]

// This on click function starts the timer and sets an alert if time is up.
$(startEl).on('click', function() {
    $(startEl).css("visibility", "hidden");
    var counterEl = 60;
    nextQuestion()
    const timer = setInterval(function() {
    counterEl--;
        if (counterEl >= 0) {
        timerEl.text('Time: ' + counterEl)
    }   else {
        alert('Time is up!');
        clearInterval(counterEl);
        return;
    }
}, 1000)


// This function replaces "Quiz Game" with the actual question.
// Then it creates buttons that have potential answers on them.
function nextQuestion() {
    currentQuestion = questionArr[questionCounter];
    let questionNumber = questionCounter + 1;
    $(questionEl).text(questionNumber + ". " + currentQuestion.q);
    $(choicesEl).html('');
    currentQuestion.a.forEach(a => {
        var button = document.createElement("button");
        $(button).text(a.text);
        $(button).addClass("btn");
        $(choicesEl).append(button);
        if(a.isCorrect) {
            button.dataset.isCorrect = a.isCorrect;
        }
    
        $(button).on("click", guess);
    });
    $(choicesEl).css("visibility", "visible");
}   
    
// When you click a potential answer, this function adds a class to the potential answers
// corresponding to their correctness.  In the interest of time I have neglected to style the anwer buttons.
function guess(event) {
    var answer = event.target;
    var rightAnswer = answer.dataset.isCorrect === "true";
    if(rightAnswer) {
        $(answer).addClass("right");
        $(info).text("Correct!");
        $(info).css("visibility", "visible");
        score += 100;
    }   else {
        $(answer).addClass("wrong");
        $(info).text("Incorrect!");
        $(info).css("visibility", "visible");
        counterEl -= 10;
    }
    questionCounter++;
    postScore();
}
 
// This function was created to stop the game at the conclusion of the questions and save user score.
function postScore() {
    if (questionCounter === 4 || counterEl === 0) {
        clearInterval(timer);
        saveScore();
        return;
    }   else {
        nextQuestion();
    } 
}

// This function creates a var in local storage that stores user initials and score.
// That var is then used to populate the scores list.  
function saveScore() {
    var initials = prompt("You Scored: " + score + " points! Enter your initials to save your score.");
    var existingScores = JSON.parse(localStorage.getItem("scores"))??[];
    var newScores = existingScores.concat(
        [{  initials,
            score
        }
        ]
    );
    localStorage.setItem("scores", JSON.stringify(newScores));
    for (var i = 0; i < newScores.length; i++) {
        var txt = $("<p></p>").text(newScores[i].initials + '.............................' + newScores[i].score);
        $(highScoreEl).append(txt);

    }
    }

}
)