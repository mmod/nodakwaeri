/**
 * package: nodakwaeri
 * sub-package: controller
 * version:  0.0.2
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps;
var url = require( 'url' );

/**
 * Defines the application's controllers
 *
 * @since 0.0.1
 */
module.exports = exports = controller; 

function controller( config )
{
	this.controller_path = config.controller_path;
	
	// Config is discarded and the controller receives an updated configuration from the router
};

controller.prototype.approach = function( request, response )
{
	// Get the request url
	request.requrl = url.parse( request.url, true );
	
	// Get the path
	var path = request.requrl.pathname;
	
	// Remove leading slash if present, we check for one using the original path in the switch below to handle default url processing by the controller
	var tpath = path;
	if( tpath.charAt( 0 ) === '/' )
	{
		tpath = tpath.substr( 1 );
	}
	
	// And get the path parts
	var parts = tpath.split( '/' );
	
	// Check that we got parts
	if( parts.length > 0 )
	{
		// Great we had parts, now lets check whether there wasn't more than one
		if( !parts.length > 1 )
		{
			// This tells us an action was not provided, let's set the default
			parts[1] = 'index';
		}
	}
	else
	{
		parts[0] = tpath;
		parts[1] = 'index';
	}
	
	// Here we attempt to load whatever resource is requested by controller name
	// if there is an error we display the 404 page.
	try
	{	
		switch( path )
		{
			case '/':
			case '/home':
			{
				//console.log( 'here' );

				// Get our requested controller
				var controller_type = require( this.controller_path + '/home' );
				var requested_controller = new controller_type();
				//for( var prop in requested_controller )
				//{
				//	console.log( 'Prop: ' + prop );
				//}
				
				// Set the controller's renderer
				
				//requested_controller.renderer = this.config.view_provider;
				requested_controller.config = this.config;
				requested_controller.config.controller = 'home';
				
				// The requested action determines the view, ensure the view action specified exists and that its a function, otherwise
				// we'll set Index as the action/view - and if that's not found then a great big 404 will display :)
				if( toString.call( requested_controller[parts[1]] ) !== '[object Function]' )
				{
					//console.log( 'Invalid view/action specified: ' + parts[1] + ', setting default: index' );
					parts[1] = 'index';
				}
				
				requested_controller.config.view = parts[1];
				
				// Require the controller, and use the action term within the parts array to invoke the proper controller method
				requested_controller[parts[1]]( request, response );
			}break;
			
			default:
			{
				// Set some config references
				//console.log( 'nah here' );
				
				// Get our requested controller
				var controller_type = require( this.controller_path + '/' + parts[0] );
				var requested_controller = new controller_type();
				//for( var prop in requested_controller )
				//{
				//	console.log( 'Prop: ' + prop );
				//}
				
				// Set the controller's renderer
				
				//requested_controller.renderer = this.config.view_provider;
				requested_controller.config = this.config;
				requested_controller.config.controller = parts[0];
				
				// The requested action determines the view, ensure the view action specified exists and that its a function, otherwise
				// we'll set Index as the action/view - and if that's not found then a great big 404 will display :)
				if( toString.call( requested_controller[parts[1]] ) !== '[object Function]' )
				{
					//console.log( 'Invalid view/action specified: ' + parts[1] + ', setting default: index' );
					parts[1] = 'index';
				}
				
				requested_controller.config.view = parts[1];
				
				// Require the controller, and use the action term within the parts array to invoke the proper controller method
				requested_controller[parts[1]]( request, response );
			}break;
		}
	}
	catch( error )
	{
		// And log the error ofc
		console.log( 'Controller error: ' + error + ' ' + path );
		
		// If the controller can't be loaded for some reason, handle the exception by showing a 404
		require( './404' ).get( request, response );
		
	}
};