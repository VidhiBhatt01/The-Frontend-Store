<?php 
require_once("includes/config.php");
// code user email availablity

if(!empty($_POST["emailid"])){

	$email=$_POST["emailid"];
	if(filter_var($email, FILTER_VALIDATE_EMAIL)===false) {

		// its just a warning.... even though it says its invalid... it allows the email to be registered
		echo "<h5 style=\"color:#f12200\", align=center><strong>Invalid email.</strong></h5>";
		echo "<script>$('#submit').prop('disabled',false);</script>";
	}

	else{
		
		$sql ="SELECT EmailId FROM students WHERE EmailId=:email";
		$query= $dbh -> prepare($sql);
		$query-> bindParam(':email', $email, PDO::PARAM_STR);
		$query-> execute();
		$results = $query -> fetchAll(PDO::FETCH_OBJ);
		$cnt=1;

		if($query->rowCount()>0){

			echo "<h5 style=\"color:#f12200\", align=center><strong>Email already exists.</strong></h5>";
			echo "<script>$('#submit').prop('disabled',true);</script>";
		}
		
		else{

			echo "<h5 style=\"color:#7FFF00\", align=center><strong>Email Available for registration.</strong></h5>";
			echo "<script>$('#submit').prop('disabled',false);</script>";
		}
	}
}

?>