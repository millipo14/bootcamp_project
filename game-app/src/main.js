import './style.css'

document.querySelector('#app').innerHTML = `
    <div class='game-app'>
        <h1>Игра началась!</h1>
        <button id='game-close'>Выйти</button>
    </div>
`

window.parent.postMessage({
    type: 'READY'
}, '*')

const closeBtn = document.querySelector('#game-close')
closeBtn.addEventListener('click', () => {
    window.parent.postMessage({
        type: 'CLOSE'
    }, '*')
})