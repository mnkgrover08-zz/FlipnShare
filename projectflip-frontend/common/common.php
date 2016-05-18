<?php
//TODO: Write out detailed comments
$projectFolder = "projectflip-frontend/";
$jsonFolder = "json/";
$urlString = str_replace($projectFolder, "", $_SERVER['REQUEST_URI']);
$fullURL = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$urlArgs = explode('/', $urlString);
if($urlArgs[1] == "article") {
	$year = $urlArgs[2];
	$month = $urlArgs[3];
	$jsonFileName = $urlArgs[4];
	$date = date("Y-m-d", strtotime($year."-".$month."-01"));
	$coverJson = getIssue($date);
	$coverJson = getJson($coverJson);
}
//Get Latest Issue
function getIssue($date) {
	$year = date('Y', strtotime($date));
	$month = date('m', strtotime($date));
	$jsonLoc = 'json/'.$year.'/'.$month.'/cover.json';
	$issueExists = file_exists($jsonLoc);
	if($issueExists) {
		return $jsonLoc;
	} else {
		$date = date('Y-m-d',strtotime($date . "-1 month"));
		$jsonLoc = getIssue($date);
		if($jsonLoc) {
			return $jsonLoc;
		}
	}
}

//Get Menu Jsons -- articles.json -- categories.json -- issues.json

function getMenuArticlesJson($date) {
	$year = date('Y', strtotime($date));
	$month = date('m', strtotime($date));
	$articlesJsonLoc = 'json/'.$year.'/'.$month.'/articles.json';
	if($articlesJsonLoc) {
		return $articlesJsonLoc;
	} else {
		$date = date('Y-m-d',strtotime($date . "-1 month"));
		$articlesJsonLoc = getMenuArticlesJson($date);
		if($articlesJsonLoc) {
			return $articlesJsonLoc;
		}
	}
}

function getMenuCategoriesJson($date) {
	$year = date('Y', strtotime($date));
	$month = date('m', strtotime($date));
	$categoriesJsonLoc = 'json/'.$year.'/'.$month.'/categories.json';
	if($categoriesJsonLoc) {
		return $categoriesJsonLoc;
	} else {
		$date = date('Y-m-d',strtotime($date . "-1 month"));
		$categoriesJsonLoc = getMenuArticlesJson($date);
		if($categoriesJsonLoc) {
			return $categoriesJsonLoc;
		}
	}
}

function getMenuIssuesJson($date) {
	$year = date('Y', strtotime($date));
	$month = date('m', strtotime($date));
	$issuesJsonLoc = 'json/'.$year.'/'.$month.'/issues.json';
	if($issuesJsonLoc) {
		return $issuesJsonLoc;
	} else {
		$date = date('Y-m-d',strtotime($date . "-1 month"));
		$issuesJsonLoc = getMenuArticlesJson($date);
		if($issuesJsonLoc) {
			return $issuesJsonLoc;
		}
	}
}

//Get JSON from a file
function getJson($jsonLoc) {
	$getJson = file_get_contents($jsonLoc);
	$getJson = json_decode($getJson);
	return $getJson;
}

?>
