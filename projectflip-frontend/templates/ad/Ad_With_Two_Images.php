<style>
	img {width:50%}
	video {width:95%; margin-top:-57px;}
</style>
<!-- Navigation -->
<?php include("common/navigation.php"); ?>
<!-- Navigation -->

<div id="staticContent">
	<?php 
		$count = 1;
		foreach($articleJson->images as $index=>$eachImage) { ?>
			<div class="nowrap">
			<a href="<?php print $articleJson->url[$index];?> " target="_blank">
				<div class="potrait-full nowrap" style="background-image:url('<?php echo '/'.$projectFolder.$eachImage;?>');background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
			</a>
			</div>
	<?php 
			$count++;
		} ?>
</div>
	
<div id="dynContent">

</div>


<script>
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;

$('body').css('max-height', inHeight);
inHeight = inHeight *0.9;
inWidth = inWidth;
$('.potrait-full').css('height',inHeight-10);

if(inWidth>720){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           2,
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
    //columnWidth:           screen.width-40,
    columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           0,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'vertical',
    showGrid:              false,
    allowReflow:           true,
    minFixedPadding:       0.5
  });
}

bp.flow(document.getElementById('staticContent'), document.getElementById('dynContent'));
</script>
