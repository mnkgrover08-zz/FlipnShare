	<link href="/<?php print $projectFolder; ?>css/bootstrap.min.css" rel="stylesheet">
	<link href="/<?php print $projectFolder; ?>css/custom-cover.css" rel="stylesheet">
	<link href="/<?php print $projectFolder; ?>css/base.css" rel="stylesheet">
  <body role="document">    
	<div class="container-fluid">
		<div class="logo-load"></div>
		<div class="se-pre-con"></div>
		<a href="<?php echo '/'.$projectFolder.$coverJson->previousURL; ?>" id="prev-article"></a>
		<a href="<?php echo '/'.$projectFolder.$coverJson->nextURL; ?>" id="next-article"></a>
		<div id="prev">
			<div class="arrow arrow-left">
				<span class="visually-hidden">Go to the previous page</span>
				<div class="arrow-conceal"></div>
			</div>
		</div>
		<div id="next">
			<div class="arrow arrow-right">
				<span class="visually-hidden">Go to the previous page</span>
				<div class="arrow-conceal"></div>
			</div>
		</div>

		<div class="bb-custom-wrapper">
			<div id="bb-bookblock" class="bb-bookblock bgimage">
				<div class="bb-item" id="item1">
					<div class="content">
						<div class="scroller">
							<div class="logo-load"></div>
							<div class="se-pre-con"></div>
						</div>
					</div>
				</div>
				<div class="bb-item" id="item2">
					<div class="content">
						<div class="scroller">
							<div class="row" style="margin-left: auto;">
								<img src="/<?php print $projectFolder.$coverJson->images[0]; ?>" style="margin:0 auto;" class="img-responsive">
							</div>
							<div class="row mobile-custom">
								<div class="col-md-4 cust-column">
									<div id="cover-side-box" class="cover-side-box custom-1">
										<ul>
											<li>
												<h2><?php  echo $coverJson->tablecontents[0]->headline; ?></h2>
											</li>
											<?php  
												foreach ($coverJson->tablecontents[0]->itemscollection as $items) {
													echo "<li><h3>".$items->headline."</h3>";
													echo $items->description."</li>";
												}
											?>
										</ul>

									</div>
								</div>
								<div class="col-md-4 cust-column">
									<div id="cover-side-box" class="cover-side-box custom-2">
										<ul>
											<li>
												<h2><?php  echo $coverJson->tablecontents[1]->headline; ?></h2>
											</li>
											<?php  
												foreach ($coverJson->tablecontents[1]->itemscollection as $items) {
													echo "<li><h3>".$items->headline."</h3>";
													echo $items->description."</li>";
												}
											?>
										</ul>

									</div>
								</div>
								<div class="col-md-4 cust-column">
									<div id="cover-side-box" class="cover-side-box custom-3">
										<ul>
											<li>
												<h2><?php  echo $coverJson->tablecontents[2]->headline; ?></h2>
											</li>
											<?php  
												foreach ($coverJson->tablecontents[2]->itemscollection as $items) {
													echo "<li><h3>".$items->headline."</h3>";
													echo $items->description."</li>";
												}
											?>
										</ul>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bb-item" id="item3">
					<div class="content">
						<div class="scroller">
							<div class="logo-load"></div>
							<div class="se-pre-con"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6">
				<span class="mag-name"><?php echo $metaData->title; ?> <span class="last-word"><?php echo $coverJson->title; ?></span></span><i> // </i>
				<span class="cat-name"><?php echo $coverJson->issue; ?></span>
			</div>
			<div class="col-md-6 right-align">
				<span class="copy-msg"><?php echo $metaData->publication; ?></span>
			</div>
		</div>
	</div>
  </body>
</html>
