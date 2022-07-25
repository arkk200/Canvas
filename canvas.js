var canvas = document.querySelector('canvas');

/*
CSS로 canvas{ width: 100%; height: 100%; }
로 크기를 정하려고 해도 웹 상에서 제대로 되지 않기 때문에
JS에서 크기를 지정해준다.
*/
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// c.fillRect(x, y, width, height); 사각형을 그려줌
c.fillRect(100, 100, 100, 100);
c.fillRect(400, 100, 100, 100);
c.fillRect(300, 300, 100, 100);