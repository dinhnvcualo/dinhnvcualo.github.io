/*
Author: NGUYEN VAN DINH
Project: CALENDAR
*/

/**
* Global variables
*/
const FPS = 60;
const TICKS = 1000/FPS;
var die_arr=new Array();
var score=0;
var speed_arr=[1,2,5,10];
var level = 0;
var speed = 1;
var boomNum = 3;
var heart=3;
var highscore=0;
var endGame=false;
var isruning=true;

//Init High Score
if(sessionStorage.getItem("highscore") == null) {
	sessionStorage.setItem("highscore",0);
} else {
	highScore = sessionStorage.getItem("highscore");
}

//Init monster
var monster1 = {
	initX:0,
	initY:0,
	x:0,
	y:0,
	toX:150,
	toY:150,
	initToX:150,
	initToY:150,
	die:false,
	dieX:0,
	dieY:0,
	visible:true
};
var monster2 = {
	initX:200,
	initY:0,
	x:200,
	y:0,
	toX:200,
	toY:100,
	initToX:200,
	initToY:100,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
}

var monster3 = {
	initX:400,
	initY:0,
	x:400,
	y:0,
	toX:300,
	toY:100,
	initToX:300,
	initToY:100,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster4 = {
	initX:0,
	initY:200,
	x:0,
	y:200,
	toX:100,
	toY:200,
	initToX:100,
	initToY:200,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster5 = {
	initX:400,
	initY:200,
	x:400,
	y:200,
	toX:300,
	toY:200,
	initToX:300,
	initToY:200,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
}

var monster6 = {
	initX:0,
	initY:400,
	x:0,
	y:400,
	toX:100,
	toY:300,
	initToX:100,
	initToY:300,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster7 = {
	initX:200,
	initY:400,
	x:200,
	y:400,
	toX:200,
	toY:300,
	initToX:200,
	initToY:300,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster8 = {
	initX:400,
	initY:400,
	x:400,
	y:400,
	toX:300,
	toY:300,
	initToX:300,
	initToY:300,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};
var monster_arr=[monster1,monster2,monster3,monster4,monster5,monster6,monster7,monster8];

//Declare Main Canvas
mainCanvas = document.getElementById("main_canvas");
ctx = mainCanvas.getContext("2d");

//Declare Menu Canvas
menuCanvas = document.getElementById("menu_canvas");
ctx_menu = menuCanvas.getContext("2d");

topCanvas = document.getElementById("menu_top");
ctx_top = topCanvas.getContext("2d");

//Declare Audio
var thumpSound = new Audio("audio/die.flac");
var gameoverSound = new Audio("audio/gameover.wav");
var explosionSound = new Audio("audio/boom.wav");
//Declare Die Image
var readyDie=false;
var imgDie=new Image();
imgDie.onload=function(){
	readyDie=true;
};
imgDie.src="images/bloodstain.png";
//Declare Boom Image
var readyBoom=false;
var imgBoom=new Image();
imgBoom.onload=function(){
	readyBoom=true;
};
imgBoom.src="images/bomb-512.png";
//Declare Monster Image
var readyMonster=false;
var imgMonster=new Image();
imgMonster.onload=function(){
	readyMonster=true;
};
imgMonster.src="images/monster1.png";
//Declare Pause Image
var readyPause=false;
var imgePause=new Image();
imgePause.onload=function(){
	readyPause=true;
};
imgePause.src="images/pause.png";
//Declare Restart Image
var readyRestart=false;
var imgeRestart=new Image();
imgeRestart.onload=function(){
	readyRestart=true;
};
imgeRestart.src="images/restart.png";
//Declare Heart Image
var readyHeart=false;
var imgeHeart=new Image();
imgeHeart.onload=function(){
	readyHeart=true;
};
imgeHeart.src="images/heart.png";


function randomMonster() {
	var random = Math.floor((Math.random() * 8) + 1);
	if (monster_arr[random-1].visible==false) {
		monster_arr[random-1].visible=true;
		monster_arr[random-1].die=false;
	}
}
//Canvas main click
mainCanvas.addEventListener("click",function(e){
	var xPosition=e.pageX-this.offsetLeft;
	var yPosition=e.pageY-this.offsetTop;
	if (isruning) {
		heart--;
		if (monster1.visible) {
			clickMonster(xPosition,yPosition,monster1);
		}
		if (monster2.visible) {
			clickMonster(xPosition,yPosition,monster2);
		}
		if (monster3.visible) {
			clickMonster(xPosition,yPosition,monster3);
		}
		if (monster4.visible) {
			clickMonster(xPosition,yPosition,monster4);
		}
		if (monster5.visible) {
			clickMonster(xPosition,yPosition,monster5);
		}
		if (monster6.visible) {
			clickMonster(xPosition,yPosition,monster6);
		}
		if (monster7.visible) {
			clickMonster(xPosition,yPosition,monster7);
		}
		if (monster8.visible) {
			clickMonster(xPosition,yPosition,monster8);
		}
	}
});
//Monster click
function clickMonster(currentX,currentY,monster){
	if (currentX>=monster.x && currentX<=monster.x+100 && currentY>=monster.y && currentY<=monster.y+100) {
		heart++;
			monster.visible=false;
			monster.die=true;
			monster.x=monster.initX;
			monster.y=monster.initY;
			monster.toX=monster.initToX;
			monster.toY=monster.initToY;
			monster.dieX=currentX;
			monster.dieY=currentY;
			//Insert data to die position array
			var boom={};
			boom.x=currentX;
			boom.y=currentY;
			die_arr[die_arr.length]=boom;
			if (die_arr.length>9) {
				die_arr.splice(0,1);
			}
			score+=5;
			//Update level and speed
			var levelBefore = level;
			for (var i = 1; i < speed_arr.length; i++) {
				if (score==(i*200)) {
					speed=speed_arr[i];
					level++;
				}
			}
			if(level < levelBefore) {
				level = levelBefore;
			}
			if(level > 8) {
				level = 8;
			}
			for(var li = 0; li <= level; li++) {
				randomMonster();
			}
			if (thumpSound !== undefined) {thumpSound.play();}		
	}
}
//Canvas menu click
menuCanvas.addEventListener("click",function(e){
	var xPosition=e.pageX-this.offsetLeft;
	var yPosition=e.pageY-this.offsetTop;
	//PAUSE BUTTON CLICK
	if (xPosition>=30 && xPosition<=62 && yPosition>=10 && yPosition<=42) {
		if (isruning) {
			isruning=false;
		}else{
			isruning=true;
		}
		if (!endGame && isruning) {
			main();
		}
	}
	//RESTART BUTTON CLICK
	if (xPosition>=72 && xPosition<=104 && yPosition>=10 && yPosition<=42) {
		restartGame();
	}
});
//Canvas boom click
topCanvas.addEventListener("click",function(e){
	var xPosition=e.pageX-this.offsetLeft;
	var yPosition=e.pageY-this.offsetTop;
	//PAUSE BUTTON CLICK
	if (xPosition>=370 && xPosition<=402 && yPosition>=10 && yPosition<=42 && boomNum>0 && isruning) {
		boomNum--;
		killAllMonster(xPosition,yPosition);
		explosionSound.play();
	}else if (xPosition>=407 && xPosition<=439 && yPosition>=10 && yPosition<=42 && boomNum>0 && isruning) {
		boomNum--;
		killAllMonster(xPosition,yPosition);
		explosionSound.play();
	}
	else if (xPosition>=444 && xPosition<=476 && yPosition>=10 && yPosition<=42 && boomNum>0 && isruning) {
		boomNum--;
		killAllMonster(xPosition,yPosition);
		explosionSound.play();
	}
});
//KILL ALL MONSTER
function killAllMonster(xPosition,yPosition){
	for (var i = 0; i < monster_arr.length; i++) {
		if (monster_arr[i].visible==true) {
			monster_arr[i].visible=false;
			monster_arr[i].die=true;
			monster_arr[i].dieX=monster_arr[i].x;
			monster_arr[i].dieY=monster_arr[i].y;
			monster_arr[i].x=monster_arr[i].initX;
			monster_arr[i].y=monster_arr[i].initY;
			monster_arr[i].toX=monster_arr[i].initToX;
			monster_arr[i].toY=monster_arr[i].initToY;
			
			//Insert data to die position array
			var boom={};
			boom.x=monster_arr[i].dieX;
			boom.y=monster_arr[i].dieY;
			die_arr[die_arr.length]=boom;
			if (die_arr.length>9) {
				die_arr.splice(0,1);
			}
			score+=5;
			//Update level and speed
			var levelBefore = level;
			for (var i = 1; i < speed_arr.length; i++) {
				if (score==(i*200)) {
					speed=speed_arr[i];
					level++;
				}
			}
			if(level < levelBefore) {
				level = levelBefore;
			}
			if(level > 8) {
				level = 8;
			}
			for(var li = 0; li <= level; li++) {
				randomMonster();
			}
		}
	}
}
//RESTART FUNCTION
function restartGame(){
	for (var i = 0; i < monster_arr.length; i++) {
		initMonster(monster_arr[i]);
	}
	score=0;
	speed=1;
	endGame=false;
	level=0;
	isruning=true;
	heart=3;
	boomNum=3;
	die_arr=new Array();
	var random = Math.floor((Math.random() * 8) + 1);
	monster_arr[random-1].visible=true;

	main();
}
//INIT MONSTER
function initMonster(monster){
	monster.x=monster.initX;
	monster.y=monster.initY;
	monster.toX=monster.initToX;
	monster.toY=monster.initToY;
	monster.visible=false;
	monster.dieX=0;
	monster.die=false;
}
//Update coordinate for each monster
function update() {
	for (var i = 0; i < monster_arr.length; i++) {
		if (monster_arr[i].visible==true) {
			updateMonster(monster_arr[i]);
		}
	}
}
function updateMonster(monster){
	if (monster.visible) {
		ctx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
	}
	if(monster.x > monster.toX) {
		monster.x -= speed ;
	} else if(monster.x < monster.toX) {
		monster.x += speed;
	}

	if(monster.y > monster.toY) {
		monster.y -= speed;
	} else if(monster.y < monster.toY) {
		monster.y += speed;
	}
	if(monster.x == monster.toX && monster.y == monster.toY) {
		monster.x = monster.toX;
		monster.y = monster.toY;
		monster.toX = monster.initX;
		monster.toY = monster.initY;
	}

	if(monster.x == monster.initX && monster.y == monster.initY) {
		monster.visible = false;
		monster.x = monster.initX;
		monster.y = monster.initY;
		monster.toX = monster.initToX;
		monster.toY = monster.initToY;
		score -= 5;
		randomMonster();
	}
}
//RENDER ALL ITEM
function renderAllItem(){
	ctx_menu.clearRect(0,0,menuCanvas.width,menuCanvas.height);
	ctx_top.clearRect(0,0,topCanvas.width,topCanvas.height);
	//RENDER DIE
	if (readyDie) {
			for (var i = 0; i < die_arr.length; i++) {
				ctx.drawImage(imgDie,die_arr[i].x-50,die_arr[i].y-50);	
			}
		}
	//RENDER BOOM
	if (readyBoom) {
		for (var i = 1; i <= boomNum; i++) {
			ctx_top.drawImage(imgBoom,370+((i-1)*37),10);
		}
	}
	//RENDER PAUSE
	if (readyPause) {
		ctx_menu.drawImage(imgePause,30,10);
	}
	//RENDER RESTART
	if (readyRestart) {
		ctx_menu.drawImage(imgeRestart,72,10);
	}
	//RENDER HEART
	if (readyHeart) {
		for (var i = 1; i <= heart; i++) {
			ctx_menu.drawImage(imgeHeart,132+(32*(i-1)),15);
		}
	}
	//RENDER HIGH SCORE
	highScore = sessionStorage.getItem("highscore");
	ctx_menu.fillStyle = "#FFF";
	ctx_menu.font = "20px Arial"
	ctx_menu.fillText("HIGH SCORE: "+sessionStorage.getItem("highscore"), 300, 30);
	//RENDER SCORE
	ctx_top.fillStyle = "#FFF";
	ctx_top.font = "20px Arial"
	ctx_top.fillText("SCORE: "+score, 20, 30);
}
//RENDER MONSTER
function renderMonster(){
	//RENDER MONSTER
	if (readyMonster) {
		for (var i = 0; i < monster_arr.length; i++) {
			if (monster_arr[i].visible) {
				ctx.drawImage(imgMonster,monster_arr[i].x,monster_arr[i].y);
			}
		}
	}
}
function gameOver(){
	endGame=true;
	isruning=false;
	if (score>sessionStorage.getItem("highscore")) {
		sessionStorage.setItem("highscore",score);
	}
}
function main(){
	if (heart<=0) {
		gameOver();
	}
	var now = Date.now();
	var differentTime = now - lastUpdateTime;
	if(differentTime >= TICKS) {
		update();
		renderAllItem();
		renderMonster();
		lastUpdateTime = now;
	}
	var sleepTime = TICKS - differentTime;
	if(sleepTime < 0) {
		sleepTime = 0;
	} 
	if (isruning) {
		requestAnimationFrame(main);
	}else if (endGame && !isruning) {
		ctx.fillStyle = "#F1F1F1";
		ctx.font = "30px Arial"
		ctx.fillText("GAME OVER", 150, 250);
		gameoverSound.play();
	}else if (!isruning && !endGame) {
		ctx.fillStyle = "#F1F1F1";
		ctx.font = "30px Arial"
		ctx.fillText("GAME PAUSE", 150, 250);
	}
}
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var lastUpdateTime = Date.now();
main();