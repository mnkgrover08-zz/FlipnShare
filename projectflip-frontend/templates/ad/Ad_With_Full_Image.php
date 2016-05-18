<style>
	img {width:100%}
	video {width:95%; margin-top:-57px;}
</style>
<!-- Navigation -->
<?php include("common/navigation.php"); ?>
<!-- Navigation -->

<div id="staticContent"></div>
	
<div id="dynContent">
	<div class="col-span-1">
		<?php if($articleJson->url[0]) { ?>
			<a href="<?php print $articleJson->url[0];?> " target="_blank" class="full-height" style="width:100%;">
		<?php } 
 foreach($articleJson->images as $eachImage) { ?>
		<div class="full-height nowrap" style="height:100%;background-image:url('<?php echo '/'.$projectFolder.$eachImage; ?>');background-size:cover;background-position:center top;background-repeat:no-repeat;"></div>
<?php } 		
		if($articleJson->heading) { ?>
			</a>
		<?php } ?>
	</div>
</div>


<script>
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;

$('body').css('max-height', inHeight);
inHeight = inHeight *0.9;
inWidth = inWidth;
$('.full-height').css('height',inHeight);

if(inWidth>720){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           0,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'horizontal',
    showGrid:              false,
    allowReflow:           true,
    minFixedPadding:       0.5
  });
}

if(inWidth < 720) {
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    columnWidth:           inWidth,
    //columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           10,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'vertical',
    showGrid:              false,
    allowReflow:           false,
    minFixedPadding:       0.5
  });
}

bp.flow(document.getElementById('staticContent'), document.getElementById('dynContent'));
</script>
