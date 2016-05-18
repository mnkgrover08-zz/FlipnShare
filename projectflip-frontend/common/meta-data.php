<?php
$metaDataJsonURL = $jsonFolder."metadata.json";
$metaJSONCode = file_get_contents($metaDataJsonURL);
$metaDataFullObj = json_decode($metaJSONCode);
$metaData = $metaDataFullObj->metadata;
$openGraphData = $metaData->opengraph;
$twitterData = $metaData->twitter;
//echo "<pre>";print_r($metaData);exit;
?>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="viewport" content="user-scalable=no,initial-scale=1.0,maximum-scale=1.0,width=device-width,minimal-ui">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title><?php echo $metaData->title; ?></title>

<!-- General Meta Data Code -->
<meta name="description" content="<?php echo $metaData->description; ?>">
<meta name="keywords" content="<?php echo $metaData->keywords; ?>">
<meta name="author" content="<?php echo $metaData->author; ?>">
<meta name="referrer" content="default">
<!-- General Meta Data Code -->

<!-- Facebook Open Graph -->
<meta property="og:type" content="<?php echo $openGraphData->og_type; ?>" />
<meta property="og:url" content="<?php echo $openGraphData->og_url; ?>" />
<meta property="og:title" content="<?php echo $openGraphData->og_title; ?>" />
<meta property="og:image" content="<?php echo $openGraphData->og_image; ?>" />
<meta property="og:description" content="<?php echo $openGraphData->og_description; ?>" />
<!-- Facebook Open Graph -->


<!-- Twitter Cards -->
<meta name="twitter:card" content="<?php echo $twitterData->twitter_card; ?>" />
<meta name="twitter:site" content="<?php echo $twitterData->twitter_site; ?>" />
<meta name="twitter:url" content="<?php echo $twitterData->twitter_url; ?>" />
<meta name="twitter:title" content="<?php echo $twitterData->twitter_title; ?>" />
<meta name="twitter:description" content="<?php echo $twitterData->twitter_description; ?>" />
<meta name="twitter:image:src" content="<?php echo $twitterData->twitter_image; ?>" />
<!-- Twitter Cards -->
