# FlipnShare
Flip n Share is a 3-D Flipboard Like Animation for Magazine Readings and digital publishing companies.It uses technologies like HTML5 PHP JS JQUERY JSON CSS3


NGINX REWRITE RULES : 

rewrite ^/projectflip-frontend/article/[0-9]+/[0-9]+/[a-zA-Z0-9_]+$ /projectflip-frontend/article.php?year=$1&month=$2&id=$3;

Apache Rewrite Rules :

RewriteEngine on
RewriteBase /projectflip-frontend/
RewriteRule ^article/([^/]+)/([^/]+)/([^/]+) /projectflip-frontend/article.php?year=$1&month=$2&id=$3 [NC]
RewriteRule ^([^/]+)/([^/]+)/index.php /projectflip-frontend/index.php?year=$0&month=$1 [NC]


Steps for Installation :

Extract this directory named projectflip-frontend in root folder.

NOTE : 

you can edit commom/header.php according to your requirements 
