function playingSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
  if (!audio) return
  // ボタン連打で再生するため
  audio.currentTime = 0
  audio.play()
  key.classList.add('playing')
}

function removeTransition(event) {
  // transition allにしているので対象をtransformに絞る
  if (event.propertyName !== 'transform') return
  this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
window.addEventListener('keydown', playingSound)