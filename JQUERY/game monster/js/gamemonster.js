/*
Author: NGUYEN VAN DINH
Project: CALENDAR
*/
$(document).ready(function(){
	var monster1 = {
	initX:0,
	initY:0,
	toX:100,
	toY:100
	};
	var monster2 = {
		initX:200,
		initY:0,
		toX:200,
		toY:100
	}

	var monster3 = {
		initX:400,
		initY:0,
		toX:300,
		toY:100
	};

	var monster4 = {
		initX:0,
		initY:200,
		toX:100,
		toY:200
	};

	var monster5 = {
		initX:400,
		initY:200,
		toX:300,
		toY:200
	}

	var monster6 = {
		initX:0,
		initY:400,
		toX:100,
		toY:300
	};

	var monster7 = {
		initX:200,
		initY:400,
		toX:200,
		toY:300
	};

	var monster8 = {
		initX:400,
		initY:400,
		toX:300,
		toY:300
	};
	var mon1 = $("#mon1");
	var mon2 = $("#mon2");
	var mon3 = $("#mon3");
	var mon4 = $("#mon4");
	var mon5 = $("#mon5");
	var mon6 = $("#mon6");
	var mon7 = $("#mon7");
	var mon8 = $("#mon8");
	//BEGIN MONSTER CLICK EVENT
	mon1.click(function(e){
		onClickMonster(mon1);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	mon2.click(function(e){
		onClickMonster(mon2);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	mon3.click(function(e){
		onClickMonster(mon3);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	mon4.click(function(e){
		onClickMonster(mon4);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	mon5.click(function(e){
		onClickMonster(mon5);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	mon6.click(function(e){
		onClickMonster(mon6);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	mon7.click(function(e){
		onClickMonster(mon7);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	mon8.click(function(e){
		onClickMonster(mon8);
		var x=e.pageX-offset.left;
		var y=e.pageY-offset.top;
		showBoom(x,y);
	});
	var scoreText=$(".score");
	var speed=1000;
	var running=true;
	var score=0;
	var level=1;
	var boomNum=0;
	var boomNumMax=7;
	var heart=3;
	//BOOM CLICK
	$("#boomlist > img").click(function(){
		alert("click boom");
	});
	//PAUSE CLICK
	$(".pause_img").click(function(){
		running=false;
		stopMonster();
		updateText("PAUSE GAME");
	});
	//RESTART CLICK
	$(".restart_img").click(function(){
		alert("RESTART GAME");
	});
	//MAIN GAME CLICK
	$("#main_game").click(function(){
		heart--;
		updateHeart();
		if (heart<=0) {
			gameOver();
		}
	});
	function gameOver(){
		running=false;
		stopMonster();
		updateHighScore();
		updateText("GAME OVER");
	}
	function updateHighScore(){}
	function updateText(text){
		var span=$("<span>");
		span.css({
			"position": 'absolute',
			"top": '200px',
			"left": '150px',
			"font-size": '30px',
			"font-weight":'bold'
		});
		span.html(text);
		$("#main_game").append(span);
	};
	function stopMonster(){
		if (mon1.is(":visible")) {mon1.stop();}
		if (mon2.is(":visible")) {mon2.stop();}
		if (mon3.is(":visible")) {mon3.stop();}
		if (mon4.is(":visible")) {mon4.stop();}
		if (mon5.is(":visible")) {mon5.stop();}
		if (mon6.is(":visible")) {mon6.stop();}
		if (mon7.is(":visible")) {mon7.stop();}
		if (mon8.is(":visible")) {mon8.stop();}
	}
	function moveMonster(mon,monsterInit){
		if (running) {
			mon.animate({
				"left":monsterInit.toX+'px',
				"top":monsterInit.toY+'px'
			},speed,function(){
				mon.animate({
					"left":monsterInit.initX+'px',
					"top":monsterInit.initY+'px'
				},speed,function(){
					mon.hide();
					if (score%100==0 && score>0) {
						level++;
						speed-=200;
						if (speed<=0) {
							speed=200;
						}
					}
					var monsterVisible=getAllVisibleMonster();
					while(monsterVisible<level) {
						monsterVisible++;
						randomMonster();
					}
				})
			})
		}
	}
	function randomMonster(){
		var random = Math.floor((Math.random() * 8) + 1);
			switch(random) {
				case 1:
				if(!mon1.is(":visible")) {
					mon1.show();
					moveMonster(mon1, monster1);
				}
				break;
				case 2:
				if(!mon2.is(":visible")) {
					mon2.show();
					moveMonster(mon2, monster2);
				}
				break;
				case 3:
				if(!mon3.is(":visible")) {
					mon3.show();
					moveMonster(mon3, monster3);
				}
				break;
				case 4:
				if(!mon4.is(":visible")) {
					mon4.show();
					moveMonster(mon4, monster4);
				}
				break;
				case 5:
				if(!mon5.is(":visible")) {
					mon5.show();
					moveMonster(mon5, monster5);
				}
				break;
				case 6:
				if(!mon6.is(":visible")) {
					mon6.show();
					moveMonster(mon6, monster6);
				}
				break;
				case 7:
				if(!mon7.is(":visible")) {
					mon7.show();
					moveMonster(mon7, monster7);
				}
				break;
				case 8:
				if(!mon8.is(":visible")) {
					mon8.show();
					moveMonster(mon8, monster8);
				}
				break;
		}
	}
	function onClickMonster(monster) {
		if(running) {
			monster.finish();
			score += 10;
			heart++;
			updateScore();
			updateHeart();
		}
	}
	function updateHeart(){
		$(".heart_arr > img").remove();
		for (var i = 0; i < heart; i++) {
			var img=$("<img>");
			img.attr("src","images/heart.png");
			$(".heart_arr").append(img);
		}
	}
	var offset = $("#main_game").offset();
	function showBoom(x,y){
		if (running) {
			boomNum++;
			if (boomNum>boomNumMax) {
				$("#boomImg_"+(boomNum-boomNumMax)).hide();
			}
			var boomImg=$("<img>");
			boomImg.attr({
				id:'boomImg_'+boomNum,
				src:'images/bloodstain.png'
			});
			boomImg.css({
				position:'absolute',
				left:x-50+'px',
				top:y-50+'px'
			});
			$("#main_game").append(boomImg);
		}
	}
	function getAllVisibleMonster(){
		var count=0;
		if (mon1.is(":visible")) {count++}
		if (mon2.is(":visible")) {count++}
		if (mon3.is(":visible")) {count++}
		if (mon4.is(":visible")) {count++}
		if (mon5.is(":visible")) {count++}
		if (mon6.is(":visible")) {count++}
		if (mon7.is(":visible")) {count++}
		if (mon8.is(":visible")) {count++}	
		return count;
	}
	function updateScore(){
		scoreText.html("SCORE: "+score);
	}
	function main(){
		if (running) {
			moveMonster(mon1,monster1);
		}
	}
	main();					
});
