let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;
let minRadius = 2;

window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

function Circle(x, y, dx, dy, radius) { // 원 클래스
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() { // 원을 그림
        // clearRect(x, y, width, height); 캔버스에 그려진 요소들을 다 지움
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "red";
        c.stroke();
        c.fill(); // fill() 매서드는 면을 생성한다.
    }
    this.update = function() { // 원의 방향과 속도를 업데이트함
        this.draw();
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) { this.dx = -this.dx; } // 벽에 튕겨졌을 때 방향을 바꿈
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) { this.dy = -this.dy; }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) { // 만약 마우스와 원의 거리가 50 미만이라면
            if(this.radius < maxRadius)
            this.radius += 2;
        } else if (this.radius > minRadius){
            this.radius -= 1;
        }
    }
}

let radius = 50; // 반지름

let circleArray = []; // 원 여러개를 저장하는 배열

for(let i = 0; i < 300; i++){ // 원을 여러개 생성함
    // 원이 생성될 때마다 각각 랜덤함 값을 줌
    let x = Math.random() * (innerWidth - radius * 2) + radius; // 위치에 랜덤값을 줌
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5; // 방향(부호) 및 속도(절댓값)에 랜덤값을 줌
    let dy = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate); // 루프를 생성하여 애니메이션을 만들어줌
    // console.log('test'); 루프 확인용 코드
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(let i = 0; i < circleArray.length; i++){ // 배열 길이(원의 개수)만큼 배열에서 원을 하나씩 가져옴
        circleArray[i].update();
    }
}

animate();