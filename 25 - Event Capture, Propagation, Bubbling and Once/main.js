const divs = document.querySelectorAll('div')

function logText(event) {
  event.stopPropagation() // stop bubbling
  console.log(this.classList.value);
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false,
  once: true
}))