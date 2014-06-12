/**
 * package: nodakwaeri
 * sub-package: router
 * version:  0.0.2
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var url = require( 'url' );
var fs = require( 'fs' );

// The router
module.exports = exports = router;

function router( config )
{
	this.controller = config.controller_provider;
	this.asset_path = config.app.asset_path;
	
	// Remove references we do not want to pass forward with the configuration
	delete config.controller_provider;
	
	// Set the controller's configuration
	this.controller['config'] = config;
	
};

// Begin the process
router.prototype.route = function( request, response )
{
	var assets = this.asset_path;
	
	// Get the request url
	request.requrl = url.parse( request.url, true );
	
	// Get the path
	var path = request.requrl.pathname;
	
	// Get the referer
	var referer = request.headers.referer;
	
	// Check the type of content the request is for, and set the proper headers.
	//
	// In the below regexp, we ensure that a period comes before the media identifier at the END of the string
	// so that we do not get accidental matches from a path-naming coincidence.  We also suggest that there
	// could be another period at the end of the string followed by either gz, bz2, or map (css.map).  This covers most media types
	var mediaType = path.match( /\.(css|less|js|ttf|woff|ico|bmp|jpe?g|png|json|xml|text|zip|tar)\.?(gz|bz2|map)?$/ );
	
	// JS files are sometimes fetched as media (e.g. from a script element, defined in the src attribute).  When this happens
	// we will ALWAYS have a referer (that is a string value of the path to the page making the request).  When there is no
	// referer, this means that somebody is directly requesting a .JS file (Or perhaps their browser is in privacy mode?).
	//
	// Depending on the case we handle it correctly, directly called JS file requests are sent to the controller, while the router handles
	// feeding any media JS files needed by the application directly to the browser.
	if( mediaType !== null && ( !( mediaType[1] === 'js' && referer === undefined ) ) )
	{
		//console.log( 'mediaType [Matched] = ' + mediaType.toString() );
		
		// Personally, I don't think we need to throw an exception just because a css file or zip file wasn't
		// found - that's annoying, especially in node.js environments. 
		var dothrow = false;
		
		
		// Since we forced that check for the period, the proper media type is DEFINITELY at array position [1],
		// as array position [0] would be the original string matched that the additional matches are drawn from:
		//
		// We will potentially work with tar.*(gz, bz2) files, So we have also added a match group for .them.  
		if( mediaType[1] === 'tar' )
		{
			mediaType = mediaType[2].toString();
			//console.log( 'mediaType [TarScreened] = ' + mediaType.toString() );
		}
		else
		{
			mediaType = mediaType[1].toString();
			//console.log( 'mediaType [NonTar] = ' + mediaType.toString() );
		}
		
		// Now we check the value of mediaType and set the proper content-type for the response to the client
		switch( mediaType )
		{
			// This case covers .css.map as well, 'map' is in mediaType[2] until mediaType is redefined above
			case 'css':
			case 'less':
			{
				mediaType = 'text/css';
				//console.log( 'CSS/LESS' );
			}break;
			
			case 'js':
			{
				mediaType = 'application/javascript';
				//console.log( 'JS' );
			}break;
			
			case 'ttf': 
			case 'woff':
			{
				mediaType = 'application/x-font-' + mediaType;
				//console.log( 'TTF/WOFF' );
			}break;
			
			case 'ico':
			case 'bmp':
			case 'jpg':
			case 'jpeg':
			case 'png':
			{
				if( mediaType === 'ico' )
				{
					mediaType = 'image/x-icon';
				}
				else if( mediaType === 'jpg' | 'jpeg' )
				{
					mediaType = 'image/jpeg';
				}
				else
				{
					mediaType = 'image/' + mediaType;
				}
				
				//console.log( 'ICO/BMP/JPG/PNG' );
			}break;
			
			case 'xml':
			case 'json':
			{
				mediaType = 'application/' + mediaType;
				//console.log( 'XML/JSON' );
			}break;
			
			case 'text':
			{
				mediaType = 'text/plain';
				//console.log( 'TEXT' );
			}break;
			
			case 'zip':
			{
				mediaType = 'application/octet-stream';
				//console.log( 'ZIP' );
			}break;
			case 'gz':
			{
				mediaType = 'application/x-gzip';
				//console.log( 'TAR.GZ' );
			}break;
			
			case 'bz2':
			{
				mediaType = 'application/x-bzip2';
				//console.log( 'TAR.BZ2' );
			}break;
		}
		
		// Send a success header
		response.writeHead
		(
				200,
				{ 'Content-Type': mediaType }
		);
		
		//console.log( assets + path );
		// Read in the asset or resource
		fs.readFile
		( 
			assets + path,			// __dirname is always the location of the file it is used in without a trailing slash
			'utf8',								// Yep, always utf-8
			function( error, data )
			{
				// If there is an error
				if( error )
				{
					// Log it
					console.log( 'Error reading asset or resource.' );
					
					// If we have set logic to throw an exception
					if( dothrow )
					{
						// Throw it
						throw error;
					}
					
					// Otherwise redirect the user to our nifty 404 controller
					require( './../controller/404' ).get( request, response );
				}
				else
				{
					// If there are no errors, respond with the asset/resource
					response.write( data, 'utf8' );
					response.end();
				}
			}
		);
	}
	else
	{
		//console.log( 'Page requested, referer: ' + referer );
		
		// Attempt to load the requested controller
		this.controller.approach( request, response );
		//require( './controllers/404' ).get( request, response );
	}
};