let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let radius = 30; // 반지름
let x = Math.random() * (innerWidth - radius * 2) + radius; // 위치에 랜덤값을 줌
let y = Math.random() * (innerHeight - radius * 2) + radius;
let dx = (Math.random() - 0.5) * 40; // 방향(부호) 및 속도(절댓값)에 랜덤값을 줌
let dy = (Math.random() - 0.5) * 40;
function animate() {
    requestAnimationFrame(animate); // 루프를 생성하여 애니메이션을 만들어줌
    // console.log('test'); 루프 확인용 코드
    // clearRect(x, y, width, height); 캔버스에 그려진 요소들을 다 지움
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    if(x + radius > innerWidth || x - radius < 0) { dx = -dx; } // 벽에 튕겨졌을 때 방향을 바꿈
    if(y + radius > innerHeight || y - radius < 0) { dy = -dy; }
    x += dx;
    y += dy;
}

animate();