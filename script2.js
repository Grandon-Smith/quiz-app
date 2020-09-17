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







// -----------------FORMAT SCORE AND CURRENT QUESTION----------------------

function formatQuizTrackers() {
    return`
        <div class="trackers">
            <p class="current-question">Current Question: ${store.currentQuestion + 1} / ${store.questions.length}</p>
            <p class="score">Score ${store.score} / ${store.currentQuestion}</span>
        </div>
        `
}
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




//---------------formatting question area for each question render--------------

function formatAnswers() {
    const answersArray = store.questions[store.currentQuestion].answers;
    let i = 0;
    let formattedAnswers = 0;
    answersArray.forEach(answer => {
      formattedAnswers += `
        <li>
          <input type="radio" tabindex="${i}" name="answer" id="answer${i}" value="${answer}" required> 
          <label for="answer${i}"> ${answer}</label>
        </li>
      `;
      i++;
    });
    console.log(formattedAnswers);
    return formattedAnswers;
  }

function formatQuestionAndAnswer() {
return `
    <div class="js-question-area">
        <div class="question">
            <p class="js-question">
                ${store.questions[store.currentQuestion].question}
            </p>
            <form>
                <ul>
                    ${formatAnswers()}
                </ul>
                <div class="submit-div">
                    <input id="question-submit" type="submit" value="Submit Answer">
                </div>
            </form>
        </div>
    </div>
    `
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



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

//----------------GETS RID OF H1 WORDING AND MOVES PICTURE UP TO REPLACE IT--------------
function moveStartPic() {
    $('img').remove();
    $('h1').remove();
    $('header').prepend(`
        <div class="startpic-box">
            <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/a4/dd/05/a4dd05c6-4e03-312b-b8ed-abdbdadef6c6/source/512x512bb.jpg" class="startpic">
        </div>
    `);
    $('header').removeClass('padding');
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function beginQuiz() {
    $('main').on('click','#jsStartQuiz', event => {
        store.startQuiz = true;
        renderQuiz();
        moveStartPic();
    });
    
}


function renderQuiz() {
    if (store.startQuiz === false) {
        $('main').html(startScreen());

    } else if (store.startQuiz === true) {
        console.log("here we go!" + store.startQuiz)
        $('header').html(formatQuizTrackers());
        $('main').html(formatQuestionAndAnswer());
    } else {
        // scoreScreen();
    }
}


// -----------------Callback function ------------------------

function runQuizApp() {
    beginQuiz();
    renderQuiz();
}

$(runQuizApp());

// -----------------Callback function ------------------------


