<?php
session_start();
include('includes/config.php');
error_reporting(0);

if(strlen($_SESSION['login'])==0){   
    header('location:index.php');
}

else{

    if(isset($_POST['change'])){

        $password=md5($_POST['password']);
        $newpassword=md5($_POST['newpassword']);
        $email=$_SESSION['login'];
        $sql ="SELECT Password FROM students WHERE EmailId=:email and Password=:password";
        $query= $dbh -> prepare($sql);
        $query-> bindParam(':email', $email, PDO::PARAM_STR);
        $query-> bindParam(':password', $password, PDO::PARAM_STR);
        $query-> execute();
        $results = $query -> fetchAll(PDO::FETCH_OBJ);
        if($query -> rowCount() > 0){

            $con="update students set Password=:newpassword where EmailId=:email";
            $chngpwd1 = $dbh->prepare($con);
            $chngpwd1-> bindParam(':email', $email, PDO::PARAM_STR);
            $chngpwd1-> bindParam(':newpassword', $newpassword, PDO::PARAM_STR);
            $chngpwd1->execute();
            $msg="  Your Password was succesfully changed !!";
        }
        
        else{
            $error="  You have entered incorrect CURRENT PASSWORD !!";  
        }
    }

    ?>

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Online Library Management System | </title>
        <!-- BOOTSTRAP CORE STYLE  -->
        <link href="assets/css/bootstrap.css" rel="stylesheet" />
        <!-- FONT AWESOME STYLE  -->
        <link href="assets/css/font-awesome.css" rel="stylesheet" />
        <!-- CUSTOM STYLE  -->
        <link href="assets/css/style.css" rel="stylesheet" />
        <!-- GOOGLE FONT -->
        <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
        <style>
            .errorWrap {
                text-align: center;
                padding: 10px;
                margin: 0 0 20px 0;
                color: #f12;
                border: 4px solid #ff3d36;
            }
            .succWrap{
                text-align: center;
                padding: 10px;
                margin: 0 0 20px 0;
                color: #1f2;
                border: 4px solid #5cb85c;
            }
        </style>
    </head>
    <script type="text/javascript">
        function valid(){

            if(document.chngpwd.newpassword.value!= document.chngpwd.confirmpassword.value){

                alert("New Password and Confirm Password Field do not match  !!");
                document.chngpwd.confirmpassword.focus();
                return false;
            }

            return true;
        }
    </script>

    <body>
        <!------MENU SECTION START-->
        <?php include('includes/header.php');?>
        <!-- MENU SECTION END-->
        <div class="content-wrapper">
            <div class="container">
                <div class="row pad-botm">
                    <div class="col-md-12">
                        <h4 class="header-line">User Change Password</h4>
                    </div>
                </div>

                <?php if($error){?><div class="errorWrap"><strong>ERROR</strong>:<?php echo htmlentities($error); ?> </div><?php } 
                else if($msg){?><div class="succWrap"><strong>SUCCESS</strong>:<?php echo htmlentities($msg); ?> </div><?php }?>            
                <!--LOGIN PANEL START-->           
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3" >
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                Change Password
                            </div>
                            <div class="panel-body">
                                <form role="form" method="post" onSubmit="return valid();" name="chngpwd">

                                    <div class="form-group">
                                        <label>Current Password</label>
                                        <input class="form-control" type="password" name="password" autocomplete="off" required  />
                                    </div>

                                    <div class="form-group">
                                        <label>Enter Password</label>
                                        <input class="form-control" type="password" name="newpassword" autocomplete="off" required  />
                                    </div>

                                    <div class="form-group">
                                        <label>Confirm Password </label>
                                        <input class="form-control"  type="password" name="confirmpassword" autocomplete="off" required  />
                                    </div>

                                    <button type="submit" name="change" class="btn btn-info">Change</button> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>  
                <!---LOGIN PABNEL END-->            


            </div>
        </div>
        <!-- CONTENT-WRAPPER SECTION END-->
        <?php include('includes/footer.php');?>
        <!-- FOOTER SECTION END-->
        <script src="assets/js/jquery-1.10.2.js"></script>
        <!-- BOOTSTRAP SCRIPTS  -->
        <script src="assets/js/bootstrap.js"></script>
        <!-- CUSTOM SCRIPTS  -->
        <script src="assets/js/custom.js"></script>
    </body>
    </html>
<?php } ?>
