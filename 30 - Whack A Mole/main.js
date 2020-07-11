const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole
let timeUp = false
let score = 0

function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === lastHole) {
    return randomHole(holes)
  }

  lastHole = hole
  return hole
}

function peep() {
  const time = randTime(200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if(!timeUp) peep()
  }, time)
}

function startGame() {
  scoreBoard.textContent = 0
  timeUp = false
  score = 0
  peep()
  setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
  // ユーザー操作がなされているか精査する
  if (!e.isTrusted) return // cheaten
  score++
  this.parentNode.classList.remove('up')
  scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk))