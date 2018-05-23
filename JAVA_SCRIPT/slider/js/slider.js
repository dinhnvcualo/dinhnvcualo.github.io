/*
Author: NGUYEN VAN DINH
Project: Slide Image 
*/
var TIME_AUTO_SEC = 4;
var istart=false;
var image_src=["messi.jpg","kaka.jpg","xavi.jpg"];
var caption=["Lionel Messi","Ricardo Kaká","Xavier Hernández Creus"]
var slideIndex=1;
function showSlides(){
	if (slideIndex==image_src.length) {
		slideIndex=0;
	}
	slideIndex++;	
	view(slideIndex);
}
setInterval(function(){showSlides();}, TIME_AUTO_SEC*1000);

function view(slideIndex){
	var content=document.getElementById("content");
	//REMOVE OLD IMAGE
	var img=document.getElementById("img_select");
	content.removeChild(img);
	//ADD NEW IMAGE
	var img =document.createElement("img");
	img.src="images/"+image_src[slideIndex-1];
	img.id="img_select";
	img.style.zIndex="0";
	//SET INDEX FOR NEXT BUTTON
	var next=document.getElementById("next");
	next.style.zIndex="2";
	var next=document.getElementById("pre");
	next.style.zIndex="3";
	var cap=document.getElementById("caption");
	cap.style.zIndex="1";
	cap.innerHTML=slideIndex+" OF 3: "+caption[slideIndex-1];
	//SET ACTIVE STYLE FOR DISPLAY
	var activediv=document.getElementById("index_view");
	var array_a=activediv.getElementsByTagName("a");
	for (var i = 0; i < array_a.length; i++) {
		if (parseInt(array_a[i].innerHTML)==slideIndex) {
			array_a[i].classList.add("active");
		}else{array_a[i].classList.remove("active");}
		
	}
	content.appendChild(img);
}
//BUTTON NEXT EVENT
function next_click(){
	if (slideIndex==image_src.length) {
		slideIndex=1;
		view(slideIndex);		
	}else{
		slideIndex++;
		view(slideIndex);
	}
}
//BUTTON PRE EVENT
function pre_click(){
	if (slideIndex==1) {
		slideIndex=image_src.length;
		view(slideIndex);

	}else{
		slideIndex--;
		view(slideIndex);
	}
}
//CLICK TAG A
function indexclick(index){
	var index=document.getElementById(index);
	select_index=parseInt(index.innerHTML);
	view(select_index);
}