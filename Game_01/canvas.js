/*
Basic Game Checklist:
- Create a player 플레이어 생성하기 V
- Shoot projectiles 발사체 생성 및 쏘기 V
- Create enemies 적 생성하기 V
- Detect collision on enemy / projectile hit 적, 발사체 충돌 감지하기 V
- Detect collision on enemy / player hit 적, 플레이어 충돌 감지하기 V
- Remove off screen projectiles 스크린에서 벗어난 발사체 삭제하기 V
- Colorize game 색 입히기 V
- Shrink enemies on hit 맞힌 적 수축하기 V
- Create particle explosion on hit 맞았을 때 터지는 파티클 생성하기 V
- Add score 점수 추가하기 V
- Add start game button 게임 시작 버튼 추가하기 V
- Add game over UI 게임 오버 UI 추가하기 V
- Add restart button 재시작 버튼 추가하기 V
*/

const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const $scoreEl = document.querySelector('#scoreEl');
const $startGameBtn = document.querySelector('#startGameBtn');
const $modalEl = document.querySelector('#modalEl');
const $bigScoreEl = document.querySelector('#bigScoreEl');

const c = canvas.getContext('2d');

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const friction = 0.99;
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

let player = new Player(x, y, 10, 'white'); // 플레이어
let projectiles = []; // 발사체 그룹
let enemies = []; // 적 그룹
let particles = []; // 파티클 그룹

function init() { // 초기화
    player = new Player(x, y, 10, 'white'); // 플레이어
    projectiles = []; // 발사체 그룹
    enemies = []; // 적 그룹
    particles = []; // 파티클 그룹
    score = 0;
    $scoreEl.textContent = score;
    $bigScoreEl.textContent = score;
}

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4;

        let x;
        let y;

        if (Math.random() < 0.5) { // 양 끝에서 적 생성
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height; // 나오는 적의 y축은 무작위
        } else { // 위 아래에 적 생성
            x = Math.random() * canvas.width; // 나오는 적의 x축은 무작위
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`; // 무작위 색 생성
        const angle = Math.atan2( // y축, x축에 따라 나온 각도
            canvas.height / 2 - y, // 나오는 위치에서 중심까지의 y축 거리 (플레이어까지의 y축 거리)
            canvas.width / 2 - x // 나오는 위치에서 중심까지의 x축 거리 (플레이어까지의 x축 거리)
        );
        const velocity = {
            x: Math.cos(angle), // 나온 각도만큼의 x축 속도
            y: Math.sin(angle) // 나온 각도만큼의 y축 속도
        };
        enemies.push(new Enemy(x, y, radius, color, velocity)); // 적 배열에 추가
    }, 1000); // 1초 마다 실행
}

let animationId;
let score = 0;
function animate() {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    particles.forEach((particle, index) => { // 모든 파티클 업데이트
        if(particle.alpha <= 0) { // 파티클의 알파값이 0보다 같거나 작다면
            particles.splice(index, 1); // 파티클 배열에서 제거
            return;
        }
        particle.update(); // 배열에 존재한다면 생성
    })
    projectiles.forEach((projectile, index) => {
        projectile.update(); // 배열에 존재한다면 생성

        if (projectile.x + projectile.radius < 0 || // 발사체가 화면 밖으로 나간다면
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(index, 1); // 발사체 배열에서 제거
            }, 0)
        }
    });

    enemies.forEach((enemy, index) => { // 적 배열에서 하나씩 검사
        enemy.update(); // 배열에 존재한다면 생성

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist - enemy.radius - player.radius < 0) { // 적과 플레이어가 충돌했다면
            cancelAnimationFrame(animationId); // 애니메이션 멈추기 (게임 멈추기)
            $modalEl.style.display = 'flex';
            $bigScoreEl.textContent = score;
        }

        projectiles.forEach((projectile, projectileIndex) => { // 발사체 배열에서 하나씩 검사
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            // 적과 발사체가 충돌한다면
            if (dist - enemy.radius - projectile.radius < 0) {
                for (let i = 0; i < enemy.radius * 2; i++) { // 적의 크기 만큼 파티클 생성
                    particles.push(new Particle(
                        projectile.x,
                        projectile.y,
                        Math.random() * 2,
                        enemy.color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * 6),
                            y: (Math.random() - 0.5) * (Math.random() * 6)
                        }
                    ));
                }
                /*
                    마지막 인수가 제거 되었는데도
                    그릴려고 하는 것 때문에 발생하는 플래시 현상을
                    setTimeout 비동기 함수로 제거함
                */
                if (enemy.radius - 10 > 5) { // 적의 반지름 최소 5 초과, 적의 반지름이 15보다 크다면
                    score += 100;
                    gsap.to(enemy, {
                        radius: enemy.radius - 10 // 적의 반지름 -= 10
                    });
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1); // 적과 발사체가 충돌했으므로 발사체는 제거
                    }, 0);
                } else { // 그렇지 않다면
                    score += 250;
                    setTimeout(() => { // 플래시 현상을 막기위해 비동기 함수 사용
                        enemies.splice(index, 1); // 적 배열에서 제거
                        projectiles.splice(projectileIndex, 1); // 발사체도 똑같이 발사체 배열에서 제거
                    }, 0);
                }
                $scoreEl.textContent = score;
            }
        });
    })
}

$startGameBtn.addEventListener('click', () => {
    init();
    animate();
    spawnEnemies();
    $modalEl.style.display = 'none';
    $startGameBtn.textContent = 'Restart Game'
    // 화면을 클릭했다면
    setTimeout(() => { // 게임 시작 버튼을 눌렀을 때 발사체가 나가는 것을 방지
        addEventListener('click', event => {
            const angle = Math.atan2( // 화면 중심에서 클릭한 위치까지의 각도 (라디안)
                event.clientY - canvas.height / 2,
                event.clientX - canvas.width / 2
            );
            const velocity = {
                x: Math.cos(angle) * 6, // 나온 각도만큼의 x축 속도
                y: Math.sin(angle) * 6 // 나온 각도만큼의 y축 속도
            };
            projectiles.push(new Projectile( // 배열에 발사체 추가
                canvas.width / 2,
                canvas.height / 2,
                5,
                'white',
                {
                    x: velocity.x,
                    y: velocity.y
                }
            ));
        });
    }, 0);
});