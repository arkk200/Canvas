const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  generateRing();
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
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 500; // time to live, 캔버스에 너무 많은 입자가 생기지 않도록 수명을 부여함
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
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl--;
  }
}

let hue = 0;
let hueRadians = 0;
let particles = [];
const radian = Math.PI * 2 / 30;
function generateRing() {
  setTimeout(generateRing, 300);
  hue = Math.sin(hueRadians);
  for(let i = 0; i < 30; i++){
    const [x, y] = [mouse.x,
                    mouse.y];
    particles.push(new Particle(x, y, 5, `hsl(${hue * 360}, 50%, 50%)`, {
      x: + Math.cos(radian * i) * 2,
      y: + Math.sin(radian * i) * 2
    }));
  }
  hueRadians += 0.01;
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    if (particle.ttl < 0) particles.splice(index, 1);
    else particle.update();
  })
}
animate();
generateRing();