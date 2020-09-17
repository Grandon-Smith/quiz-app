// --------- Questions object Array -------------

var store = {
    questions: [
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
    ],
    currentQuestion: 0,
    score: 0
};


function renderStartScreen() {
    // runs once at load to render the start screen
    
    $('main').append(`
        <div class="js-question-area">
        <div class="startpic-box">
        <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/a4/dd/05/a4dd05c6-4e03-312b-b8ed-abdbdadef6c6/source/512x512bb.jpg" class="startpic">
        </div>
        <form class="start-form js-start-form">
            <input id="start-quiz js-start-quiz" type="button" value="Start Quiz!">
        </form>
        
        </div>`);
};


//------------ SCORE KEEPERS-----------



function updateScore() {
    store.score++;
    $('.score').text(`Score: ${store.score} / 8`);
    console.log("updateScore ran")
}

function updateCurrentQuestion() {
    store.currentQuestion++;
    $('.current-question').text(`Current Question: ${store.currentQuestion + 1} / 8`);
    console.log("updateCurrentQuestion ran");
}

//------------ SCORE KEEPERS-----------





function scoreScreen() {
    //only runs once at the end of the quiz (shown in the if statement in submitAnswer function)
    // shows score at the end a button prompting user to try again.
    console.log('score screen ran');
    $('.current-question').hide();
    $('.score').remove();
        $('main').append(`
            <div class="trackers center scoreDiv">
                <p><strong>
                    Your Score: ${store.score} / 8
                <strong></p>
                <form>
                    <div class="submit-div">
                        <input id="js-retake-quiz" type="submit" value="Try Again?">
                    </div>
                </form>
            </div> 
        `);
}

function hidePreviousQuestion() {
    $('.question').remove();
    console.log("hidePreviousQuestion ran")
};
 
function incorrectAnswer() {
    alert(`Sorry, the correct answer was ${questions[currentQuestion].correct}`);
    hidePreviousQuestion();
    updateCurrentQuestion();
};

function correctAnswer() {
    hidePreviousQuestion();
    updateCurrentQuestion();
    updateScore();  
}

function submitAnswer() {
    $('main').on('click', '#question-submit', event => {
        event.preventDefault();

        //assigning variables to be used in the if statement below this and selecting
        // the input from the radio buttons to be assessed.

        let correct = store.questions[currentQuestion].correct;
        let selected = $('input:checked');
        let answer = selected.val();

        //Needed a separate if statement to determine if the current question was the last one
        // and if that was the case, to run the score screen function, rather than render the
        // next question. I'm sure there's a more efficient way to code this, but for now
        // this was the best I could come up with. 

        if (store.currentQuestion === (store.questions.length - 1)) {
            console.log("GOT IT");
            if (answer === undefined) {
                alert("Please choose one of the options.");
            } else if (answer === correct) {
                correctAnswer();
                scoreScreen();
            } else if (answer !== correct) {
                incorrectAnswer();
                scoreScreen();
            } return
        } else if (store.currentQuestion < (store.questions.length)) {
            
            if (answer === undefined) {
                alert("Please choose one of the options.");
            } else if (store.currentQuestion < store.questions.length && answer === correct) {
                alert("Correct!")
                correctAnswer();
                renderQuestion();
            } else if (store.currentQuestion < store.questions.length && answer !== correct) {
                incorrectAnswer();
                renderQuestion();
            } return
        } 
    });
};


function removeStartQuizButton() {
    $('.js-start-form').remove();
};

function addTrackers() {
    $('header').append(`
    <div class="trackers">
            <p class="current-question">Current Question: 1 / 8</p>
            <p class="score">Score 0 / 8</span>
        </div>`
    );
};


function renderQuestion() {
    //This is the template to which all questions will be rendered, allowing them to be updated
    // as the quiz questions progress
    console.log(`question ${store.currentQuestion + 1} was rendered`);
    $('.js-question-area').append( `
    <div class="question">
        <p class="js-question">
            ${store.questions[currentQuestion].question}
        </p>
        <form>
            <ul>
                <li>
                    <input type="radio" id="answer1" name="answer" value="${store[currentQuestion].answers[0]}" aria-pressed="false">
                    <label for="answer1">${store[currentQuestion].answers[0]}</label>
                </li>
                <li>
                    <input type="radio" id="answer2" name="answer" value="${store[currentQuestion].answers[1]}" aria-pressed="false">
                    <label for="answer2">${store[currentQuestion].answers[1]}</label>
                </li>
                <li>
                    <input type="radio" id="answer3" name="answer" value="${store[currentQuestion].answers[2]}" aria-pressed="false">
                    <label for="answer3">${store[currentQuestion].answers[2]}</label>
                </li>
                <li>
                    <input type="radio" id="answer4" name="answer" value="${store[currentQuestion].answers[3]}" aria-pressed="false">
                    <label for="answer4">${store[currentQuestion].answers[3]}</label>
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
    //upon clicking start quiz, the button will dissapear, the first question rendered, the socre and current
    // question trackers will be rendered above the question area and the picture will move up, replacing the 
    // quiz title.
    $('main').on('click','.js-start-form', event => {
        removeStartQuizButton();
        addTrackers();
        renderQuestion();
        moveStartPic();
        removePadding();
        
    });
};

// -----------------Callback function ------------------------

function runQuizApp() {
    renderStartScreen();
    startQuiz();
    submitAnswer();
}

$(runQuizApp());

// -----------------Callback function ------------------------


