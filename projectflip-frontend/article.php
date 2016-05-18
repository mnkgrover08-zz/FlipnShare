<!-- Header File Inclusion -->
<?php include_once('common/header.php');?>
<!-- Header File Inclusion -->

<!-- Add any template specific css/js files here, don't add them in header-->

<?php $jsonLoc = $jsonFolder . $year . "/". $month . "/". $jsonFileName . '.json';
//Check if the json exists else redirect use to homepage
if(file_exists($jsonLoc)) {
	$articleJson = getJson($jsonLoc);
	$templateFileName = $articleJson->templateName;
	$articleCategory = $articleJson->type;
	$templateLoc = 'templates/' . $articleCategory. "/".$templateFileName.".php";
	include $templateLoc;
} else {
	//User is lost redirect him to homepage or 404
	$alertMessage="Article not Found";
	$locationString = "Location: /".$projectFolder."index.php?alertMessage=".$alertMessage;
	header($locationString);
} ?>

<!-- Don't close the body tag here, it is included in footer-->

<!-- Footer Inclusion -->
<?php include_once('common/footer.php');?>
<!-- Footer Inclusion -->
