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
        question: 'How do you write an arrow function?',
        choice1: 'function = () => {}',
        choice2: 'function-arrow{}',
        choice3: '===>>>>',
        choice4: 'none of the above',
        answer: 1,
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
        question: 'How do you write a console log?',
        choice1: 'clg()',
        choice2: 'council.loge()',
        choice3: 'show.in.console()',
        choice4: 'console.log()',
        answer: 3,
    },
    {
        question: 'Which of these has correct syntax for an html file?',
        choice1: 'index-html',
        choice2: 'index.htmlfile',
        choice3: 'index.html',
        choice4: 'index/html',
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
            return window.location.assign('https://ikomeda.github.io/quizyourself/end.html')
        }
    }, 1000);
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://ikomeda.github.io/quizyourself/end.html')
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