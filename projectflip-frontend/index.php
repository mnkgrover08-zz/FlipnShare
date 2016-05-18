<!-- Header File Inclusion -->
<?php include_once('common/header.php');?>
<!-- Header File Inclusion -->

<!-- Add any template specific css/js files here, don't add them in header-->

<?php
//User is requesting the latest issue, we are checking for bare domain and dev environment
$date = date('Y-m-d');
$loadCover = 1;
if(count($urlArgs) == 2) {
	$date = date("Y-m-d");
} else if($urlArgs[3] == "index.php") {
	$year = $urlArgs[1];
	$month = $urlArgs[2];
	$date = date("Y-m-d", strtotime($year."-".$month."-01"));
} else {
	$loadCover = 0;
}

if($loadCover) {
	$coverJson = getIssue($date);
	$coverJson = getJson($coverJson);
	include 'templates/cover/'.$coverJson->templateName.'.php';
}
?>

<!-- Don't close the body tag here, it is included in footer-->

<!-- Footer Inclusion -->
<?php include_once('common/footer.php');?>
<!-- Footer Inclusion -->
