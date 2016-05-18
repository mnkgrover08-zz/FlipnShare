<?php
//echo "<pre>"; print_r($articleJson);
?>
<style>
	/*
	ul { padding-left: 30px; margin: 15px 0; }
	li { margin: 0; padding: 0; border: 0; }
	p, div, .cf-column {
		line-height: 28px;
	}
	h1, h2, h3, h4, h5, h6 { margin: 5px 0 10px; padding: 0; font-weight: bold; -webkit-font-smoothing: antialiased; cursor: text; position: relative; }
	body { font: 14px 'Open Sans', sans-serif; color: #333; font-size: 14px; line-height: 1.6; }
	a { color: #4183C4; text-decoration: none; }
	a:hover { text-decoration: underline; }
	a:active { outline: none; }
	.traveltalk .row{height:100%}
	*/
	/*.cf-column-1 p:first-child:first-letter { float: left; color: #903; font-size: 75px; line-height: 60px; padding-top: 4px; padding-right: 8px; padding-left: 3px; }*/
	
	.metainfo{color:#ff525e}
	figure{display:block;}
	figure .imgcaption{background:#000;color:#fff;padding:5px;border-left:5px solid #ff525e;margin-top:5px;position:absolute;bottom:10px;right:0;font-size:25px;opacity:0.8}
	h2{color:#3a3a3a;border-left:5px solid #ff525e;padding-left:5px;}

	.img-responsive{width:100%;height:auto;}
</style>

<!-- Navigation -->
<?php include("common/navigation.php"); ?>
<!-- Navigation -->


<div id="staticContent">
		<?php include("common/heading.tpl.php");?>
		<?php include("common/authordetails.tpl.php");?>
		<?php include("common/summary.tpl.php");?>
		<?php include("common/specialnotes.tpl.php");?>
		<?php include("common/socialshare.tpl.php");?>
		
		<?php
		foreach($articleJson->calendarCollection as $eventObject) {?>
		<div class="event nowrap">
			<div class="event-date"><h3 class="events"><?php echo $eventObject->eventDates; ?></h3></div>
			<div class="title events"><?php echo $eventObject->eventTitle; ?></div>
			<div class="description events"><?php echo $eventObject->eventDescription; ?></div>
			<?php
				foreach($eventObject->photosCollection as $photoObject) {?>
				 
					<img class="img-responsive nowrap" src="<?php echo '/'.$projectFolder.$photoObject->images[0]->file;?>"/>
			<?php } ?>
			</div>
		<?php }?>
</div>
<div id="dynContent">
</div>

<script>
var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
var resizeHeight = 0.5  * inHeight;
var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;

$('body').css('max-height', inHeight);
inHeight = inHeight *0.9;
inWidth = inWidth;
if(screen.width>720){
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    //columnWidth:           120,
    columnCount:           4,
    standardiseLineHeight: true,
    pagePadding:           10,
    viewportWidth:         inWidth,
    viewportHeight:        inHeight,
    pageArrangement:       'horizontal',
    showGrid:              false,
    allowReflow:           true,
    minFixedPadding:       0.5
  });
}

if(screen.width < 720) {
  //Instantiating binPackage, The column width should calculated based on the screen size and the number of columns we want
  var bp = new binPackage('target', 'viewport', {
    columnWidth:           inWidth-40,
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
