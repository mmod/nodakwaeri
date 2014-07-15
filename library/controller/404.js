/**
 * 404.js
 * 
 * package: MMod-Node
 * version: 0.1.2
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MassivelyModified</a>
 * copyright: 2013-2014 Richard B. Winters
 */

exports.get = function( request, response )
{
	response.setStatus = 404;
	response.setHeader( 'Content-Type', 'text/html' );
	//response.writeHead();
	
	response.write
	(
			'<!doctype html>' +
			'<html lang="en">' +
				'<head>' +
					'<meta charset="utf-8">' +
					'<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
					'<title>Whoopsie!</title>' +
					'<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />' +
					'<link rel="stylesheet" type="text/css" href="/css/mmod.css" />' +
				'</head>' +
				'<body>' +
			        '<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
			        	'<div class="container">' +
			        		'<div class="navbar-header">' +
				        		'<div class="icon-mmod pull-left"><span class="hidden"></span></div>' +
			        			'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nk-navbar-collapse-1">' +
			        				'<span class="sr-only">Toggle navigation</span>' +
			        				'<span class="icon-bar"></span>' +
			        				'<span class="icon-bar"></span>' +
			        				'<span class="icon-bar"></span>' +
			        			'</button>' +
			        		'</div>' +
			        	
				        	'<div class="collapse navbar-collapse" id="nk-navbar-collapse-1">' +
				        		
				        		'<ul class="nav navbar-nav navbar-right">' +
				        			'<li class="dropdown">' +
				        				'<a href="#" class="dropdown-toggle" data-toggle="dropdown">Options<span class="caret"></span></a>' +
				        				'<ul class="dropdown-menu" role="menu">' +
				        					'<li><a href="#">Documentation</a></li>' +
				        					'<li><a href="#">Support</a>' +
				        					'<li><a href="#">Preferences</a></li>' +
				        					'<li class="divider"></li>' +
				        					'<li><a href="#">Sign Out</a></li>' +
				        				'</ul>' +
				        			'</li>' +
				        			'<li><a href="#">Help</a></li>' +
				        		'</ul>' +
				        	'</div><!-- /.navbar-collapse -->' +
				        '</div><!-- /.container -->' +
			        '</nav>' +
			        '<div class="container-fluid">' +
				        '<div class="panel">' +
						    '<section id="showcase">' +
						    	'<div class="jumbotron">' +
						    		'<center>' +
						    			'<h1>Too bad!</h1>' +
					            		'<p>The resource requested could not be processed...</p>' +
					            		'<p><p>' +
					            		'<h3>If you feel you received this message in error, do not hesitate to contact <a href="/support">Support</a>.</h3>' +
					            	'</center>' +
						    	'</div>' +
						    '</section>' +
					    '</div><!-- /.panel -->' +
			        '</div><!-- container-fluid -->' +
			    	'<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>' +
			        '<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>' +
			        '<script type="text/javascript" src="/js/mmod-ui.js"></script>' +
				'</body>' +
			'</html>'
	);
	
	response.end();
};