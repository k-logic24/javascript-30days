const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

navigator.geolocation.watchPosition((data) => {
  console.log(data)
  speed.textContent = Math.round(data.coords.speed)
  arrow.style.transform = `${data.coords.heading}deg`
}, (err) => {
    throw new Error('hey! you gotta allow that to happen')
})