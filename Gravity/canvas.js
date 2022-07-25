const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let gravity = 1;
let friction = 0.8;

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

addEventListener('click', () => {
  init();
})

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
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
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
    if(this.y + this.radius > canvas.height) { this.dy *= -(friction); this.y = canvas.height - this.radius; }
    this.dy += gravity; // this is a magic code that make gravity!
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx *= -1;
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

// Implementation
let ball;
let ballArray = [];
function init() {
  ballArray = []
  for(let i = 0; i < 400; i++){
    let radius = randomIntFromRange(10, 13);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(0, canvas.height - radius);
    let dx = randomIntFromRange(-2, 2);
    let dy = randomIntFromRange(-2, 2);
    let color = randomColor(colors)
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
