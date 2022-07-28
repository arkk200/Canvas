/*
Basic Game Checklist:
- Create a player 플레이어 생성하기 V
- Shoot projectiles 발사체 생성 및 쏘기 V
- Create enemies 적 생성하기 V
- Detect collision on enemy / projectile hit 적, 발사체 충돌 감지하기
- Detect collision on enemy / player hit 적, 플레이어 충돌 감지하기
- Remove off screen projectiles 스크린에서 벗어난 발사체 삭제하기
- Colorize game 색 입히기
- Shrink enemies on hit 맞힌 적 수축하기
- Create particle explosion on hit 맞았을 때 터지는 파티클 생성하기
- Add score 점수 추가하기
- Add game over UI 게임 오버 UI 추가하기
- Add restart button 재시작 버튼 추가하기
- Add start game button 게임 시작 버튼 추가하기
*/

const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

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

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue');
const projectiles = []; // 발사체 그룹
const enemies = []; // 적 그룹

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4;

        let x;
        let y;

        if(Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const color = 'green';
        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
        );
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    projectiles.forEach(projectile => {
        projectile.update();
    });

    enemies.forEach(enemy => {
        enemy.update();
    })
}

addEventListener('click', event => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
    );
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
    projectiles.push(new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            5,
            'red',
            {
                x: velocity.x,
                y: velocity.y
            }
        )
    );
});

animate();
spawnEnemies();