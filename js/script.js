if (JSON.parse(localStorage.getItem('current player'))) {
    console.log(document.querySelector('h5'))
    document.querySelector('.nameText').classList.add('showContent')
    document.querySelector(".nameSpan").textContent = JSON.parse(localStorage.getItem('current player')).name
    document.querySelector('h5').innerHTML = `Hello ${JSON.parse(localStorage.getItem('current player')).name}! <br> What do you want to do?`
    document.querySelector('.deletePlayerButton').addEventListener('click', () => {
        localStorage.removeItem('current player')
    })
} else {
    document.querySelector('.nameInput').classList.add('showContent')
    document.querySelector('h5').innerHTML = `Hello Gamer! <br> Tell us your name?`
}

document.getElementById('startGame').addEventListener('click', (e) => {
    e.preventDefault()
    if (JSON.parse(localStorage.getItem('current player'))) {
        redirectToGame()
    }
    else if (document.getElementById('name').value !== "") {
        localStorage.setItem('current player', JSON.stringify({
            name: document.getElementById('name').value,
        }))
        redirectToGame();
    } else {
        const message = document.createElement('p')
        message.className = 'startMessage'
        message.textContent = 'Please enter your name for start game'
        document.querySelector('.name__wrap').append(message)

        setTimeout(() => {
            message.remove()
        }, 3000)
    }
})

function redirectToGame() {
    document.querySelector('input[name="gameMode"]:checked').value == "practice" ? window.location.href = "./pages/game_page/gamePage.html" : window.location.href = "./pages/game_page/gameTimeAttack.html"
}