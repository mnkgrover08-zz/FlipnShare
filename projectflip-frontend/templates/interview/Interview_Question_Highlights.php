<?php //echo "<pre>"; print_r($articleJson); ?>
<style>
	.content img {width:100%;}
	.content strong {color: #333; text-align:center;font-size:16px;}
	.title {padding:0px;line-height:23px;font-size:24px;font-style:normal;text-align:center;text-transform:capitalize;}
	.authorDetails p {
		text-align:center;
	}
</style>
<?php include("common/navigation.php"); ?>

<div id="staticContent">
	<?php echo $articleJson->description;?>
</div>
<div id="dynContent">
	<?php foreach($articleJson->images as $eachImage) { ?>
		<div class="landscape-half nowrap col-span-2" style="height:100%;background-image:url('<?php echo '/'.$projectFolder.$eachImage; ?>');background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
	<?php } ?>
		<div class="col-span-2 nowrap landscape-half anchor-top-col-3" style="border-bottom:2px dashed #000;padding:10px;margin:10px;">
			<div class="title"><?php echo $articleJson->heading; ?></div>
			<?php if($articleJson->authorDetails) { ?>
				<div class="authorDetails"><?php echo $articleJson->authorDetails; ?></div>
			<?php } ?>
			<?php include("common/socialshare.tpl.php");?>
			<p class="summary"><?php print $articleJson->summary; ?></p>
		</div>
</div>

<script>
//Define Page Height and Page Width
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
//Define Landscape Height
var ldHeight = inHeight * 9/20;
$('body').css('max-height', inHeight);
inHeight = inHeight *0.9;
inWidth = inWidth;
$('.full-height').css('height',inHeight);
$('.potrait-full').css('height',inHeight);
$('.landscape-half').css('height', ldHeight);

if(inWidth>720){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           4,
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
