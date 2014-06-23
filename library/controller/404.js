/**
 * 404.js
 * 
 * package: MMod-Node
 * version: 0.0.3-alpha
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
			"<html><head><title>Failure</title></head><body><h1>Too Bad...</h1><p>There was an issue loading the requested resource!</p></body></html>"
	);
	
	response.end();
};