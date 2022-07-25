const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let gravity = 1;
let friction = 0.94;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy;
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    // if(...) { ...this.y = canvas.height - this.radius; 바닥에서 튕기지 않고 떠는 현상 방지 }
    if(this.y + this.radius > canvas.height) { this.dy *= -friction; this.y = canvas.height - this.radius; }
    else this.dy += gravity; // this is a magic code that make gravity!
    this.y += this.dy;
    this.draw()
  }
}

// Implementation
let ball;
let ballArray = [];
function init() {
  ball = new Ball(canvas.width/2, canvas.height/2, 2, 30, 'red');
  for(let i = 0; i < 500; i++){
    let x = 
    ballArray.push(new Ball());
  }
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  ball.update();
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
