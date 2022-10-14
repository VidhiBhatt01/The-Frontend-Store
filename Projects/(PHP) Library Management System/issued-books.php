<?php
session_start();
error_reporting(0);
include('includes/config.php');
if(strlen($_SESSION['login'])==0)
{   
    header('location:index.php');
}
else{ 
    if(isset($_GET['del']))
    {
        $id=$_GET['del'];
        $sql = "delete from books WHERE id=:id";
        $query = $dbh->prepare($sql);
        $query -> bindParam(':id',$id, PDO::PARAM_STR);
        $query -> execute();
        $_SESSION['delmsg']="Category deleted scuccessfully ";
        header('location:manage-books.php');

    }


    ?>
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Online Library Management System | View Issued Books</title>
        <!-- BOOTSTRAP CORE STYLE  -->
        <link href="assets/css/bootstrap.css" rel="stylesheet" />
        <!-- FONT AWESOME STYLE  -->
        <link href="assets/css/font-awesome.css" rel="stylesheet" />
        <!-- DATATABLE STYLE  -->
        <link href="assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet" />
        <!-- CUSTOM STYLE  -->
        <link href="assets/css/style.css" rel="stylesheet" />
        <!-- GOOGLE FONT -->
        <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />

    </head>
    <body>
      <!------MENU SECTION START-->
      <?php include('includes/header.php');?>
      <!-- MENU SECTION END-->

      <!-- NOVELTY SECTION START-->

      <div class="content-wrapper">
       <div class="container">
        <div class="row pad-botm">
            <div class="col-md-12">
                <h4 class="header-line">BOOKS YOU MIGHT LIKE</h4>
            </div>


            <div class="row">
                <div class="col-md-12">
                    <!-- Advanced Tables -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                          Recommended Books 
                      </div>
                      <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Book Name</th>
                                        <th>Author</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php 
                                    $sid=$_SESSION['stdid'];
                                    $sql="SELECT books.genreid as gid, count(books.genreid) as total from books join issuedbookdetails on books.id=issuedbookdetails.bookid where issuedbookdetails.Studentid=:sid group by genreid order by gid desc limit 1";

                                    $query = $dbh -> prepare($sql);
                                    $query-> bindParam(':sid', $sid, PDO::PARAM_STR);
                                    $query->execute();
                                    $results=$query->fetchAll(PDO::FETCH_OBJ);
                                    $maxgenre;
                                    $cnt=1;
                                    if($query->rowCount()>0)
                                    {
                                        foreach($results as $result)
                                        {
                                            $maxgenre=$result->gid;
                                        }
                                    }

                                    $sql="SELECT books.BookName, Authors.AuthorName from books join authors on books.AuthorId=authors.id where Books.GenreId=:maxgenre";
                                    $query = $dbh -> prepare($sql);
                                    $query-> bindParam(':maxgenre', $maxgenre, PDO::PARAM_STR);
                                    $query->execute();
                                    $results=$query->fetchAll(PDO::FETCH_OBJ);

                                    if($query->rowCount()>0)
                                    {
                                        foreach($results as $result)
                                            {?>              
                                                <tr class="odd gradeX">
                                                    <td class="center"><?php echo htmlentities($cnt);?></td>
                                                    <td class="center"><?php echo htmlentities($result->BookName);?></td>
                                                    <td class="center"><?php echo htmlentities($result->AuthorName);?></td>

                                                </tr>
                                                <?php $cnt=$cnt+1;}} ?>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <!--End Advanced Tables -->
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="container">
                <div class="row pad-botm">
                    <div class="col-md-12">
                        <h4 class="header-line">Manage Issued Books</h4>
                    </div>


                    <div class="row">
                        <div class="col-md-12">
                            <!-- Advanced Tables -->
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                  Issued Books 
                              </div>
                              <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Book Name</th>
                                                <th>ISBN </th>
                                                <th>Issued Date</th>
                                                <th>Return Date</th>
                                                <th>Fine in(USD)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php 
                                            $sid=$_SESSION['stdid'];
                                            $sql="SELECT books.BookName,books.ISBNNumber,issuedbookdetails.IssuesDate,issuedbookdetails.ReturnDate,issuedbookdetails.id as rid,issuedbookdetails.fine from issuedbookdetails join students on students.StudentId=issuedbookdetails.StudentId join books on books.id=issuedbookdetails.BookId where students.StudentId=:sid order by issuedbookdetails.id desc";
                                            $query = $dbh -> prepare($sql);
                                            $query-> bindParam(':sid', $sid, PDO::PARAM_STR);
                                            $query->execute();
                                            $results=$query->fetchAll(PDO::FETCH_OBJ);
                                            $cnt=1;
                                            if($query->rowCount() > 0)
                                            {
                                                foreach($results as $result)
                                                    {               ?>                                      
                                                        <tr class="odd gradeX">
                                                            <td class="center"><?php echo htmlentities($cnt);?></td>
                                                            <td class="center"><?php echo htmlentities($result->BookName);?></td>
                                                            <td class="center"><?php echo htmlentities($result->ISBNNumber);?></td>
                                                            <td class="center"><?php echo htmlentities($result->IssuesDate);?></td>
                                                            <td class="center"><?php if($result->ReturnDate=="")
                                                            {?>
                                                                <span style="color:red">
                                                                   <?php   echo htmlentities("Not Return Yet"); ?>
                                                               </span>
                                                           <?php }
                                                           else {
                                                            echo htmlentities($result->ReturnDate);
                                                        }
                                                    ?></td>
                                                    <td class="center"><?php echo htmlentities($result->fine);?></td>

                                                </tr>
                                                <?php $cnt=$cnt+1;}} ?>                                      
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <!--End Advanced Tables -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CONTENT-WRAPPER SECTION END-->
        <?php include('includes/footer.php');?>
        <!-- FOOTER SECTION END-->
        <!-- JAVASCRIPT FILES PLACED AT THE BOTTOM TO REDUCE THE LOADING TIME  -->
        <!-- CORE JQUERY  -->
        <script src="assets/js/jquery-1.10.2.js"></script>
        <!-- BOOTSTRAP SCRIPTS  -->
        <script src="assets/js/bootstrap.js"></script>
        <!-- DATATABLE SCRIPTS  -->
        <script src="assets/js/dataTables/jquery.dataTables.js"></script>
        <script src="assets/js/dataTables/dataTables.bootstrap.js"></script>
        <!-- CUSTOM SCRIPTS  -->
        <script src="assets/js/custom.js"></script>

    </body>
    </html>
<?php } ?>
