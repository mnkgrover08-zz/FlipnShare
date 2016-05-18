	<div class="footerbar">
		<div class="lefttext">
			<span class="mag-name"><?php echo $metaData->title; ?> <span class="last-word"><?php echo $coverJson->title; ?></span></span><i> // </i>
			<span class="cat-name"><?php echo $coverJson->issue; ?></span>
		</div>
		<div class="righttext"><?php echo $metaData->publication; ?></div>
	</div>
	
	<?php //include('common/analytics.php');?>
	<!--Other js files which are not of priority go here -->
	<!-- Show load icon till the entire page is fetched -->
	<script>	
		$(window).load(function() {
			// Animate loader off screen
			$(".se-pre-con").fadeOut("slow");
			$('.logo-load').fadeOut("slow");
		});
	</script>

	<script src='/<?php print $projectFolder; ?>/js/flip.js'></script>
	<script src='/<?php print $projectFolder; ?>/js/page.js'></script>
	<script src="/<?php print $projectFolder; ?>js/bgscrolldisable.js"></script>	
	</body>
</html>
