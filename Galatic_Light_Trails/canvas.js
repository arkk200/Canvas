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
let mouseDown = false;
addEventListener('mousedown', () => {
  mouseDown = true;
});
addEventListener('mouseup', () => {
  mouseDown = false;
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
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 5;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for(let i = 0; i < 400; i++){
    const canvasWidth = canvas.width + 1000;
    const canvasHeight = canvas.height + 1000;
    const x = Math.random() * canvasWidth - canvasWidth / 2;
    const y = Math.random() * canvasHeight - canvasHeight / 2;
    const radius = 2 * Math.random();
    const color = randomColor(colors);
    particles.push(new Particle(x, y, radius, color));
  }
}
// Animation Loop
let radians = 0;
let radianVelocity = 0.001;
let alpha = 1;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(25, 25, 56, ${alpha})`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  
  c.save() // 화면 밖으로 튀어나가는 이상한 점을 막기 위해 save() 매서드 호출
  c.translate(canvas.width / 2, canvas.height / 2); // 중심점 설정
  c.rotate(radians); // 회전
  particles.forEach(particle => {
    particle.update(); // 회전한 값을 토대로 update() 매서드 호출
  });
  c.restore(); // 저장했던 상태 가져옴
  radians += radianVelocity; // 회전 크기(속도)

  if(mouseDown) {
    alpha -= alpha >= 0.1 ? 0.02 : 0;
    alpha = Math.max(alpha, 0.1);
    radianVelocity += radianVelocity <= 0.01 ? 0.0001 : 0;
    radianVelocity = Math.min(radianVelocity, 0.01)
  } else if(!mouseDown){
    alpha += alpha < 1 ? 0.005 : 0;
    alpha = Math.min(alpha, 1);
    radianVelocity -= radianVelocity > 0.001 ? 0.0001 : 0;
    radianVelocity = Math.max(radianVelocity, 0.001)
  }
}

init();
animate();