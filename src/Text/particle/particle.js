let canvas = document.querySelector('#canvas'),
  ctx = canvas.getContext('2d'),
  particles = [],
  amount = 0,
  mouse = { x: 0, y: 0 },
  radius = 1

let colors = ['#468966', '#FFF0A5', '#FFB03B', '#B64926', '#8E2800', '#B87FF1']

let input = document.querySelector('#input')

let W = canvas.width = window.innerWidth
let H = canvas.height = window.innerHeight

class Particle {
  constructor(x, y) {
    this.x = Math.random() * W
    this.y = Math.random() * H
    this.dest = {
      x: x,
      y: y
    }
    this.r = Math.random() * 5 + 2
    this.vx = (Math.random() - 0.5) * 20
    this.vy = (Math.random() - 0.5) * 20
    this.accX = 0
    this.accY = 0
    this.friction = Math.random() * 0.05 + 0.94

    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  render() {
    this.accX = (this.dest.x - this.x) / 1000
    this.accY = (this.dest.y - this.y) / 1000
    this.vx += this.accX
    this.vy += this.accY
    this.vx *= this.friction
    this.vy *= this.friction

    this.x += this.vx
    this.y += this.vy

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false)
    ctx.fill()

    let a = this.x - mouse.x
    let b = this.y - mouse.y

    let distance = Math.sqrt(a * a + b * b)
    if (distance < radius * 70) {
      this.accX = (this.x - mouse.x) / 100
      this.accY = (this.y - mouse.y) / 100
      this.vx += this.accX
      this.vy += this.accY
    }
  }
}


function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
  }
}

function onTouchEnd(e) {
  mouse.x = -9999
  mouse.y = -9999
}

function initScene() {

  ctx.clearRect(0, 0, W, H)

  let N = input.value.length >= 5 ? input.value.length + 1 : 5

  ctx.font = 'bold ' + W / N + 'px sans-serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '4px'
  ctx.fillText(input.value, W / 2, H / 2)

  var data = ctx.getImageData(0, 0, W, H).data
  ctx.clearRect(0, 0, W, H)
  ctx.globalCompositeOperation = 'screen'

  particles = []
  for (var i = 0; i < W; i += Math.round(W / 150)) {
    for (var j = 0; j < H; j += Math.round(W / 150)) {
      if (data[(i + j * W) * 4 + 3] > 150) {
        particles.push(new Particle(i, j))
      }
    }
  }
  amount = particles.length
}

function onMouseClick() {
  radius++
  if (radius === 5) {
    radius = 0
  }
}

function render(a) {
  requestAnimationFrame(render)
  ctx.clearRect(0, 0, W, H)
  for (var i = 0; i < amount; i++) {
    particles[i].render()
  }
}

input.addEventListener('keyup', initScene)
window.addEventListener('resize', initScene)
window.addEventListener('mousemove', onMouseMove)
window.addEventListener('touchmove', onTouchMove)
window.addEventListener('click', onMouseClick)
window.addEventListener('touchend', onTouchEnd)
initScene()
requestAnimationFrame(render)
