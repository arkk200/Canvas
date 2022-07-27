const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = [
  '#00bdff',
  '#4d39ce',
  '#088eff',
];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.fixedX = x;
    this.y = y;
    this.fixedY = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMouse = {x: x, y: y};
  }
  draw({x, y}) {
    c.beginPath();
    /*
    fillRect는 rect, arc 등과 달리 fill() 매서드를 호출하지 않아도 면이 생성된다.
    단, fillRect() 매서드가 호출되기 전에 beginPath() 매서드가 호출된다면 fillStyle을 정의해주어야 면이 나타난다.
    */
    // c.fillRect(this.x, this.y, 5, 5);
    // 원을 생성하여 애니메이션을 그리면 원들 사이에 간격이 보이기에 선을 이용함
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(x, y);
    c.lineTo(this.x, this.y);
    c.lineCap = "round";
    c.stroke();
    c.closePath();
  }

  update() {
    // Move points over time
    const lastPoint = {x: this.x, y: this.y};

    // Move points over time
    this.radians += this.velocity;

    // Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // Circular Motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  }
}

// Implementation
let particles;
function init() {
  particles = [];
  for(let i = 0; i < 50; i++){
    const radius = randomIntFromRange(5, 10);
    particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColor(colors)));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255, 255, 255, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
  })
}

init();
animate();