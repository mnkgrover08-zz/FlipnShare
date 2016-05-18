<?php
//echo "<pre>"; print_r($articleJson);exit;
?>
<?php include("common/navigation.php"); ?>

	<div id="staticContent">
		<?php
			$count = 0; 
			foreach($articleJson->checklistcollection as $itemObject) {
				$mediaURL = '/'.$projectFolder.$itemObject->imageorvideo[0]->file;
				if(isset($itemObject->imageorvideo[0]->file)) {
					echo '<div class="landscape-half nowrap" style="height:100%;background-image:url('.$mediaURL.');background-size:cover;background-position:center;"></div><div class="img-caption"><div class="item-title">'.$itemObject->headline.'</div><div class="item-description">'.$itemObject->description.'</div></div>';
					if(count($itemObject->contactNumbers) > 0) {
					echo '<div class="item-contact"><label>Telephone: </label><span class="tel">'.$itemObject->contactNumbers[0].'</span></div>';
					}
					if(count($itemObject->websiteUrls) > 0) {
					echo '<div class="item-website"><label>Website: </label><a href="'.$itemObject->websiteUrls[0].'" target="_blank">'.$itemObject->headline.'</a></div>';
					}
					if($itemObject->priceDetails != "") {
					echo '<div class="item-price"><label>Price: </label>'.$itemObject->priceDetails[0].'</div>';
					}
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
					<div class="title"><?php echo $articleJson->heading; ?></div>
					<?php include("common/socialshare.tpl.php");?>
					<div class="article-subtext"><?php echo $articleJson->subheading; ?></div>
				</div>
			</div>
	</div>

<script>
//Define Page Height and Page Width
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
if(inWidth < 480) {
	//Define Landscape Height
	var ldHeight = inHeight * 6/20;
}
else {
	//Define Landscape Height
	var ldHeight = inHeight * 9/20;
}
$('body').css('max-height', inHeight);
inHeight = inHeight *0.9;
inWidth = inWidth;
$('.full-height').css('height',inHeight);
$('.potrait-full').css('height',inHeight);
$('.landscape-half').css('height', ldHeight);
var deviceMode = inWidth/inHeight;

if(inWidth>720 && deviceMode > 1){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           2,
    standardiseLineHeight: true,
    pagePadding:           30,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'horizontal',
    showGrid:              false,
    allowReflow:           true,
    minFixedPadding:       0
  });
}
else if(inWidth>720 && deviceMode < 1){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           30,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'horizontal',
    showGrid:              false,
    allowReflow:           true,
    minFixedPadding:       0
  });
}
else {
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    columnWidth:           inWidth,
    columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           30,
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
