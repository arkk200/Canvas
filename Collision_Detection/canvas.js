const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

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

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x : velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y : velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  }
  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  // 속도 차이
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  // x, y 거리
  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x); // 두 공이 만났을 때 만들어진 각도

    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    /*
    위에서 만들어진 각도만큼 좌표평면을 회전하여 두 원이 x축 위에 있게 만들어
    1차원에서 충돌 후 튕기는 문제를 쉽게 함
    */
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // 충돌 공식 https://en.wikipedia.org/wiki/Elastic_collision
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
    const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y};

    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5
    }
    this.radius = radius
    this.color = color
    this.mass = 1
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color
    c.stroke();
    c.closePath()
  }

  update(particles) {
    this.draw()

    for(let i = 0; i < particles.length; i++){
      if(this === particles[i]) continue; // 자기자신과의 충돌은 감지 안함
      if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){ // 현재 객체와 다른 모든 객체의 충돌을 감지한다.
        resolveCollision(this, particles[i]);
      }
    }

    if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) this.velocity.x *= -1;
    if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) this.velocity.y *= -1;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Implementation
let particles;
function init() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    const radius = 15;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = 'blue'

    if(i !== 0){
      for (let j = 0; j < particles.length; j++) {
        if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, radius, color));
  }
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update(particles);
  })
}

init()
animate()
