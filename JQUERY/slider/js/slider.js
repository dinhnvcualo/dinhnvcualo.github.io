/*
Author: NGUYEN VAN DINH
Project: CALENDAR
*/

$(document).ready(function(){
	var TIME_AUTO_SEC = 4;
	var img_arr=["images/messi.jpg","images/xavi.jpg","images/kaka.jpg"];
	var selectedIndex=1;
	//NEXT IMAGE
	$(".next").click(function(){
		if (selectedIndex>=3) {
			selectedIndex=1;
			viewImage(selectedIndex);
		}else{
			selectedIndex++;
			viewImage(selectedIndex);
		}
	});
	//PRE IMAGE
	$(".pre").click(function(){
		if (selectedIndex<=1) {
			selectedIndex=3;
			viewImage(selectedIndex);
		}else{
			selectedIndex--;
			viewImage(selectedIndex);
		}
	});
	
	setInterval(function(){show();}, TIME_AUTO_SEC*1000);
	function show(){
		if (selectedIndex>=img_arr.length) {
			selectedIndex=0;
		}
		selectedIndex++;
		viewImage(selectedIndex);
	};
	//VIEW IMAGE FOR SLIDER
	function viewImage(selectedIndex){
		$("#img_slider").remove();
		var img=$("<img>");
		img.attr("id","img_slider");
		img.attr("src",img_arr[selectedIndex-1]);
		$(".main").append(img);
		//ACTIVE NUMBER
		for (var i = 0; i <img_arr.length ; i++) {
			var  a_selected = $("#a_"+(i+1));
			a_selected.removeClass("active");
		}
		var a_selected = $("#a_"+selectedIndex);
		a_selected.attr("class","active");

	};
	//INDEX VIEW IMAGE
	$(".index > a").click(function(){
		var a_arr=this.id.split("_");
		viewImage(a_arr[1]);
	});
});