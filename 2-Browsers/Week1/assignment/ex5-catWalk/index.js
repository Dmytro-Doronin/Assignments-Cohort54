function catWalk() {
  const img = document.querySelector('img')

  const WALK = 'http://www.anniemation.com/clip_art/images/cat-walk.gif'
  const DANCE = 'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif'

  img.style.left = '0px'
  img.src = WALK

  let position = 0
  let timer = null
  let isDancing = false
  let dancedThisLap = false

  function step() {
    if (isDancing) {
      return
    }
    position += 10
    img.style.left = position + 'px'

    const middle = (window.innerWidth - img.offsetWidth) / 2
    const end = window.innerWidth - img.offsetWidth

    if (!dancedThisLap && position >= middle) {
      isDancing = true
      dancedThisLap = true
      clearInterval(timer)
      img.src = DANCE

      setTimeout(() => {
        img.src = WALK
        isDancing = false
        timer = setInterval(step, 50)
      }, 5000)
    }

    if (position >= end) {
      position = 0
      img.style.left = '0px'
      dancedThisLap = false
    }
  }

  function startWhenReady() {
    if (img.complete && img.naturalWidth > 0) {
      timer = setInterval(step, 50)
    } else {
      img.addEventListener('load', () => {
        timer = setInterval(step, 50)
      }, { once: true })
    }
  }

  startWhenReady()
}

window.addEventListener('DOMContentLoaded', catWalk)