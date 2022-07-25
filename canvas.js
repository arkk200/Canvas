var canvas = document.querySelector('canvas');

/*
CSS로 canvas{ width: 100%; height: 100%; }
로 크기를 정하려고 해도 웹 상에서 제대로 되지 않기 때문에
JS에서 크기를 지정해준다.
*/
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// fillStyle에 색상을 주면 색상이 다시 바뀌기 전까지
// 모두 똑같은 색을 가지게 된다.
c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(x, y, width, height); 사각형을 그려줌
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.5)";
c.fillRect(400, 100, 100, 100);
c.fillStyle = "rgba(0, 255, 0, 0.5)";
c.fillRect(300, 300, 100, 100);

// Line
// canvas한테 path를 그리겠다고 알려줌

c.beginPath();
// c.moveTo(x, y); path가 시작하는 위치를 선언함
c.moveTo(50, 300); // 시작점
// lineTo(x, y); lineTo도 마찬가지로 x, y 순으로 인자를 받음
c.lineTo(300, 100);
// lineTo() 매서드를 추가로 쓰면 선을 이어서 그릴 수 있음
c.lineTo(400, 300);
c.strokeStyle = "#fa34a3";// strokeStyle 값은 CSS 형식으로 쓰면 됨
c.stroke(); // path를 캔버스에 그리려면 stroke() 매서드를 호출해야함

/*
전에 그렸던 선에 이어서 원을 그리기 싫다면
beginPath() 매서드를 호출해 다시 새로 그려줄 수 있다.
*/
c.beginPath();
/*
c.arc(x:int, y:int, radius:int,
    startAngle:float, endAngle:float, // startAngle과 endAngle엔 라디안 각도 값이 들어감
    drawCounterClockwise:bool(default: false)); // 호를 그리는 방향을 지정함, 기본값: 시계방향
*/
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = "blue"; // 색상은 stroke() 매서드가 호출되기 전까지 정해줘도 된다.
// arc매서드도 마찬가지로 stroke() 매서드를 호츌해야 캔버스에 그릴 수 있다.
c.stroke();

c.strokeStyle = "red";
for(let i = 0; i < 100; i++){
    let x = Math.random() * window.innerWidth; // 웹 브라우저 너비만큼 곱함
    let y = Math.random() * window.innerHeight; // 웹 브라우저 높이만큼 곱함
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.stroke();
}