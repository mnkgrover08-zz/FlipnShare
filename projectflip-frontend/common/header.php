<?php 
error_reporting(0);
include_once('common/common.php');
?>
<!doctype html>
<html class="no-js" lang="en">
	<head>
		<!-- Meta Data Inclusion -->
		<?php include('common/meta-data.php');?>
		<!-- Meta Data Inclusion -->

		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<!-- Place favicon.ico in the root directory -->
		
		<!-- Include all CSS Files -->
		<link rel="stylesheet" type="text/css" href="/<?php print $projectFolder; ?>css/base.css" />
		<link rel="stylesheet" type="text/css" href="/<?php print $projectFolder; ?>css/bookblock.css" />
		<link rel="stylesheet" type="text/css" href="/<?php print $projectFolder; ?>css/custom.css" />
		<link rel="stylesheet" type="text/css" href="/<?php print $projectFolder; ?>css/menu.css" />
		<link rel="stylesheet" type="text/css" href="/<?php print $projectFolder; ?>css/font-awesome.min.css" />
		<link rel="stylesheet" href="/<?php print $projectFolder; ?>css/rrssb.css" />

		<!-- Include all CSS Files -->
		
		<!-- Include all Javascript Files -->

		<script src="/<?php print $projectFolder; ?>js/jquery.min.js"></script>
		<script src="/<?php print $projectFolder; ?>js/modernizr.custom.js"></script>
		<script src="/<?php print $projectFolder; ?>js/jquery-ui.js"></script>
		<script src="/<?php print $projectFolder; ?>js/binPackage.js"></script>
 		<script src="/<?php print $projectFolder; ?>js/jquery.jscrollpane.min.js"></script>
		<script src="/<?php print $projectFolder; ?>js/jquerypp.custom.js"></script>  	
 		<script src="/<?php print $projectFolder; ?>js/jquery.bookblock.js"></script>
		<script src="/<?php print $projectFolder; ?>js/jquery.mousewheel.js"></script>
		<script src="/<?php print $projectFolder; ?>js/rrssb.min.js"></script>
		<script src="/<?php print $projectFolder; ?>js/menu.js"></script>
		<script src="/<?php print $projectFolder; ?>js/jquery.touchSwipe.min.js"></script>
		
		<!-- Include all Javascript Files -->
	</head>
	<body>
		
		<div class="topbar">
			<ul>
				<li><a href='javascript:void(0)' id="main-nav" style="width:35px;height:35px;"><span class="menuicon"></span></a></li>
				<li><a href="<?php if(isset($projectFolder)) { echo '/'.$projectFolder;} else {echo '/';} ?>">Back to Cover</a></li>
			</ul>
			<ul class="social-btns">
				<li><a href="#" class="regular" style="top: 0px;"><i class="fa fa-facebook"></i></a>
					<a href="#" class="hover" style="top: 40px;"><i class="fa fa-facebook"></i></a></li>

				<li><a href="#" class="regular" style="top: 0px;"><i class="fa fa-twitter"></i></a>
					<a href="#" class="hover" style="top: 40px;"><i class="fa fa-twitter"></i></a></li>

				<li><a href="#" class="regular" style="top: 0px;"><i class="fa fa-linkedin"></i></a>
					<a href="#" class="hover" style="top: 40px;"><i class="fa fa-linkedin"></i></a></li>

				<li><a href="#" class="regular" style="top: 0px;"><i class="fa fa-google-plus"></i></a>
					<a href="#" class="hover" style="top: 40px;"><i class="fa fa-google-plus"></i></a></li>
			</ul>
		</div>

		<!-- Loading icons -->
		<div class="logo-load"></div>
		<div class="se-pre-con"></div>
		<?php include_once('common/menu.php'); ?>
