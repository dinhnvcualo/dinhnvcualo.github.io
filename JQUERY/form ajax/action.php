<?php

	if (isset($_POST["txtname"]) && isset($_POST["txtpass"])&&isset($_POST["txtmail"])&&isset($_POST["date"])) {
		$name=$_POST["txtname"];
		$pass=$_POST["txtpass"];
		$mail=$_POST["txtmail"];
		$date=$_POST["date"];
		//CONNECT DATA BASE 
		$con=connect();
		$sql="SELECT * FROM user WHERE username LIKE '".$name."'";
		$result = mysqli_query($con,$sql);
		//CHECK USERNAME 
		if ($result->num_rows>0) {
			echo "Username already exists!!!";
		}else{
			insert($name,$pass,$mail,$date);
			echo "Has successfully registered!!!";
		}
	}

	/**
 	* Connect data base
 	*/
	function connect(){
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "ajaxform";
		$con = mysqli_connect($servername,$username,$password,$dbname);
		if(!$con){
		   die('Ket noi that bai:'.mysqli_connect_error());
		}else{
		    //echo"Ket noi thanh cong";
		}
		return $con;
	}
	/**
 	* Insert data
 	*/
 	function insert($name,$pass,$mail,$date){
 		$con=connect();
 		$sql = "INSERT INTO user (username, password, email, dateofbirth) VALUES ('".$name."', '".$pass."', '".$mail."', '".$date."')";
 		if ($con->query($sql) === TRUE) {
    		return true;
		} else {
			return false;
    		
		}
 	}
?>