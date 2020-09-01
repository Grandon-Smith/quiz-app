
function removeStartQuizButton() {
    $('.js-start-form').remove();
    console.log("removeStartQuiz ran");
};


function startQuiz() {
    $('.js-start-form').on('click', event => {
        removeStartQuizButton();
        renderQuestion();
    });
};


// function addSubmitButton() {

// }

function renderQuestion() {
    $('.js-question-area').append( `
    <div class="question">
        <p>
            ${questions[0].question}
        </p>
        
    </div>`
    );
};





















// -----------------Callback function ------------------------

function runQuizApp() {
    startQuiz();
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
