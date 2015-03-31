var canvas;
var timer;

var size = 10;
var width = 10;
var max = 80;

var xdir = 1;
var ydir = 0;

var x = Math.floor((Math.random() * max));
var y = Math.floor((Math.random() * max));
var yfood = Math.floor((Math.random() * max));
var xfood = Math.floor((Math.random() * max));

var path = []

var tick = function () {
	x += xdir;
	y += ydir;
	var add = new point(x, y);

	if (path.length > size) {
		var rem = path.shift()
		drawSnake(rem, false)
	}
	checkDead(add);
	checkFood(add);
	path.push(add)
	drawSnake(add, true)
}

function checkDead(point) {
	var dead = point.x < 0 || point.y < 0 || point.x >= max || point.y >= max ||
		canvas.getImageData(point.x * width + 1, point.y * width + 1, 1, 1).data[1] == 1

	if (dead) {
		clearInterval(timer)
		document.getElementById("over").innerHTML = "<b>Game Over</b>"
	}
}

function checkFood(point) {
	if (xfood == point.x && yfood == point.y) {
		size++;
		drawFood(false);
		xfood = Math.floor((Math.random() * max));
		yfood = Math.floor((Math.random() * max));
		drawFood(true);
		document.getElementById("size").innerHTML = "<b>Score: </b>" + size;
	}
}

function drawFood(on) {
	if (on) {
		canvas.fillStyle = "rgb(0,200,0)"
	} else {
		canvas.fillStyle = "#fff";
	}
	canvas.fillRect(xfood * width, yfood * width, width, width)
}

function drawSnake(point, on) {
	if (on) {
		canvas.fillStyle = "rgb(255, 1, 0)";
	} else {
		canvas.fillStyle = "#fff";
	}
	canvas.fillRect(point.x * width, point.y * width, width, width)
}

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 37) {
		xdir = -1
		ydir = 0
	}
	if (event.keyCode == 39) {
		xdir = 1
		ydir = 0
	}
	if (event.keyCode == 38) {
		xdir = 0
		ydir = -1
	}
	if (event.keyCode == 40) {
		xdir = 0
		ydir = 1
	}
});

var point = function (x1, y1) {
	this.x = x1;
	this.y = y1;
}

function start() {
	canvas = document.getElementById("canvas").getContext("2d");
	timer = setInterval(tick, 50);
	drawFood(true);
}