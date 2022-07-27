// import gsap from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js";
import {gsap} from "gsap";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

let angle = 0;



const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
  gsap.to(mouse, {
    x: event.clientX - canvas.width / 2,
    y: event.clientY - canvas.height / 2,
    duration: 1
  })
  angle = Math.atan2(mouse.y, mouse.x);
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
  constructor(x, y, radius, color, distanceFromCenter) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distanceFromCenter = distanceFromCenter;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.x = center.x + this.distanceFromCenter * Math.cos(angle);
    this.y = center.y + this.distanceFromCenter * Math.sin(angle);
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  const particleCount = 200;
  const hueIncrement = 360 / particleCount;

  for(let i = 0; i < particleCount; i++){
    const x = canvas.width / 2 + i * Math.cos(Math.PI);
    const y = canvas.height / 2 + i * Math.sin(-Math.PI);

    particles.push(new Particle(x, y, 5, `hsl(${i * hueIncrement}, 50%, 50%)`, i));
  }
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();