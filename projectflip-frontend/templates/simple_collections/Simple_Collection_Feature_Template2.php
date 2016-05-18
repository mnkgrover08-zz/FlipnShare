<?php
//echo "<pre>"; print_r($articleJson);exit;
?>
<?php include("common/navigation.php"); ?>

	<div id="staticContent">
		<?php
			$count = 0; 
			foreach($articleJson->itemscollection as $itemObject) {
			//echo '<pre>';print_r($itemObject);
				if($count !=0) {
				//echo trim($itemObject->imageorvideo->file,'public://');
					$mediaURL = '/'.$projectFolder.$itemObject->imageorvideo[0]->file;
					//echo $itemObject->headline.$itemObject->description.'<img src="'.$mediaURL.'">';
					if(isset($itemObject->imageorvideo[0]->file)) {
						echo '<div class="potrait-full nowrap" style="height:100%;background-image:url('.$mediaURL.');background-size:cover;background-position:center;"><div class="img-caption"><div class="item-title">'.$itemObject->headline.'</div><div class="item-description">'.$itemObject->description.'</div></div></div>';
					}
					else {
						echo '<div class="item-noimg nowrap"><div class="item-title">'.$itemObject->headline.'</div><div class="item-description">'.$itemObject->description.'</div></div>';
					}
				}
				else {
				
				}
				$count++;
			}
		?>
	</div>
		<div id="dynContent">
		<div class="col-span-2 full-height"  style="height:100%;background-image:url('<?php echo '/'.$projectFolder.$articleJson->images[0]; ?>');background-size:cover;background-position:center;"><img src="<?php echo '/'.$projectFolder.$articleJson->images[0]; ?>" alt="<?php echo $articleJson->heading; ?>" style="display:none;"/>
			<div class="pb">
				<div class="title"><?php echo $articleJson->heading; ?></div>
				<?php include("common/socialshare.tpl.php");?>
				<div class="authorDetails"><?php echo $articleJson->authorDetails; ?></div>
				<div class="summary"><?php echo $articleJson->summary; ?></div>
			</div>
		</div>
	</div>

<script>


var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;

$('body').css('max-height', inHeight);
inHeight = inHeight *0.9;
inWidth = inWidth;
var ldHeight = inHeight * 9/20;
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
    pagePadding:           0,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'horizontal',
    showGrid:              false,
    allowReflow:           true,
    minFixedPadding:       0.5
  });
}
else if(inWidth>720 && deviceMode < 1){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           1,
    standardiseLineHeight: true,
    pagePadding:           0,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight-30,
    pageArrangement:       'horizontal',
    showGrid:              false,
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
    showGrid:              false,
    allowReflow:           false,
    minFixedPadding:       0.5
  });
}

bp.flow(document.getElementById('staticContent'), document.getElementById('dynContent'));
</script>
