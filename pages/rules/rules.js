JSON.parse(localStorage.getItem('current player'))?document.querySelector(".gameName").textContent = JSON.parse(localStorage.getItem('current player')).name[0].toUpperCase() + JSON.parse(localStorage.getItem('current player')).name.slice(1).toLowerCase():null