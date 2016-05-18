<?php foreach($articleJson->images as $eachImage) { ?>
	<figure class="img-responsive nowrap anchor-top-col-2" style="margin: 0; padding: 0; height:100%;<?php print $styles; ?>">
		<img src="<?php echo '/'.$projectFolder.$eachImage; ?>" class="img-responsive nowrap" style="height:100%;<?php print $styles; ?>">
	</figure>
<?php } ?>
