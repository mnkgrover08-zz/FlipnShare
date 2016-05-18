<?php
//echo "<pre>"; print_r($articleJson);exit;
?>
<a href="<?php echo '/'.$projectFolder.$articleJson->previousURL; ?>" id="prev-article"></a>
<a href="<?php echo '/'.$projectFolder.$articleJson->nextURL; ?>" id="next-article"></a>
<link rel="prerender prefetch prev" href="<?php echo '/'.$projectFolder.$articleJson->previousURL; ?>">
<link rel="prerender prefetch next" href="<?php echo '/'.$projectFolder.$articleJson->nextURL; ?>">
<div id="viewport" class="<?php echo $articleJson->templateName; ?>">
	<div class="fancybox-wrap container" id="container">
		<div id="target"></div>
		<div id="prev">
			<div class="arrow arrow-left">
				<span class="visually-hidden">Go to the previous page</span>
				<div class="arrow-conceal"></div>
			</div>
		</div>
		<div id="next">
			<div class="arrow arrow-right">
				<span class="visually-hidden">Go to the next page</span>
				<div class="arrow-conceal"></div>
			</div>
		</div>

		<div class="top-brand" style="display:none">
			<span class="mag-name"><?php echo $metaData->title; ?> <span class="last-word"><?php echo $coverJson->title; ?></span></span><i> // </i>
			<span class="cat-name"><?php echo $coverJson->issue; ?></span>
		</div>
		<div class="page-control" style="display:none">
			<div class="page-number">
				<span class="copy-msg"><?php echo $metaData->publication; ?></span>
			</div>
		</div>			
	</div>
</div>
