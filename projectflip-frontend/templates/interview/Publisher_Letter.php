<!-- Navigation -->
<?php include("common/navigation.php"); ?>
<!-- Navigation -->

<div class="publisherLetter">
	<div id="staticContent">
		<?php include("common/description.tpl.php");?>
		<div class="col-span-1 m-sideart" id="m-sideart">
			<div class="collection">
				<!-- Heading -->
				<?php include("common/mainimages.tpl.php");?>
				<!-- Heading -->
				
				<!-- Category Name -->
				<?php include("common/category.tpl.php");?>
				<!-- Category Name -->
				
				<!-- Author Details -->
				<?php include("common/authordetails.tpl.php");?>
				<!-- Author Details -->
				
				<!-- Sub Heading -->
				<?php include("common/subheading.tpl.php");?>
				<!-- Sub Heading -->
				<!-- Social Share -->
				<?php include("common/socialshare.tpl.php");?>
				<!-- Social Share -->
			</div>
		</div>
	</div>

	<div id="dynContent">
		<div class="col-span-3 anchor-top-col-1">
			
			<!-- Category Name -->
			<?php include("common/category.tpl.php");?>
			<!-- Category Name -->

			<!-- Article Title -->
			<?php include("common/heading.tpl.php");?>
			<!-- Article Title -->
		</div>

		<div class="col-span-3 anchor-top-col-1">		
			<!-- Article Summary -->
			<?php include("common/summary.tpl.php");?>
			<!-- Article Summary -->
		</div>

		<div class="col-span-1 anchor-top-col-4 sideart" id="sideart">
			<div class="collection">
				<!-- Heading -->
				<?php include("common/mainimages.tpl.php");?>
				<!-- Heading -->
				
				<!-- Author Details -->
				<?php include("common/authordetails.tpl.php");?>
				<!-- Author Details -->
				
				<!-- Social Share -->
				<?php include("common/socialshare.tpl.php");?>
				<!-- Social Share -->
				
				<!-- Sub Heading -->
				<?php include("common/subheading.tpl.php");?>
				<!-- Sub Heading -->
			</div>
		</div>
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
