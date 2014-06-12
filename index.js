/**
 * package: nodakwaeri
 * version:  0.0.2
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */

// Deps
var http = require( 'http' );
var env = process.env.NODE_ENV;

if( env === ( "" || null ) )
{
	env = "development";
}

module.exports = exports = nk;

// Entry point to the NodaKwaeri module
function nk( config )
{
	this.config = config[env];
	this.config.debug = ( env === "development" ) ? true : false;
};

// Component version string mapping
nk.prototype._versionmap =
{
	"nodakwaeri": "0.0.2"
};

// Object class to class type mapping
nk.prototype._classmap =  
{
	// List of types
	"[object Boolean]": 	"boolean",
	"[object Number]": 		"number",
	"[object String]": 		"string",
	"[object Function]": 	"function",
	"[object Array]": 		"array",
	"[object Date]": 		"date",
	"[object RegExp]": 		"regexp",
	"[object Object]": 		"object"
};

/**
 * Gets the current NodaKwaeri Version
 * 
 * @returns string		The NodaKwaeri version string
 * 
 * @since 0.0.1
 */
nk.prototype.version = function()
{
	return this._versionmap['nodakwaeri'];
};

/**
 * Returns the type of the entity passed
 * 
 * @param entity	object		The object to check the instance type of 
 * 
 * @returns	string	The instance type of the object class
 * 
 * @since 0.0.1
 */
nk.prototype.type = function( entity )
{	
	// The working code below yields faster performance than the following snippet by almost 1.5 - 2 times the amount 
	// ( http://stackoverflow.com/a/12022491 ):
	//
	// return ( o === null ) ? String( o ) : _type[ toString.call( o ) ] || "object";
	if( entity === null )
	{
		return String( entity );
	}
	else
	{
		return this._classmap[ toString.call( entity ) ] || "unknown";
	}
};

/**
 * Extends an object with another, using provided values for missing keys in object a
 * 
 * @param a		object		Object being extended
 * @param b		object		Object which keys and values are taken to extend another object
 * 
 * @returns	object	a, extended by b
 */
nk.prototype.extend = function( a, b )
{
	var tA = this.type( a ), tB = this.type( b );
	
	// Very bland, but ensure both arguments were arrays or objects
	if( ( tA === 'array' ) && ( tB === 'array' ) )
	{
		var alength = a.length + 1;
		for( var i = 0; i < b.length; i++ )
		{
			a[alength] = b[i];
			alength++;
		}
	}
	else if( ( tA === 'object' ) && ( tB === 'object' ) )
	{
		for( var property in b )
		{
			if( !a.hasOwnProperty( property ) )
			{
				a[property] = b[property];
			}
		}
	}
	
	/*
	console.log( '\nResult:' );
	for( var prop in a )
	{
		console.log( prop );
	}
	console.log( 'EndResult\n' );
	 */
	
	// Regardless of how we got here, return a
	return a;
};


/**
 * Executes a supplied method for each member of a supplied object or array
 * 
 * @param o		object		An array or object to be iterated over
 * @param f		function	A function to execute in each iteration
 * 
 * @returns {Boolean}	True if processed, false if invalid arguments supplied
 */
nk.prototype.each = function( o, f )
{
	// Ensure the second argument is a function
	if( this.type( f ) === "function" )
	{
		// Determine the type of the supplied object
		switch( this.type( o ) )
		{
			case "array":
			{
				// Iterate over the array
				for( var i = 0; i < o.length; i++ )
				{
					// Provide the index as the key to the provided function
					f( i, o[i] );
				}
			}break;
			
			case "object":
			{
				// Iterate over the objects properties
				for( var p in o )
				{
					// Supply the property name as the key to the provided function
					f( p, o[p] );
				}
			}break;
			
			default:
			{
				// First argument invalid, must be Associative Object or an Array
				return false;
			}break;
		}
		
		// Everything went well
		return true;
	}
	
	// Second argument invalid, must be a function that takes 2 arguments
	return false;
};

nk.prototype.init = function( o )
{	
	// Set the defaults for those who wish to use NodaKwaeri to its
	// fullest, and invoke this method supplying only the necessary paths
	var defaults = 
	{
		routing_provider: 'nk',
		session_provider: 'nk',
		controller_provider: 'nk',
		model_provider: 'nk',
		view_provider: 'nk'
	};
	o = this.extend( o || {}, defaults );
	
	// Make sure the paths were provided, they have to be because of the fact that __dirname in this
	// file will not point to the proper directories for the application being created using this
	// framework
	if( ( this.config.app.controller_path || this.config.app.model_path || this.config.app.view_path || this.config.app.asset_path ) === ( null || undefined )  )
	{
		console.error( 'MVC and Asset paths must be set.' );
		
		throw ( 'MVC and Asset paths must be set.' );
	}
	
	// If a custom router wasn't provided, deploy the built in router
	if( o.routing_provider === 'nk' )
	{
		o.routing_provider = this.router;
		console.log( 'Using nk.router for routing' );
	}
	
	// If a custom controller wasn't provided, deploy the built in controller initialized with the supplied controller path
	if( o.controller_provider === 'nk' )
	{
		o.controller_provider = new this.controller( { controller_path: this.config.app.controller_path } );
		console.log( 'Using nk.controller for the application controller' );
		
		// we can also delete the controller_path variable now as we won't need it
		//delete o.controller_path;
	}
	
	// If a custom renderer wasn't provided, add renderer_tools to the configuration
	if( o.view_provider === 'nk' )
	{
		
		// If custom rendering_tools was not provided in the configuration, add it
		if( !o.hasOwnProperty( 'rendering_tools' ) )
		{
			o['rendering_tools'] = this;
			console.log( 'Using nk for rendering tools' );
		}
		else
		{
			// Otherwise make sure it's an object, and then extend it to make sure all ends are covered in case of missing components
			if( this.type( o.rendering_tools ) !== ( 'object' ) )
			{
				o.rendering_tools = this;
				console.log( 'Using nk for rendering tools' );
			}
			else
			{
				o.rendering_tools = this.extend( o.rendering_tools, new this.html( this ) );
				console.log( 'Using custom rendering_tools' );
			}
		}
		
		// Now instantiate the renderer passing in the configuration
		o.view_provider = new this.renderer( o.rendering_tools, this.config.app.view_path );
		
		// Now remove the view path so that it is not being passed forward
		//delete o.view_path;
	}
	
	// Let's update the configuration to handle dependencies further along the asynchronous chain of our application loop.
	config = this.extend( this.config, o );
	
	//for( var property in config )
	//{
	//	console.log( property );
	//}
	//console.log( config.server.port );
	
	// Initialize our server with the updated configuration
	var server = new this.server( config );
	server.start();
};

nk.prototype.server = require( "./library/server" );

nk.prototype.router = require( "./library/router" );

nk.prototype.controller = require( "./library/controller" );

nk.prototype.renderer = require( "./library/renderer" );

// Loads the rendering tools component
nk.prototype.html = require( "./library/html" );