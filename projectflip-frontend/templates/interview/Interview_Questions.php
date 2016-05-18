<style>
	.content .title {text-transform: uppercase;}
	.content .subheading {color: #4892c1; text-align:center; font-weight:bold;}
</style>
<?php include("common/navigation.php"); ?>

<div id="staticContent">
	<?php echo $articleJson->description;?>
	<?php include("common/socialshare.tpl.php");?>
</div>
<div id="dynContent">
	<?php foreach($articleJson->images as $eachImage) { ?>
		<div class="col-span-2">
			<!-- Images -->
			<?php foreach($articleJson->images as $eachImage) { ?>
			<div class="landscape-half" style="background-image:url('<?php echo '/'.$projectFolder.$eachImage; ?>');background-size:contain;background-position:center top;background-repeat:no-repeat;"></div>
	<?php }?>			
			<!-- Images -->
		</div>
	<?php } ?>
	<div class="col-span-2">
		<!-- Article Title -->
		<?php include("common/heading.tpl.php");?>
		<!-- Article Title -->
		
		<!-- Sub Heading -->
		<?php include("common/subheading.tpl.php");?>
		<!-- Sub Heading -->
		
		<!-- Author Details -->
		<?php include("common/authordetails.tpl.php");?>
		<!-- Author Details -->
		
		<!-- Article Summary -->
		<?php include("common/summary.tpl.php");?>
		<!-- Article Summary -->
	</div>
</div>

<script>
//Define Page Height and Page Width
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
$('body').css('max-height', inHeight);
inHeight = inHeight *0.9;
inWidth = inWidth;
if(inWidth < 720) {
	//Define Landscape Height
	var ldHeight = inHeight * 6/20;
}
else {
	//Define Landscape Height
	var ldHeight = inHeight * 8/20;
}
$('.full-height').css('height',inHeight);
$('.potrait-full').css('height',inHeight);
$('.landscape-half').css('height', ldHeight);

if(inWidth>720){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           2,
    standardiseLineHeight: true,
    pagePadding:           10,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight-20,
    pageArrangement:       'horizontal',
    showGrid:              false,
    allowReflow:           true,
    minFixedPadding:       0
  });
}

if(inWidth < 720) {
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    columnWidth:           inWidth,
    columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           0,
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
