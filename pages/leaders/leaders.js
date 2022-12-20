JSON.parse(localStorage.getItem('current player'))?document.querySelector(".gameName").textContent = JSON.parse(localStorage.getItem('current player')).name[0].toUpperCase() + JSON.parse(localStorage.getItem('current player')).name.slice(1).toLowerCase():null

document.querySelector('select').addEventListener('change', () => {
    renderLeaderBoard(JSON.parse(localStorage.getItem('current player array')).filter(el => el.gameMode == document.querySelector('select').value).sort(function(a, b){return b.score - a.score}))
})

const renderLeaderBoard = (data) =>{
    document.querySelector('tbody').innerHTML = ''
    data.length > 0?data.map(el=>{
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')

        td1.textContent = el.name
        td2.textContent = el.score

        tr.append(td1,td2)
        document.querySelector('tbody').append(tr)
    }):null
}

renderLeaderBoard(JSON.parse(localStorage.getItem('current player array')).filter(el => el.gameMode == document.querySelector('select').value).sort(function(a, b){return b.score - a.score}))