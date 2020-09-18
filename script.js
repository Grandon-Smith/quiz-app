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
    score: 0,
    startQuiz: false
};

//-----------------------------ENDING THE QUIZ-------------------------------------

function tryAgain() {
    $('main').on('click', '#jsRetakeQuiz', event => {
        resetCounters()
        renderQuiz();
        $('header').addClass('padding')
    })
}
function resetCounters() {
    store.currentQuestion = 0;
    store.score = 0;
    store.startQuiz = false;
}

function scoreScreen() {
    //only runs once at the end of the quiz (shown in the if statement in submitAnswer function)
    // shows score at the end a button prompting user to try again.
    console.log('score screen ran');
    $('.current-question').hide();
    $('.score').remove();
        // $('main').html(
            return`
            <div class="trackers center scoreDiv">
                <p><strong>
                    Your Score: ${store.score} / 8
                <strong></p>
                <form>
                    <div class="submit-div">
                        <input id="jsRetakeQuiz" type="button" value="Try Again?">
                    </div>
                </form>
            </div> 
        `;
}
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//-------------------------------DEALING WITH QUESTIONS---------------------------------


function nextQuestion() {
    console.log(store.questions.length)
    console.log(store.currentQuestion)
    if (store.startQuiz === true && store.currentQuestion < store.questions.length) {
        $('header').html(formatQuizTrackers());
        $('main').html(formatQuestionAndAnswer());
    } else if (store.startQuiz === true && store.currentQuestion === store.questions.length){
        $('main').html(scoreScreen());
    }
}

function clickNext() {
    $('main').on('click', '#next', event => {
    event.preventDefault();
    console.log("ran")
    nextQuestion();
    })
}

function informAnswerStatus(status) {
    if (status === 'correct') {
        return `
        <div class="center">Correct!</div>
        <input type="submit" id="next" value="next">
        `
    } else if (status === 'incorrect') {
        return `
        <div class="center">Incorrect. The answer was ${store.questions[store.currentQuestion].correct}.</div>
        <input type="submit" id="next" value="next">
        `
    }
}

function showAnswerStatus() {
    $('main').on('submit', 'form', event => {
        event.preventDefault();
        // assigning variables to be used in the if statement below this and selecting
        // the input from the radio buttons to be assessed.
        let correct = store.questions[store.currentQuestion].correct;
        let selected = $('input:checked');
        let answer = selected.val();
        if (answer === correct) {
            console.log("correct")
            $('.submit-div').html(informAnswerStatus('correct'))
            store.score++;
            store.currentQuestion++; 
        } else if (answer !== correct) {
            $('.submit-div').html(informAnswerStatus('incorrect'))
            store.currentQuestion++;
        }
    });
}    
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// -----------------------FORMAT SCORE AND CURRENT QUESTION-----------------------------

function formatQuizTrackers() {  
    return`
        <div class="startpic-box">
            <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/a4/dd/05/a4dd05c6-4e03-312b-b8ed-abdbdadef6c6/source/512x512bb.jpg" class="startpic">
        </div>
        <div class="trackers">
            <p class="current-question">Current Question: ${store.currentQuestion + 1} / ${store.questions.length}</p>
            <p class="score">Score so far: ${store.score} / ${store.currentQuestion}</span>
        </div>
        `
}
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


//---------------formatting question area for each question render--------------

function formatAnswers() {
    const answersArray = store.questions[store.currentQuestion].answers;
    let i = 0;
    let formattedAnswers = '';
    answersArray.forEach(answer => {
      formattedAnswers += `
        <li>
          <input type="radio" tabindex="${i + 1}" name="answer" id="answer${answer}" value="${answer}" required> 
          <label for="answer${answer}">${answer}</label>
        </li>
      `;
      i++;
    });
    return formattedAnswers;
  }

function formatQuestionAndAnswer() {
return `
    <div class="js-question-area">
        <div class="question">
            
            <fieldset>
                <legend>${store.questions[store.currentQuestion].question}</legend>
                <form>
                    <ul>
                        ${formatAnswers()}
                    </ul>
                    <div class="submit-div">
                        <input id="question-submit" type="submit" value="Submit Answer">
                    </div>
                </form>
            </fieldset>
        </div>
    </div>
    `
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


//----------------GETS RID OF H1 TITLE AND MOVES PICTURE UP TO REPLACE IT--------------
function moveStartPic() {
    $('header').removeClass('padding');
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



function beginQuiz() {
    $('main').on('click','#jsStartQuiz', event => {
        event.preventDefault();
        store.startQuiz = true;
        nextQuestion();
        moveStartPic();
    });
}

function startScreen() {
    return `
    <div class="js-question-area">
        <div class="startpic-box">
            <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/a4/dd/05/a4dd05c6-4e03-312b-b8ed-abdbdadef6c6/source/512x512bb.jpg" class="startpic">
        </div>
        <form class="start-form js-start-form">
            <input id="jsStartQuiz" type="button" value="Start Quiz!">
        </form>
    </div>
    `;
};

function renderQuiz() {
    if (store.startQuiz === false) {
        $('header').empty();
        $('main').html(startScreen());
    } 
}
// -----------------Callback function ------------------------

function runQuizApp() {
    clickNext();
    renderQuiz();
    beginQuiz();
    showAnswerStatus();
    nextQuestion();
    tryAgain();
}

$(runQuizApp());

// -----------------Callback function ------------------------


