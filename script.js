

$(function() {
    $('main').append(`
        <div class="js-question-area">
        <div class="startpic-box">
        <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/a4/dd/05/a4dd05c6-4e03-312b-b8ed-abdbdadef6c6/source/512x512bb.jpg" class="startpic">
        </div>
        <form class="start-form js-start-form">
            <input id="start-quiz js-start-quiz" type="button" value="Start Quiz!">
        </form>
        
        </div>`);
});






//------------ SCORE KEEPERS-----------

let score = 0;
let currentQuestion = 0;


function updateScore() {
    score++;
    $('.score').text(`Score: ${score} / 8`);
    //console.log("updateScore ran")
}

function updateCurrentQuestion() {
    currentQuestion++;
    $('.current-question').text(`Current Question: ${currentQuestion + 1} / 8`);
    //console.log("updateCurrentQu ran");

    if (currentQuestion >= questions.length) {
        hidePreviousQuestion();
        scoreScreen();       
     };
}

//------------ SCORE KEEPERS-----------



function removeStartQuizButton() {
    $('.js-start-form').remove();
    //console.log("removeStartQuiz ran");
};

function addTrackers() {
    $('header').append(`
    <div class="trackers">
            <p class="current-question">Current Question: 1 / 8</p>
            <p class="score">Score 0 / 8</span>
        </div>`
    );
};




function scoreScreen() {
    $('.current-question').hide();
    $('.score').remove();
        $('main').append(`
            <div class="trackers center">
                <p><strong>
                    Your Score: ${score} / 8
                <strong></p>
                <form>
                    <div class="submit-div">
                        <input id="js-retake-quiz" type="submit" value="Try Again?">
                    </div>
                </form>
            </div> 
        `);
}







function renderQuestion() {
    console.log(currentQuestion);
    $('.js-question-area').append( `
    <div class="question">
        <p class="js-question">
            ${questions[currentQuestion].question}
        </p>
        <form>
            <ul>
                <li>
                    <input type="radio" id="answer" name="answer" value="${questions[currentQuestion].answers[0]}" aria-pressed="false">
                    <label for="answer1">${questions[currentQuestion].answers[0]}</label>
                </li>
                <li>
                    <input type="radio" id="answer" name="answer" value="${questions[currentQuestion].answers[1]}" aria-pressed="false">
                    <label for="answer2">${questions[currentQuestion].answers[1]}</label>
                </li>
                <li>
                    <input type="radio" id="answer" name="answer" value="${questions[currentQuestion].answers[2]}" aria-pressed="false">
                    <label for="answer3">${questions[currentQuestion].answers[2]}</label>
                </li>
                <li>
                    <input type="radio" id="answer" name="answer" value="${questions[currentQuestion].answers[3]}" aria-pressed="false">
                    <label for="answer4">${questions[currentQuestion].answers[3]}</label>
                </li>
            </ul>
            <div class="submit-div">
                <input id="question-submit" type="submit" value="Submit Answer">
            </div>
        </form>
    </div>`
    );
};


function moveStartPic() {
    $('img').remove();
    $('h1').hide();
    $('header').prepend(`
        <div class="startpic-box">
            <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/a4/dd/05/a4dd05c6-4e03-312b-b8ed-abdbdadef6c6/source/512x512bb.jpg" class="startpic">
        </div>
    `);
}


function removePadding() {
    $('header').removeClass('padding');
};


function startQuiz() {
    $('main').on('click','.js-start-form', event => {
        removeStartQuizButton();
        renderQuestion();
        addTrackers();
        removePadding();
        moveStartPic();
    });
};



function hidePreviousQuestion() {
    $('.question').remove();
    console.log("hidePrev ran");
};
 

function incorrectAnswer() {
    alert(`Sorry, the correct answer was ${questions[currentQuestion].correct}`);
    hidePreviousQuestion();
    updateCurrentQuestion();
    renderQuestion();
};


function correctAnswer() {
    hidePreviousQuestion();
    updateCurrentQuestion();
    updateScore();
    renderQuestion();
}


function submitAnswer() {
    $('main').on('click', '#question-submit', event => {
        event.preventDefault();
        let correct = questions[currentQuestion].correct;
        let selected = $('input:checked');
        let answer = selected.val();
        if (answer === undefined) {
            alert("Please choose one of the options.");
        } else if (answer === correct) {

            // $('.js-question-area').on('event', '#question-submit', event => {
            //     this.prepend("Correct!")
            // });
            // alert("Correct!")
            correctAnswer();
        } else if (answer !== correct) {
            incorrectAnswer();
        };
    });
};




// -----------------Callback function ------------------------

function runQuizApp() {
    startQuiz();
    submitAnswer();
}

$(runQuizApp());

// -----------------Callback function ------------------------


// --------- Questions object Array -------------

const questions = [
    {
       question: 'How many bones are there in a typical human body?',
       answers: ['300', '140', '250', '206'], 
       correct: '206'
    }, 
    {
        question: 'Which is the largest internal organ?',
        answers: ['Stomach', 'Kidney', 'Liver', 'Large intestine'], 
        correct: 'Liver'
     }, 
     {
        question: 'What is the bone going between the knee and the hip?',
        answers: ['Femur', 'Radius', 'Mandible', 'Orbital'], 
        correct: 'Femur'
     }, 
     {
        question: 'Which of the following is not one of the 5 senses?',
        answers: ['Touch', 'Balance', 'Sight', 'Smell'],
        correct:'Balance'
     }, 
     {
        question: '_____ are the structures that carry electrical signals to and from your brain.',
        answers: ['Blood vessels', 'Bones', 'Nerves', 'Lymph vessels'],
        correct:'Nerves'
     }, 
     {
        question: 'The inner ear has 3 bones in it on each side. Which of these is not one of them?',
        answers: ['Stapes', 'Malleus', 'Incus', 'Phalange'],
        correct:'Phalange'
     }, 
     {
        question: 'Food and liquid travel from the mouth to the stomach via the _____.',
        answers: ['Aorta', 'Esophagus', 'Trachea', 'Cochlea'],
        correct:'Esophagus'
     }, 
     {
        question: 'This part of the brain is responsible for “higher level” thinking and problem solving.',
        answers: ['Frontal cortex', 'Limbic system', 'Optic nerve', 'Brainstem'],
        correct:'Frontal cortex'
     }, 
];
