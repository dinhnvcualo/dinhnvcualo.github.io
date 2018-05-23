/*
Author: NGUYEN VAN DINH
Project: AJAX FORM
*/

/**
 * Submit form ajax, check input and call ajax
 */
$(document).ready(function(){
	$("#ajaxform").submit(function(){
		if (validateUser() && validatePass() && validateEmail() &&validateBirthday()) {
			var that=$(this),
				url="action.php",
				type=that.attr("method"),
				data={};
			that.find('[name]').each(function(index,value){
				var that=$(this),
					name=that.attr("name"),
					value=that.val();
				data[name]=value;	
			});	
			$.load({
				url:url,
				type:type,
				data:data,
				success:function(responseText){
					$("#result").html(responseText);
				}	
			});
		}
		return false;
	});

	/**
	 * Check username 
	 * if valid return true
	 * else return false
	 */
	function validateUser() {
		var username = $("#txtname").val();
		var error_text=$("#err_name");
		if (username.length <= 0) {
			error_text.html("Username is required!!!");
			return false;
		}else if (username.length > 0 && username.length < 8){		 
			error_text.html("Username length min 8 letter!!!");
			return false		
		}
		error_text.html("");
		return true;
	}

	/**
	 * Check password 
	 * if valid return true
	 * else return false
	 */
	function validatePass() {
		var password = $("#txtpass").val();
		var error_text=$("#err_pass");
		if (password.length <= 0) {
			error_text.html("Password is required!!!");
			return false;
		}else if (password.length > 0 && password.length < 8){		 
			error_text.html("Password length min 8 letter!!!");
			return false		
		}
		error_text.html("");
		return true;
	}

	/**
	 * Check email 
	 * if valid return true
	 * else return false
	 */
	function validateEmail() {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var mail = $("#txtmail").val();
		var error_text=$("#err_mail");
		if (mail.length <= 0) {
			error_text.html("Email is required!!!");
			return false;
		}else if (!re.test(mail)) {
			error_text.html("Email wrong format!!!");
			return false;
		}
		error_text.html("");
		return true;
	}

	/**
	 * Check birthday 
	 * if valid return true
	 * else return false
	 */
	function validateBirthday() {
		var error_text=$("#err_date");
		var birth = $("#date").val();
		//GET NOW DATE
		var nowdate=new Date();
		//GET SELECTED DATE
		var birth_date=birth.split("/");
		var selected_date=new Date(birth_date[2],birth_date[1]-1,birth_date[0]);
		if (selected_date>=nowdate) {
			error_text.html("Invalid Date Of Birth");
			return false;
		}else if (birth.length<=0) {
			error_text.html("Date Of Birth is required!!!");
			return false;
		}
		error_text.html("");
		return true;
	}

	/**
	 * Reset form
	 */
	function resetForm() {
		//REMOVE ALL VALUE OF ITEM
		$("#txtname").val("");
		$("#txtmail").val("");
		$("#date").val("");
		$("#txtpass").val("");
		//REMOVE ALL TEXT ERROR
		$("#err_date").empty();
		$("#err_mail").empty();
		$("#err_pass").empty();
		$("#err_name").empty();
		$("#result").empty();
	}
	$("#btn_reset").click(function(){
		resetForm();
	});
});
