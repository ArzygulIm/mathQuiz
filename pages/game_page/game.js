function redirectToMain() {
    window.location.href = "../../index.html"
}
!JSON.parse(localStorage.getItem('current player')) ? redirectToMain() : null

JSON.parse(localStorage.getItem('current player')) ? document.querySelector(".gameName").textContent = JSON.parse(localStorage.getItem('current player')).name[0].toUpperCase() + JSON.parse(localStorage.getItem('current player')).name.slice(1).toLowerCase() : null
let playersScoreArray = JSON.parse(localStorage.getItem('current player array')) ? JSON.parse(localStorage.getItem('current player array')) : []
let question = {}
let level = 1
let rightAnswerCounter = 0
let wrongAnswerCounter = 0
let rightAnswerCounterForLevel = 0
let score = 0
const modal = document.querySelector('.modal')
const backdrop = document.querySelector('.backdrop')

if (document.getElementById("timer")) {
    timer()
}
const getRandomNumber = (num) => Math.floor(Math.random() * num)
const renderLevel = () => {
    for (let i = 0; i < level; i++) {
        document.querySelectorAll('.levels')[i].classList.add('greenBack')
    }
}
renderLevel()
const changeLevel = () => {
    if (rightAnswerCounterForLevel == 5 && level <= 3) {
        level++
        rightAnswerCounterForLevel = 0
    }
    renderLevel()
}
document.getElementById('logOut').addEventListener('click', () => {
    let data = {
        name: JSON.parse(localStorage.getItem('current player')).name,
        score: score,
        gameMode: document.getElementById("timer") ? "Time Attack" : "Practice"
    }
    playersScoreArray.push(data)
    localStorage.setItem('current player array', JSON.stringify(playersScoreArray))
    localStorage.removeItem('current player')
    redirectToMain()
})
document.querySelector('.logo').addEventListener('click', () => {
    let data = {
        name: JSON.parse(localStorage.getItem('current player')).name,
        score: score,
        gameMode: document.getElementById("timer") ? "Time Attack" : "Practice"
    }
    playersScoreArray.push(data)
    localStorage.setItem('current player array', JSON.stringify(playersScoreArray))
})
const getRandomQuestion = () => {
    !JSON.parse(localStorage.getItem('current player')) ? redirectToMain() : null
    const operations = ["+", "-", "*", "/"]
    let number1, number2
    let operation = operations[Math.floor(Math.random() * 4)]
    if (operation === "*") {
        while (number1 == undefined || number2 == undefined || number1 * number2 < level * 200) {
            number1 = (level - 1) * 5 + getRandomNumber(30)
            number2 = (level - 1) * 5 + getRandomNumber(30)
        }
        question.answer = number1 * number2
    } else if (operation === "/") {
        while (number1 == undefined || number2 == 0 || number1 > level * 200) {
            number2 = (level - 1) * 5 + getRandomNumber(20)
            let answer = (level - 1) * 5 + getRandomNumber(20)
            number1 = number2 * answer
        }
        question.answer = number1 / number2
    } else if (operation === "-") {
        while (number1 == undefined || number2 == undefined || number1 < number2) {
            number1 = (level - 1) * 50 + getRandomNumber(200)
            number2 = (level - 1) * 50 + getRandomNumber(200)
        }
        question.answer = number1 - number2
    } else {
        number1 = (level - 1) * 50 + getRandomNumber(200)
        number2 = (level - 1) * 50 + getRandomNumber(200)

        question.answer = number1 + number2
    }
    question.question = number1 + operation + number2
    const questionSpan = document.querySelector('.questionSpan')
    document.querySelector('.question__answer').classList.add("fade-in-from-right")
    questionSpan.textContent = ""
    questionSpan.textContent = operation == "*" ? number1 + "·" + number2 : operation == "/" ? number1 + "÷" + number2 : question.question
    document.querySelector('.answerSpan').textContent = "=?"
    setTimeout(() => {
        document.querySelector('.question__answer').classList.remove("fade-in-from-right")
    }, 500)
}
getRandomQuestion()

let answerStr = ""

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        answerStr = answerStr + e.key
    } else if (e.key === "Backspace" || e.key === "Delete") {
        console.log(answerStr.slice(0, answerStr.length - 1))
        answerStr = answerStr == null ? "" : answerStr.slice(0, answerStr.length - 1)
    }
    document.querySelector('.answerSpan').textContent = "=" + answerStr
})

document.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        const changeScoreSpan = document.querySelector('.changeScoreSpan')
        changeScoreSpan.classList.add("fade-in-to-up")
        if (question.answer == answerStr) {
            score++
            rightAnswerCounter++
            rightAnswerCounterForLevel++
            changeScoreSpan.textContent = "+1"
            changeScoreSpan.classList.add("greenColor")
        } else {
            wrongAnswerCounter++
            if (score !== 0) {
                score--
                changeScoreSpan.textContent = "-1"
                changeScoreSpan.classList.add("redColor")
            }
            rightAnswerCounterForLevel = 0
        }
        level < 3 ? changeLevel() : null
        document.querySelector('.question__answer').classList.add("fade-out-to-left")
        setTimeout(() => {
            changeScoreSpan.classList.remove("redColor", "greenColor")
            answerStr = ""
            document.getElementById('answerInput').value = ""
            changeScoreSpan.textContent = ''
            document.querySelector(".scoreSpan").innerHTML = `${score}`
            document.querySelector('.answerSpan').textContent = answerStr
            document.querySelector('.question__answer').classList.remove("fade-out-to-left")
            changeScoreSpan.classList.remove("fade-in-to-up")
            getRandomQuestion()
        }, 400)
    }
})

document.querySelector('.stopGame').addEventListener('click', () => {
    modal.classList.add('modalActive')
    backdrop.classList.add('backdropActive')
    document.body.classList.add('hidden')
    let data = {
        name: JSON.parse(localStorage.getItem('current player')).name,
        score: score,
        gameMode: document.getElementById("timer") ? "Time Attack" : "Practice"
    }
    playersScoreArray.push(data)
    localStorage.setItem('current player array', JSON.stringify(playersScoreArray))
    document.querySelector(".modalScore").textContent = `Score: ${score}`
    document.querySelector('.rightAnswerWrap').textContent = `Right Answers: ${rightAnswerCounter}`
    document.querySelector('.wrongAnswerWrap').textContent = `Wrong Answers: ${wrongAnswerCounter}`
})


document.getElementById('newGame').addEventListener('click', () => {
    level = 1
    rightAnswerCounter = 0
    wrongAnswerCounter = 0
    rightAnswerCounterForLevel = 0
    score = 0
    document.querySelector(".scoreSpan").innerHTML = `${score}`
    getRandomQuestion()
    modal.classList.remove('modalActive')
    backdrop.classList.remove('backdropActive')
    document.body.classList.remove('hidden')
    document.getElementById('timer') ? timer() : null
})

function timer() {
    document.querySelector('.timerSpan').textContent = `2 : 00`
    let timeLeft = 0
    let time = setInterval(() => {
        timeLeft++
        document.querySelector('.timerSpan').textContent = `${Math.floor((120 - timeLeft) / 60)} : ${(120 - timeLeft) % 60}`
        document.querySelector('.timerChild').style.width = ((120 - timeLeft) / 120) * 100 + "%"
        if (timeLeft < 90) {
            document.querySelector('.timerChild').classList.add("greenTimer")
        } else if (timeLeft < 105) {
            document.querySelector('.timerChild').classList.remove("greenTimer")
            document.querySelector('.timerChild').classList.add("orangeTimer")
        } else {
            document.querySelector('.timerChild').classList.remove("orangeTimer")
            document.querySelector('.timerChild').classList.add("redTimer")
        }
        if (timeLeft == 120) {
            clearInterval(time)
            document.querySelector('.timerChild').style.width = "100%"
            document.querySelector('.timerChild').classList.remove("redTimer")
            document.querySelector('.timerChild').classList.add("greenTimer")
            modal.classList.add('modalActive')
            backdrop.classList.add('backdropActive')
            document.body.classList.add('hidden')
            let data = {
                name: JSON.parse(localStorage.getItem('current player')).name,
                score: score,
                gameMode: document.getElementById("timer") ? "Time Attack" : "Practice"
            }
            playersScoreArray.push(data)
            localStorage.setItem('current player array', JSON.stringify(playersScoreArray))
            document.querySelector(".modalScore").textContent = `Score: ${score}`
            document.querySelector('.rightAnswerWrap').textContent = `Right Answers: ${rightAnswerCounter}`
            document.querySelector('.wrongAnswerWrap').textContent = `Wrong Answers: ${wrongAnswerCounter}`
        }
    }, 1000)
    document.querySelector('.stopGame').addEventListener('click', () => {
        clearInterval(time)
        document.querySelector('.timerChild').style.width = "100%"
    })
}

document.querySelector('.answerSpan').addEventListener('click', () => {
    document.getElementById('answerInput').style.display = "block"
    document.getElementById('checkBtn').style.display = "block"
    document.getElementById('answerInput').focus()
})

document.getElementById('checkBtn').addEventListener('click', event => {
    const changeScoreSpan = document.querySelector('.changeScoreSpan')
    changeScoreSpan.classList.add("fade-in-to-up")
    if (question.answer == answerStr) {
        score++
        rightAnswerCounter++
        rightAnswerCounterForLevel++
        changeScoreSpan.textContent = "+1"
        changeScoreSpan.classList.add("greenColor")
    } else {
        wrongAnswerCounter++
        if (score !== 0) {
            score--
            changeScoreSpan.textContent = "-1"
            changeScoreSpan.classList.add("redColor")
        }
        rightAnswerCounterForLevel = 0
    }
    level < 3 ? changeLevel() : null
    document.querySelector('.question__answer').classList.add("fade-out-to-left")
    setTimeout(() => {
        changeScoreSpan.classList.remove("redColor", "greenColor")
        answerStr = ""
        document.getElementById('answerInput').value = ""
        document.getElementById('answerInput').focus()
        changeScoreSpan.textContent = ''
        document.querySelector(".scoreSpan").innerHTML = `${score}`
        document.querySelector('.answerSpan').textContent = answerStr
        document.querySelector('.question__answer').classList.remove("fade-out-to-left")
        changeScoreSpan.classList.remove("fade-in-to-up")
        getRandomQuestion()
    }, 400)
})