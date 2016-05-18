<?php //echo "<pre>"; print_r($articleJson); ?>
<?php include("common/navigation.php"); ?>

<div id="staticContent">
	<?php include("common/heading.tpl.php");?>
	<?php include("common/category.tpl.php");?>
	<?php include("common/subheading.tpl.php");?>
	<?php include("common/authordetails.tpl.php");?>
	<?php include("common/summary.tpl.php");?>
	<?php include("common/description.tpl.php");?>
	<?php include("common/socialshare.tpl.php");?>
</div>
<div id="dynContent">
	<div class="anchor-top-col-2">
		<?php //include("common/mainimages.tpl.php");?>
		<?php foreach($articleJson->images as $eachImage) { ?>
		<div class="potrait-full nowrap" style="height:100%;background-image:url('<?php echo '/'.$projectFolder.$eachImage; ?>');background-size:contain;background-position:center top;background-repeat:no-repeat;"></div>
<?php }?>
	</div>
</div>

<script>
//Define Page Height and Page Width
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;

//Set body height
$('body').css('max-height', inHeight);
//Define viewport height and width
inHeight = inHeight *0.9;
inWidth = inWidth;

//Define Landscape Height
var ldHeight = inHeight * 9/20;

$('.full-height').css('height',inHeight);
$('.potrait-full').css('height',inHeight);
$('.landscape-half').css('height', ldHeight);
var deviceMode = inWidth/inHeight;

if(inWidth>720 && deviceMode > 1){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           3,
    standardiseLineHeight: true,
    pagePadding:           0,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'horizontal',
    allowReflow:           true,
    minFixedPadding:       0.5
  });
}
else if(inWidth>720 && deviceMode < 1){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           2,
    standardiseLineHeight: true,
    pagePadding:           0,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'horizontal',
    allowReflow:           true,
    minFixedPadding:       0.5
  });
}
else {
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    columnWidth:           inWidth-40,
    columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           0,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'vertical',
    allowReflow:           false,
    minFixedPadding:       0.5
  });
}

bp.flow(document.getElementById('staticContent'), document.getElementById('dynContent'));
</script>
