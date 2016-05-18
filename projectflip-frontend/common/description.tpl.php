<?php if(isset($articleJson->description)) { ?>
	<div class="description">
		<?php include("common/authorDetails.tpl.php");?>
		<?php print $articleJson->description; ?>
	</div>
<?php } ?>
