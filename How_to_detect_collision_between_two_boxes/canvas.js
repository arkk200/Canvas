const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
});

const blueRectangle = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50
};

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = '#1A1A23'; // 배경색
    // canvas에 꽉차게 배경을 그려주고 있으므로 c.clearRect()를 써줄 필요가 없다.
    c.fillRect(0, 0, canvas.width, canvas.height); // 배경

    if (mouse.x + 100 >= blueRectangle.x &&
        mouse.x <= blueRectangle.x + 100 &&
        mouse.y + 100 >= blueRectangle.y &&
        mouse.y <= blueRectangle.y + 100) console.log('colliding');

    // 마우스를 따라 움직이는 상자색
    c.fillStyle = '#E86262';
    c.fillRect(mouse.x, mouse.y, 100, 100); // 마우스를 따라 움직이는 상자

    // 중앙에 있는 상자색
    c.fillStyle = '#92ABEA';
    // 중앙에 있는 상자
    c.fillRect(blueRectangle.x, blueRectangle.y, 100, 100);
}

animate()
