import './style.css'

document.querySelector('#app').innerHTML = `
  <main class='site'>
    <h1>Основной сайт</h1>
    <button id='game-run'>Запустить игру</button>
  </main>
`

const btnGameRun = document.querySelector('#game-run')
btnGameRun.addEventListener('click', () => {
  const gameModule = document.createElement('game-module')
  gameModule.setAttribute('src', 'http://localhost:5175/')
  document.body.appendChild(gameModule)
})