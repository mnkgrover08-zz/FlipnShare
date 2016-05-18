<?php //echo "<pre>"; print_r($articleJson);exit; ?>
<style>
	.title, .authorDetails p {text-align:center;}
</style>
<?php include("common/navigation.php"); ?>

	<div id="staticContent">
		<?php
			$count = 0; 
			foreach($articleJson->productCollection as $itemObject) {
				$mediaURL = '/'.$projectFolder.$itemObject->imageorvideo[0]->file;
				if(isset($itemObject->imageorvideo[0]->file)) {
					echo '<div class="landscape-half nowrap" style="height:100%;background-image:url('.$mediaURL.');background-size:contain;background-position:center;background-repeat:no-repeat;"></div><div class="img-caption"><div class="item-title">'.$itemObject->headline.'</div><div class="item-description">'.$itemObject->description.'</div></div>';
				}
				else {
					echo '<div class="item-noimg nowrap"><div class="item-title">'.$itemObject->headline.'</div><div class="item-description">'.$itemObject->description.'</div></div>';
				}
			}
		?>
	</div>
		<div id="dynContent">
			<div class="potrait-full nowrap">
				<div class="pb">
					<?php include("common/heading.tpl.php");?>
					<?php include("common/category.tpl.php");?>
					<?php include("common/authordetails.tpl.php");?>
					<?php include("common/socialshare.tpl.php");?>
					<?php include("common/summary.tpl.php");?>
					<?php include("common/description.tpl.php");?>
				</div>
			</div>
	</div>

<script>
//Define Page Height and Page Width
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var resizeHeight = 0.5  * inHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
//Define Landscape Height
var ldHeight = inHeight * 9/20;
$('body').css('max-height', inHeight);
$('.full-height').css('height',inHeight);
$('.potrait-full').css('height',inHeight);
$('.landscape-half').css('height', ldHeight);

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
    minFixedPadding:       0
  });
}

if(inWidth < 720) {
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    columnWidth:           inWidth-40,
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
