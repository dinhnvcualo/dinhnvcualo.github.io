/*
Author: NGUYEN VAN DINH
Project: CALENDAR
*/

$(document).ready(function(){
	var isclick=false;
	var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var img_arr=['pre.png','mpre.png','mnext.png','next.png'];
	var day_name = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	//GET DATE NOW
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	$("#date").click(function(){
		if (isclick) {
			$(".calendar").remove();
		}
		if ($("#date").val()!="") {
			var dateVal=$("#date").val();
			var date_arr=dateVal.split("/");
			$calendar=renderTop(date_arr[1],date_arr[2],date_arr[0]);
		}else{
			$calendar=renderTop(mm,yyyy,dd);
			console.log(mm);
		}
		$(".main").append($calendar);
		isclick=true;
	});

	function renderTop(month,year,day){
		var $calendar=$("<div class='calendar'>");
		var $table=$("<table>");
		$table.attr("border","1");
		//TR CONTROL 
			var $tr=$("<tr>");
			$tr.attr("class","title");
				
				for (var i = 1; i <= img_arr.length+1; i++) {
					//TH YEAR PRE AND MONTH PRE
					if (i<=2) {
						var $th=$("<th>");
						var $a=$("<a>");
						$a.attr("href","#");
						$a.attr("id","click_"+i);
						$a.click(function(){
							clickData(this.id,$table);
						});
							var $img=$("<img>");
							$img.attr("src","images/"+img_arr[i-1]);
						$a.append($img)
						$th.append($a);
						$tr.append($th);
					}
					//TH YEAR SELECT AND MONTH SELECT
					else if (i==3) {
						var $th=$("<th>");
						$th.attr("colspan","3");
							var $div=$("<div>");
							$div.attr("class","div_sel");
								var $monSeclect=$("<select id='month_select' class='m_sel'>");
									renderSelMonth($monSeclect,month,year);
									$monSeclect.change(function(){
										changeData(this.id);
									});
								var $yearSeclect=$("<select id='year_select' class='y_sel'>");
									renderSelYear($yearSeclect,month,year);
									$yearSeclect.change(function(){
										changeData(this.id);
									});
							$div.append($monSeclect);
							$div.append($yearSeclect);	
						$th.append($div);
						$tr.append($th);
					}
					else{
						var $th=$("<th>");
						var $a=$("<a>");
						$a.attr("href","#");
						$a.attr("id","click_"+i);
						$a.click(function(){
							clickData(this.id,$table);
						});
							var $img=$("<img>");
							$img.attr("src","images/"+img_arr[i-2]);
						$a.append($img)
						$th.append($a);
						$tr.append($th);
					}
				}
		//TR MON,TUE...
			var $tr1=$("<tr>");
				$tr1.attr("class","tr_top");
				for (var i = 0; i < day_name.length; i++) {
					$tr1.append("<th>"+day_name[i]+"</th>");
				}
		$table.append($tr);
		$table.append($tr1);
		$calendar.append($table);
		$calendar.append(bindData(month,year));
		return $calendar;
	}
	function renderSelMonth(selTag,month,year){
			for (var i = 0; i < month_name.length; i++) {
				var $option=$("<option>");
				$option.val(i);
	            $option.text(month_name[i]);
	            selTag.append($option);
			}
			selTag.val(month-1);
	}
	function renderSelYear(selTag,month,year){
		for (var i = 1950; i < 2069; i++) {
			var $option=$("<option>");
			$option.val(i);
		    $option.text(i);
		    selTag.append($option);
		}
		selTag.val(year);
	}
	function clearData(){
		var table=$("#table_remove");
		table.remove();
	}
	function clickData(id){
		var month_sel=$("#month_select")[0].selectedIndex;
		var year_sel=$("#year_select")[0].selectedIndex;
		clearData();
		switch(id){
			case "click_1":
			if (year_sel>0) {
				$("#year_select")[0].selectedIndex=year_sel-1;
				year_sel--;
			}
			break;
			case "click_2":
			if (month_sel>0) {
				$("#month_select")[0].selectedIndex=month_sel-1;
				month_sel--;
			}
			break;
			case "click_4":
			if (month_sel<11) {
				$("#month_select")[0].selectedIndex=month_sel+1;
				month_sel++;
			}
			break;
			case "click_5":
			if (year_sel<118) {
				$("#year_select")[0].selectedIndex=year_sel+1;
				year_sel++;
			}
			break;
		}

		var month=$("#month_select").val();
		var year=$("#year_select").val();
		$(".calendar").append(bindData(parseInt(month)+1,year));
	}
	function changeData(id){
		clearData();
		var month=$("#month_select").val();
		var year=$("#year_select").val();
		$(".calendar").append(bindData(parseInt(month)+1,year));
	}
	function bindData(month,year){
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
		var table=$("<table>");
		table.attr("id","table_remove");
		for (var i = 1; i <= ((day_max+space_day)/7)+1; i++) {
			var $tr=$("<tr>");
				$tr.attr("class","tr_clear");
				for (var j = 1; j <=7; j++) {
						day_display++;
						if(day_display<=space_day || day_display>(day_max+space_day)){
							var $td=$("<td>");
							$td.html("0");
							$td.attr("class","td_none");
							$tr.append($td);
						}
						else{
								var $td=$("<td>");
								$td.html(day_display-space_day);
								if((day_display-space_day)==dd && mm==month && yyyy==year){
									$td.attr("class","td_current");
							}
							$tr.append($td);
							$td.click(function(e){
								setText(e);
							});
					}	
				}
			table.append($tr);
		}
		/*----------  End bind day  ----------*/
		return table;
	}
	//SET TEXT FOR TEXT DATE
	function setText(e){
		var day=$(e.target).text();
		var month=$("#month_select").val();
		month=parseInt(month)+1;
		var year=$("#year_select").val();
		$("#date").val(day+"/"+month+"/"+year);
		$(".calendar").remove();
		isclick=false;
	}
});
