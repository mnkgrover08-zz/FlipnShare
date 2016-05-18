<?php
	$date = date('Y-m-d');
	$menuArticlesJson = getMenuArticlesJson($date);
	$menuArticles = getJson($menuArticlesJson);
	$menuCategoriesJson = getMenuCategoriesJson($date);
	$menuCategories = getJson($menuCategoriesJson);
	$menuIssuesJson = getMenuIssuesJson($date);
	$menuIssues = getJson($menuIssuesJson);
?>
	<div id="menu" style="display:none;">
		<?php
			$selectBox="<div class='edition-chooser'><select id='categories'>";
			$options='';
			foreach ($menuIssues as $issues) {
			 	$options .= '<option value="'.$issues->issueName.'">'.$issues->issueName.'</option>';
			 } 
			$selectBox .= $options."</select></div>";
			$articles = '<ul id="subtabs"><li><a href="javascript:void(0)" onclick="javascript: document.getElementById(\'article_headline\').style.display=\'none\';document.getElementById(\'articles_objects\').style.display=\'none\'; document.getElementById(\'categories_objects\').style.display=\'block\';" id="total_categories"><span class="subhead">CATEGORIES</span></a></li><li class="active"><a onclick="javascript:document.getElementById(\'categories_objects\').style.display=\'none\';document.getElementById(\'articles_objects\').style.display=\'block\';document.getElementById(\'article_headline\').style.display=\'block\';"  href="javascript:void(0)" id="total_articles"><span class="subhead">ARTICLES</span></a></li></ul></div><div id="article_headline" style="display:none;"><ul class="articles_list">';
			foreach ($menuArticles as $Articles) {
				$articleSourceUrl = '/'.$projectFolder.$Articles->sourceURL; 
				$articles.= '<li class="article_item"><span class="article_category">'.$Articles->category.'</span><a style="text-decoration:none" href="'.$articleSourceUrl.'"><span style="top:-9px;" class="article_heading">'.$Articles->heading.'</span></a></li>';	
			}
			$articles.= '</ul>';
			$tiles = '<div class="tiles"><div id="dynamic_menu_content"><div id="articles_objects" style="margin-left:30px;display:none;">'.$articles.'</div><ul id="categories_objects" class="group"><div><ul id="subtabs"><li class="active"><a href="javascript:void(0)" onclick="javascript: document.getElementById(\'article_headline\').style.display=\'none\';document.getElementById(\'articles_objects\').style.display=\'none\'; document.getElementById(\'categories_objects\').style.display=\'block\';" id="total_categories"><span class="subhead">CATEGORIES</span></a></li><li><a onclick="javascript:document.getElementById(\'categories_objects\').style.display=\'none\';document.getElementById(\'articles_objects\').style.display=\'block\';document.getElementById(\'article_headline\').style.display=\'block\';" href="javascript:void(0)" id="total_articles"><span class="subhead">ARTICLES</span></a></li></ul></div>';
			foreach ($menuCategories as $categories) {
				$title = $categories->category;
				$sourceUrl = '/'.$projectFolder.$categories->sourceURL;
				$imageUrl = '/'.$projectFolder.$categories->images[0];
				$categoryId = $categories->category;
				$tiles .= '<li class="tile brick perrow-3"><a href="'.$sourceUrl.'" data-fl-href="javascript:void(0)" data-section="'.$title.'"><span>'.$title.'</span><i style="background-image: url('.$imageUrl.');"></i></a></li>';
			}
			$tiles.= '</ul></div></div>';
			$guide = "<div class='guide'><div class='selected-category primary'><div class='scrollable'><button class='fl-button signout hidden'></button><h2></h2><div style='padding-left:15px'>Issue: </div>".$selectBox.$tiles."</div></div></div>";
			echo $guide;
		?>
	</div>
