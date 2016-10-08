/**
 * 计时
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var RADIUS = 4;//圆颗粒半径
var currentShowTimeSeconds = 0;//初始化计时(秒)
var balls = [];
const colors = ["rgb(255,0,0)", "rgb(255,128,0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,255,255)", "rgb(0,0,255)", "rgb(128,0,255)"];

window.onload = function () {
    var canvas = document.getElementById("canvas");
    //自适应页面窗口
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 0.8 / 108) - 1;
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    var context = canvas.getContext("2d");
    currentShowTimeSeconds = Math.floor(new Date().getTime() / 1000) % 86400;
    setInterval(function () {
        render(context);
        update();
    }, 50);
};
/**
 * 绘制整个图
 * @param context
 */
function render(context) {
    context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = Math.floor(currentShowTimeSeconds / 3600),
        minutes = Math.floor((currentShowTimeSeconds - hours * 3600) / 60),
        seconds = currentShowTimeSeconds % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, Math.floor(hours / 10), context);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, Math.floor(hours % 10), context);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, Math.floor(minutes / 10), context);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, Math.floor(minutes % 10), context);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, Math.floor(seconds / 10), context);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, Math.floor(seconds % 10), context);
    for (var i = 0; i < balls.length; i++) {
        context.fillStyle = balls[i].color;
        context.beginPath();
        context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }
    //console.log(balls.length);
}
/**
 * 绘制数字
 * @param x
 * @param y
 * @param num
 * @param context
 */
function renderDigit(x, y, num, context) {
    context.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                context.beginPath();
                context.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                context.closePath();
                context.fill();
            }
        }
    }
}
/**
 * 更新时间
 */
function update() {
    var nextShowTimeSeconds = Math.floor(new Date().getTime() / 1000) % 86400;
    var nextHours = Math.floor(nextShowTimeSeconds / 3600),
        nextMinutes = Math.floor((nextShowTimeSeconds - nextHours * 3600) / 60),
        nextSeconds = nextShowTimeSeconds % 60;
    var currentHours = Math.floor(currentShowTimeSeconds / 3600),
        currentMinutes = Math.floor((currentShowTimeSeconds - currentHours * 3600) / 60),
        currentSeconds = currentShowTimeSeconds % 60;
    if (nextSeconds != currentSeconds) {
        if (Math.floor(currentHours / 10) != Math.floor(nextHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, Math.floor(currentHours / 10));
        }
        if (currentHours % 10 != nextHours % 10) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, currentHours % 10);
        }
        if (Math.floor(currentMinutes / 10) != Math.floor(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, Math.floor(currentMinutes / 10));
        }
        if (currentMinutes % 10 != nextMinutes % 10) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, currentMinutes % 10);
        }
        if (Math.floor(currentSeconds / 10) != Math.floor(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, Math.floor(currentSeconds / 10));
        }
        if (currentSeconds % 10 != nextSeconds % 10) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, currentSeconds % 10);
        }
        currentShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}
/**
 * 添加掉落的小球
 * @param x
 * @param y
 * @param num
 */
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num].length; j++) {
            if (digit[num][i][j] == 1) {
                var ball = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.floor(Math.random() * 100)) * (2 + Math.random() * 4),
                    vy: Math.pow(-1, Math.floor(Math.random() * 100)) * (2 + Math.random() * 4),
                    color: colors[Math.floor(Math.random() * colors.length)]
                };
                balls.push(ball);
            }
        }
    }
}
/**
 * 更新小球的位置
 */
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= canvas.height - RADIUS) {
            balls[i].y = canvas.height - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
        if (balls[i].y <= RADIUS) {
            balls[i].y = RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
    var count = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x >= RADIUS && balls[i].x <= (canvas.width - RADIUS)) {
            balls[count++] = balls[i];
        }
    }
    while (balls.length > count) {
        balls.pop();
    }
}