/*
Author: NGUYEN VAN DINH
Project: AJAX FORM
*/

/**
 * Submit form ajax, check input and call ajax
 */
function submitFormAjax() {
	//document.getElementById("result").innerHTML="";
	if (validateUser() && validatePass() && validateEmail() && validateBirthday()) {
		xmlHttp = GetXmlHttpObject();
		var name=document.getElementById("txtname").value;
		var pass=document.getElementById("txtpass").value;
		var mail=document.getElementById("txtmail").value;
		var date=document.getElementById("txtdate").value;
		var birth_date=date.split("/");
		var selected_date=birth_date[2]+"/"+birth_date[1]+"/"+birth_date[0];
				var url="action.php?username="+name+"&pass="+pass+"&mail="+mail+"&date="+selected_date;
		if (xmlHttp === null) {
			alert("Trình duyệt của bạn không hỗ trợ HTTP Request");
			return;
		}
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("result").innerHTML = xmlHttp.responseText;
			} else {
				console.log("Http error " + this.status + ":" + this.statusText);
			}
		};
		xmlHttp.open("GET", url, true);
		xmlHttp.send();
	}
	//console.log(validateUser());
	return false;
}


/**
 * Check username 
 * if valid return true
 * else return false
 */
function validateUser() {
	var username = document.getElementById("txtname");
	var error_text=document.getElementById("err_name");
	if (username.value.length <= 0) {
		error_text.innerHTML = "Username is required!!!";
		return false;
	}else if (username.value.length > 0 && username.value.length < 8){		 
		error_text.innerHTML = "Username length min 8 letter!!!";
		return false		
	}
	error_text.innerHTML="";
	return true;
}

/**
 * Check password 
 * if valid return true
 * else return false
 */
function validatePass() {
	var password = document.getElementById("txtpass");
	var error_text=document.getElementById("err_pass");
	if (password.value.length <= 0) {
		error_text.innerHTML = "Password is required!!!";
		return false;
	}else if (password.value.length > 0 && password.value.length < 8){		 
		error_text.innerHTML = "Password length min 8 letter!!!";
		return false		
	}
	error_text.innerHTML = "";
	return true;
}

/**
 * Check email 
 * if valid return true
 * else return false
 */
function validateEmail() {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var mail = document.getElementById("txtmail");
	var error_text=document.getElementById("err_mail");
	if (mail.value.length <= 0) {
		error_text.innerHTML = "Email is required!!!";
		return false;
	}else if (!re.test(mail.value)) {
		error_text.innerHTML = "Email wrong format!!!";
		return false;
	}
	error_text.innerHTML="";
	return true;
}

/**
 * Check birthday 
 * if valid return true
 * else return false
 */
function validateBirthday() {
	var error_text=document.getElementById("err_date");
	var birth = document.getElementById("txtdate");
	//GET NOW DATE
	var nowdate=new Date();
	//GET SELECTED DATE
	var birth_date=birth.value.split("/");
	var selected_date=new Date(birth_date[2],birth_date[1]-1,birth_date[0]);

	if (selected_date>=nowdate) {
		error_text.innerHTML="Invalid Date Of Birth";
		return false;
	}else if (birth.value.length<=0) {
		error_text.innerHTML="Date Of Birth is required!!!";
		return false;
	}
	error_text.innerHTML = "";
	return true;
}

/**
 * Reset form
 */
function resetForm() {
	//REMOVE ALL VALUE OF ITEM
	document.getElementById("txtname").value = "";
	document.getElementById("txtmail").value = "";
	document.getElementById("txtdate").value = "";
	document.getElementById("txtpass").value = "";
	//REMOVE ALL TEXT ERROR
	document.getElementById("err_date").innerHTML="";
	document.getElementById("err_mail").innerHTML="";
	document.getElementById("err_pass").innerHTML="";
	document.getElementById("err_name").innerHTML="";
	document.getElementById("result").innerHTML="";
}

//FOR AJAX
function GetXmlHttpObject() {
	var xmlHttp = null;
	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}