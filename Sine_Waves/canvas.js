const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 100,
    frequency: 0.03
}

const strokeSolor = {
    h: 200,
    s: 50,
    l: 50
}

const background = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.05
}

let increment = 0;
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(-1, canvas.height / 2);
    for (let i = -1; i < canvas.width + 1; i++) // 각 개별 픽셀에 대해 선을 그림
        c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
    c.strokeStyle = `hsl(${strokeSolor.h * Math.sin(increment)}, ${strokeSolor.s}%, ${strokeSolor.l}%)`;
    c.stroke();
    increment += wave.frequency;
}

animate();