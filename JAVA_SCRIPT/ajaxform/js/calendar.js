/*
Author: NGUYEN VAN DINH
Project: CALENDAR
*/

/**
* Global variables
*/
var img_arr=['pre.png','mpre.png','mnext.png','next.png'];
var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var day_name = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var isclick=false;
//GET DATE NOW
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

function show(){
	var main_div=document.getElementById("main");
	//IF CLICKED THEN CLEAR ALL DATA
	if (isclick) {
		var box_content=document.getElementById("box_calendar");
		main_div.removeChild(box_content);
	}
	
	
	//ADD NEW DATA
	var box_content=document.createElement("div");
	box_content.id="box_calendar";
	box_content.classList.add("box_content");
	var calendard=getdatadisplay(yyyy,mm,dd);
	box_content.appendChild(calendard);
	
	main_div.appendChild(box_content); 
	isclick=true;
}
/**
* Create calendar 
* @param {year}
* @param {month in year}
* @param {day in month}
* @return table Calendar
*/
function getdatadisplay(year,month,day){
	
	var table=document.createElement("table");
	table.id="table1";
	table.border="1";
	//create header for table Calendar
	/*----------  Begin tr for next year, next month  ----------*/
	var tr1=document.createElement("tr");
	tr1.classList.add("title");
	for (var i = 1; i <= 5; i++) {
		
		if (i==3) {
			var th=document.createElement("th");
			th.classList.add("title_h");
			th.colSpan ="3";
				var div_header=document.createElement("div");
				div_header.classList.add("div_sel");
					//CREATE MONTH SELECTION 
					var month_select=document.createElement("select");
					month_select.classList.add("m_sel");
					month_select.id="month_select";
					month_select.onchange=function(){
						change(this.id,table);
					}
						for (var j = 1; j <= 12; j++) {
							var op=document.createElement("option");
							op.value=j;
							op.innerHTML=month_name[j-1];
							if(month==j){
								op.selected=true;
							}
							month_select.appendChild(op);
						}
					//CREATE YEAR SELECTION
					var year_select=document.createElement("select");
					year_select.classList.add("y_sel");
					year_select.id="year_select";
					year_select.onchange=function(){
						change(this.id,table);
					}
						for (var k = 1950; k <= 2068; k++) {
							var op=document.createElement("option");
							op.value=k;
							op.innerHTML=k;
							if(year==k){
								op.selected=true;
							}
							year_select.appendChild(op);
						}

				div_header.appendChild(month_select);
				div_header.appendChild(year_select);	
			th.appendChild(div_header);
		}else if(i<=2){
			var th=document.createElement("th");
			th.classList.add("title_h");
				var a=document.createElement("a");
				a.href="#";
				a.id="click_"+i;
				a.onclick = function() {
					change(this.id,table);
				}
					var img=document.createElement("img");
					img.src="images/"+img_arr[i-1];
				a.appendChild(img);

			th.appendChild(a);
		}else{
			var th=document.createElement("th");
			th.classList.add("title_h");
				var a=document.createElement("a");
				a.href="#";
				a.id="click_"+i;
				a.onclick = function() {
					change(this.id,table);
				}
					var img=document.createElement("img");
					img.src="images/"+img_arr[i-2];
				a.appendChild(img);

			th.appendChild(a);
		}
		tr1.appendChild(th);
	}
	/*----------  End tr for next year, next month...  ----------*/
	table.appendChild(tr1);
	/*----------  Begin tr for sun, mon,...  ----------*/
	tr2=document.createElement("tr");
	for (var i = 1; i <= 7; i++) {
		var th=document.createElement("th");
			th.innerHTML=day_name[i-1];
		tr2.appendChild(th);
	}
	table.appendChild(tr2);
	/*----------  End tr for sun, mon,...  ----------*/
	bind_calendar(year,month,table);
	
	return table;
}

function remoolddata(){
	var tr_arr=document.getElementsByClassName("tr_clear");
	var table=document.getElementById("table1");
	
	for (var i = 0; i < tr_arr.length; i++) {
		while (tr_arr[i].firstChild) {
		    tr_arr[i].removeChild(tr_arr[i].firstChild);
		}
	}
	
}

function change(id,table){
	//GET ELEMENT ALL
	var yselect=document.getElementById("year_select");
	var mselect=document.getElementById("month_select");
	remoolddata();
	switch(id) {
	    case "click_1":
		    if(yselect.selectedIndex>0){
		    	yselect.options[yselect.selectedIndex-1].selected = true;
		    }
		    bind_calendar(yselect.value,mselect.value,table);	        
	    	break;
	    case "click_2":
	        if(mselect.selectedIndex>0){
	    		mselect.options[mselect.selectedIndex-1].selected = true;
	    	}
	    	bind_calendar(yselect.value,mselect.value,table);	    
	    	break;
	    case "click_4":
	        if(mselect.selectedIndex<11){
	    		mselect.options[mselect.selectedIndex+1].selected = true;
	    	}
	    	bind_calendar(yselect.value,mselect.value,table);	    
	        break;
	    case "click_5":
		    if (yselect.selectedIndex<118) {
		    	yselect.options[yselect.selectedIndex+1].selected = true;
		    } 
		    bind_calendar(yselect.value,mselect.value,table);	           
	        break;
	    case "month_select":
		    bind_calendar(yselect.value,mselect.value,table);	           
	        break;
	    case "year_select":
		    bind_calendar(yselect.value,mselect.value,table);	           
	        break;
	    default:  
	        break;
	}
}
//BIND DATA FOR CALENDAR
function bind_calendar(year,month,table){
	var d=new Date(year, month-1, 1);
	var dmax=new Date(year, month, 0);
	var day_max=dmax.getDate();
	var space_day=0;
	switch(parseInt(d.getDay())){
		case 1:
			space_day=1;
			break;
		case 2:
			space_day=2;
			break;
		case 3:
			space_day=3;
			break;
		case 4:
			space_day=4;
			break;
		case 5:
			space_day=5;
			break;
		case 6:
			space_day=6;
			break;
		default:
			break;
			
	}

	/*----------  Begin bind day  ----------*/
	var day_display=0;
	for (var i = 1; i <= ((day_max+space_day)/7)+1; i++) {
		var tr=document.createElement("tr");
			tr.classList.add("tr_clear");
			for (var j = 1; j <=7; j++) {
					day_display++;
					if(day_display<=space_day || day_display>(day_max+space_day)){
						var td=document.createElement("td");
						td.innerHTML="0";
						td.classList.add("td_none");
						tr.appendChild(td);
						//alert("vao day0");
						
					}
					else{
						var td=document.createElement("td");
						td.innerHTML=day_display-space_day;
						if((day_display-space_day)==dd && mm==month && yyyy==year){
							td.classList.add("td_current");
						}
						//alert("vào đây 1");
						tr.appendChild(td);
						td.onclick=function(){
							settext(this.innerHTML);
					}	
				}	
			}
		table.appendChild(tr);
	}
	/*----------  End bind day  ----------*/
	
	return table;
}
function settext(day){
	var textdate=document.getElementById("txtdate");
	var divcalendar=document.getElementById("box_calendar");
	var month=document.getElementById("month_select").value;
	var year=document.getElementById("year_select").value;
	textdate.value=day+"/"+month+"/"+year;
	//REMO DIV CALENDAR
	divcalendar.parentNode.removeChild(divcalendar);
	isclick=false;
}


