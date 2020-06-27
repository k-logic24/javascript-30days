const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  // INFO:
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => {
      console.error(err)
    })
}

function paintToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    // INFO:
    ctx.drawImage(video, 0, 0, width, height)

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height)
    // mess with them
    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)

    // ctx.globalAlpha = 0.1
    
    // put them back
    ctx.putImageData(pixels, 0, 0)
    console.log(pixels);
  }, 16);
}

function takePhoto() {
  // sounds
  snap.currentTime = 0
  snap.play()

  // data INFO:
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src="${data}" alt="" />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i = i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100 // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // Blue
  }

  return pixels
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i = i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] // RED
    pixels.data[i + 100] = pixels.data[i + 1] // GREEN
    pixels.data[i - 150] = pixels.data[i + 2] // Blue
  }

  return pixels
}

getVideo()

// INFO:
video.addEventListener('canplay', paintToCanvas)