const FRAMES_PER_SECOND = 15;
const GRID_SIZE = 20;
const TILE_COUNT = 20;
var showGameOverScreen = false;
var xVel = 0, yVel = 0;
var xPos = 10, yPos = 10;
var xFd = 15, yFd = 15;
var trail = [];
var tail = 5;

function keyPush(event) {
	switch(event.keyCode){
		case 37:  xVel = -1;
				  yVel = 0;
				  break;
		case 38:  xVel = 0;
				  yVel = -1;
				  break;
		case 39:  xVel = 1;
				  yVel = 0;
				  break;	
		case 40:  xVel = 0;
				  yVel = 1;
				  break;			  
	}
}

function getKeyPress(event) {
	if(showGameOverScreen) {
		if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40)
			showGameOverScreen = false;
	}
}

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	document.addEventListener('keydown', getKeyPress);
	document.addEventListener('keydown', keyPush);
	setInterval(function() {
		checkGameOver();
		paintComponents();
	}, 1000/FRAMES_PER_SECOND);
}

function checkGameOver() {
	if(showGameOverScreen) {
		canvasContext.fillStyle = "black";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);

		canvasContext.fillStyle = "white";
		canvasContext.fillText("Game Over! Press any arrow key to play again", 90, 150);
	}
}

function paintComponents() {
	if(showGameOverScreen)
		return;
	xPos += xVel;
	yPos += yVel;

	if(xPos < 0)
		xPos = TILE_COUNT - 1;
	if(xPos > TILE_COUNT - 1)
		xPos = 0;
	if(yPos < 0)
		yPos = TILE_COUNT - 1;
	if(yPos > TILE_COUNT - 1)
		yPos = 0;

	canvasContext.fillStyle = "black";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	canvasContext.fillStyle = "white";
	canvasContext.fillRect(xFd * GRID_SIZE, yFd * GRID_SIZE,  GRID_SIZE - 2, GRID_SIZE - 2);

	canvasContext.fillStyle = "white";
	for(var i = 0; i < trail.length; i++) {
		canvasContext.fillRect(trail[i].x * GRID_SIZE, trail[i].y * GRID_SIZE,  GRID_SIZE - 2, GRID_SIZE - 2);		

		if(trail[i].x == xPos && trail[i].y == yPos) {
			tail = 5;
			showGameOverScreen = true;
		}
	}

	trail.push({x:xPos, y:yPos});

	while(trail.length > tail)
			trail.shift();

	if(xFd == xPos && yFd == yPos){
			tail++;
			xFd = Math.floor(Math.random()*TILE_COUNT);
			yFd = Math.floor(Math.random()*TILE_COUNT);
	}	

}
