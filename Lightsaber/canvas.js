const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: -1,
  y: 0
};

const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

let angle = 0;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX - canvas.width / 2;
  mouse.y = event.clientY - canvas.height / 2;
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
  constructor(x, y, radius, color, distFromCenter) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distFromCenter = distFromCenter;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(timer) {
    angle = Math.atan2(mouse.y, mouse.x);

    const { cos, sin } = Math;
    const { distFromCenter } = this;
    
    this.x = center.x + distFromCenter * cos(-angle) * sin(timer + distFromCenter) * cos(timer + distFromCenter) * 2;
    this.y = center.y + distFromCenter * sin(-angle) * cos(timer + distFromCenter) * cos(timer) * 2;
    
    this.draw();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  const particleCount = 200;
  const hueIncrement = 360 / particleCount;

  const baseRadius = 3;
  const radiusIncrement = baseRadius / particleCount
  for(let i = 0; i < particleCount; i++){
    const x = canvas.width / 2 + i;
    const y = canvas.height / 2 + i;

    particles.push(new Particle(x, y, baseRadius - radiusIncrement * i, `hsl(${i * hueIncrement}, 50%, 50%)`, i));
  }
}

// Animation Loop
let timer = 0;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update(timer);
  });

  timer += 0.004;
}

init();
animate();