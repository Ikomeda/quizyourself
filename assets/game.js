const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerText = document.querySelector('#timer');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let timer = 40;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '3',
        choice4: '78',
        answer: 2,
    },
    {
        question: 'What Does HTML stand for?',
        choice1: 'Hot Tan Mens League',
        choice2: 'Hyper Text Markup Language',
        choice3: 'Hyper Text Machine Language',
        choice4: 'High Teens Meet Law',
        answer: 2,
    },
    {
        question: 'What is CSS?',
        choice1: 'A way to style stuffs',
        choice2: 'Creative sisters seance',
        choice3: 'Cascading Style Sheets',
        choice4: 'Cant Stop Smiling',
        answer: 3,
    },
    {
        question: 'JavaScript is used for?',
        choice1: 'Making code pretty',
        choice2: 'Applying function to code',
        choice3: 'Making interactive sites',
        choice4: 'Playing games',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    setTime()
}

function setTime() {
    var timerInterval = setInterval(function() {
        timer--;
        timerText.textContent = timer;

        if(timer === 0) {
            clearInterval(timerInterval);

            localStorage.setItem("mostRecentScore", score);
            return window.location.assign('/end.html')
        }
    }, 1000);
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()