<?php //echo "<pre>"; print_r($articleJson);exit; ?>

<?php include("common/navigation.php"); ?>

	<div id="staticContent">
		<?php include("common/description.tpl.php");?>
	</div>
	<div id="dynContent">
		
		<?php include("common/heading.tpl.php");?>
		<?php include("common/socialshare.tpl.php");?>

		<div class="anchor-top-col-2">
			
			<?php include("common/mainimages.tpl.php");?>
		</div>
	</div>
	
<script>

var inHeight = "innerHeight" in window
               ? window.innerHeight
               : document.documentElement.offsetHeight;

var inWidth = "innerWidth" in window
		   ? window.innerWidth
		   : document.documentElement.offsetWidth;


vpw = window.innerWidth;
vph = window.innerHeight-80;

$('.container').css({'width': vpw + 'px'});
$('.container').css({'height': vph + 'px'});

$('.cover-img-responsive').height(vph);

inHeight = vph;
inWidth = vpw;

if((inWidth < 768)){
	//Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
	var cf = new binPackage('target', 'viewport', {
		columnCount:           1,
		standardiseLineHeight: true,
		viewportWidth:         inWidth,
		viewportHeight:        inHeight,
		pageArrangement:       'horizontal',
		pagePadding:           30,
		pageClass:			   'page',
	});
}

if((inWidth >= 768) && (inWidth <= 1024)){
	var cf = new binPackage('target', 'viewport', {
		columnCount:           2,
		standardiseLineHeight: true,
		viewportWidth:         inWidth,
		viewportHeight:        inHeight,
		pageArrangement:       'horizontal',
		pagePadding:           30,
		pageClass:			   'page',
	});
}

if((inWidth > 1024) && (inWidth <= 1824)){
	var cf = new binPackage('target', 'viewport', {
		columnCount:           4,
		standardiseLineHeight: true,
		viewportWidth:         inWidth,
		viewportHeight:        inHeight,
		pageArrangement:       'horizontal',
		pagePadding:           30,
		pageClass:			   'page',
		columnFragmentMinHeight: 20,
		minFixedPadding: 0.5,
		noWrapOnTags: ['figure', 'h1', 'h2', 'h3'],
		allowReflow: true,	
	});
}

if(inWidth > 1824){
	var cf = new binPackage('target', 'viewport', {
		columnCount:           4,
		standardiseLineHeight: true,
		viewportWidth:         inWidth,
		viewportHeight:        inHeight,
		pageArrangement:       'horizontal',
		pagePadding:           30,
		pageClass:			   'page',
		columnFragmentMinHeight: 20,
		minFixedPadding: 0.5,
		noWrapOnTags: ['figure', 'h1', 'h2', 'h3'],
		allowReflow: true,
	});
}

cf.flow(document.getElementById('staticContent'), document.getElementById('dynContent'));

</script>
