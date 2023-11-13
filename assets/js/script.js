var questionEl = $('#question');
var choicesEl = $('#choices');
var timerEl = $('#timer');
var highScoreEl = $('#high-score');
var infoEl = $('#info');
var startEl = $('#start');
var currentQuestion = {};
var score = 0;
var availableQuestions = {};
var questionCounter = 0;
var questionArr = [{
    q: "What does the 'M' in MERN stand for?",
    a: [{text: "MongoDB", isCorrect: true},
    {text: "Moo", isCorrect: false},
    {text: "Mooo", isCorrect: false},
    {text: "Mo", isCorrect: false},
    ]
},
{   q: "What is the capital of Massachusetts?",
    a: [{text: "New York", isCorrect: false},
    {text: "New York", isCorrect: false},
    {text: "New York", isCorrect: false},
    {text: "Boston", isCorrect: true},
    ]

}
]


$(startEl).on('click', function() {
    $(startEl).css("visibility", "hidden");
    var counterEl = 75;
    const timer = setInterval(function() {
    counterEl--;
        if (counterEl >= 0) {
        timerEl.text('Time: ' + counterEl);
        startQuestion();
    }   else {
        alert('Time is up!');
        clearInterval(counterEl);
        return;
    }
}, 1000)

function startQuestion() {
    availableQuestions = [...questionArr];
    if (availableQuestions.length === 0) {
        localStorage.setItem('lastScore', score);
        // postScore();
        return;
    }   else {
        nextQuestion();
    }
    
}

function nextQuestion() {
    currentQuestion = questionArr[questionCounter];
    let questionNumber = questionCounter + 1;
    $(questionEl).text(questionNumber + ". " + currentQuestion.q);

    currentQuestion.a.forEach(a => {
        var button = document.createElement("button");
        $(button).text(a.text);
        $(button).addClass("btn");
        $(choicesEl).append(button);
        if(a.isCorrect) {
            button.dataset.isCorrect = a.isCorrect;
        }
        $(button).on("click", guess());
    });
    $(choicesEl).css("visibility", "visible");
    // questionCounter++;
    // availableQuestions--;
function guess(event) {
    var answer = event.target;
    var rightAnswer = button.dataset.isCorrect === "true";
    if(rightAnswer)

}
    
    
}   
})



