/**
 * package: nodakwaeri
 * version:  0.0.0
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MassivelyModified</a>
 * copyright: 2013-2014 Richard B. Winters
 * license: GNU LGPL V3.0
 */

// Deps


/**
 * Entry point to the NodaKwaeri module
 *
 * @since 0.0.1
 */
module.exports = 
{
	/**
	 * Component version string mapping
	 * 
	 * @since 0.0.1
	 */
	_versionmap:
	{
		"nodakwaeri": "0.0.1"
	},
	
	
	/**
	 * Gets the current NodaKwaeri Version
	 * 
	 * @returns string		The NodaKwaeri version string
	 * 
	 * @since 0.0.1
	 */
	version: function()
	{
		return _versionmap['nodakwaeri'];
	},
	
	
	/**
	 * Object class to class type mapping
	 * 
	 * @since 0.0.1
	 */
	_classmap:  
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
	},
	
	
	/**
	 * Returns the type of the entity passed
	 * 
	 * @param entity	object		The object to check the instance type of 
	 * 
	 * @returns	string	The instance type of the object class
	 * 
	 * @since 0.0.1
	 */
	type: function( entity )
	{	
		// Performance is ALWAYS an issue and nothing should be considered negligible - the working code below 
		// yields faster performance than the following snippet by almost 1.5 - 2 times the amount 
		// ( http://stackoverflow.com/a/12022491 ):
		//
		// return ( o === null ) ? String( o ) : _type[ toString.call( o ) ] || "object";
		if( entity === null )
		{
			return String( entity );
		}
		else
		{
			return _classmap[ toString.call( entity ) ] || "object";
		}
	},
	
	
	/**
	 * Extends an object with another, using provided default values for missing elements
	 * 
	 * @param a		object		Object being extended
	 * @param b		object		Object extending with default values provided
	 * 
	 * @returns	object	a, extended by b
	 */
	extend: function( a, b )
	{
		var tA = typeof a, tB = typeof b;
		
		// Very bland, but ensure both arguments were objects (lol)
		if( ( tA && tB ) === "object" )
		{
			// If argument a was an array, then b needs to be one too
			if( ( tA && tB ) instanceof Array )
			{
				for( var i = 0; i < b.length; i++ )
				{
					if( !a.indexOf( b[i] ) )
					{
						a.push( b[i] );
					}
				}
			}
			else if( ( tA && tB ) instanceof Object )
			{
				for( var property in b )
				{
					if( !a.hasOwnProperty( property ) )
					{
						a[property] = b[property];
					}
				}
			}
		}
		
		// Regardless of how we got here, return a
		return a;
	},
	
	
	/**
	 * Executes a supplied method for each member of a supplied object or array
	 * 
	 * @param o		object		An array or object to be iterated over
	 * @param f		function	A function to execute in each iteration
	 * 
	 * @returns {Boolean}	True if processed, false if invalid arguments supplied
	 */
	each: function( o, f )
	{
		// Ensure the second argument is a function
		if( module.exports.type( f ) === "function" )
		{
			// Determine the type of the supplied object
			switch( module.exports.type( o ) )
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
	},
	
	
	/**
	 * Loads the html tool component
	 */
	html: require( "./library/html" )
};