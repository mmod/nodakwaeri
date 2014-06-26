/**
 * package: nodakwaeri
 * sub-package: session
 * version: 0.0.4-alpha
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


var store = {},
	lut = [];


module.exports = exports = session;

//Entry point of the session
function session( config )
{
	this.config = config;
	for( var i=0; i<256; i++ ) 
	{ 
		lut[i] = ( i < 16 ? '0' : '' )+( i ).toString( 16 ); 
	};
};

/**
 * Searches for a session
 * 
 * @param void
 * 
 * @return void
 * 
 * @since 0.0.1
 */
session.prototype.find = function( request, response, callback )
{
	var id,
		cfg = {};
	
	// Start by grabbing the Session Id from the request
	id = this.getId( request );
	
	// Now check for the session by Id from the session store
	if( store.hasOwnProperty( id ) )
	{	// If it exists, set the client session to that instance
		request.session = store[id];
		//console.log( 'existing sid from cookie: ' + id );
	}
	else
	{	// Otherwise create a new session using the new session Id that was generated
		cfg['id'] = id;
		cfg['host'] = this.config.url;
		store[id] = new clientSession( cfg );
		request.session = store[id];
		//console.log( 'newly generated sid:' + id );
	}
	
	// We need to prep some response headers for persistence
	response.setHeader( 'Set-Cookie', request.session.setCookieHeader( id ) );
	
	// Create a new property in the request object, and set it to the value of our session reference
	callback( request, response );
};


/**
 * Parses the request object for the 'id' cookie header.
 * 
 * NOTE: If a session identifier does not exist within the cookie header, or if the session identifier
 * 		 is not found, we generate a new session identifier
 * 
 * @param request
 * 
 * @return String
 * 
 * @since 0.0.1
 */
session.prototype.getId = function( request )
{
	// Parse the request object, fetching the cookie header 'SID'
	// If the SID cookie header does not exist we generate a new session id and then respond to the client with the
	// appropriate response headers set.
	if( request.headers.cookie )
	{
		// Parse the Session Id (SID) cookie header
		var header = /SID=([a-zA-Z0-9\-]*)[\s\,\;]/g.exec( request.headers.cookie );

		console.log( 'Cookie! ' + header[1] );
		
		return header[1];
	}
	else
	{
		// First generate our Session Id 
		// By the way - Thank you Jeff Ward, for the performance, and the saved time! http://stackoverflow.com/a/21963136
		console.log( 'Creating new SID' );
		return this.genId();
	}
};

session.prototype.genId = function()
{	// Thank you Jeff Ward, for the performance, and the saved time! http://stackoverflow.com/a/21963136var d0 = Math.random()*0xffffffff|0;
	var d0 = Math.random()*0xffffffff|0;  
	var d1 = Math.random()*0xffffffff|0;
	var d2 = Math.random()*0xffffffff|0;
	var d3 = Math.random()*0xffffffff|0;
	
	return 	lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
			lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
			lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
			lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
};


//Entry point to a client session
var clientSession;

/**
 * Constructor
 * 
 * @since 0.0.1
 */
function clientSession( config )
{
	this.id = config.id;
	this.data = {};
	this.host = config.host;
	this.path = config.path || '/';
	this.persistent = config.persistent || true;
};

/**
 * Returns a fixed array of cookie headers
 * 
 * @param id	Session Identifier
 * 
 * @return array	Array of strings (cookie headers)
 * 
 * @since 0.0.1
*/	
clientSession.prototype.setCookieHeader = function( id )
{
	return 	[
			 	'SID=' + this.id,
			 	'domain=' + this.host,
			 	'path=' + this.path,
			 	'expires=' + this.genExpirationDate( 0.005 )		// .005 should be .5%, of 24 hours (a day), ultimately representing 30 minutes.
			];
};

/**
 * Generates a cookie expiration date string
 * 
 * @param days	Number of days the cookie should persist
 * 
 * @returns String
 * 
 * @since 0.0.1
 */
clientSession.prototype.genExpirationDate = function( days )
{
	var d = new Date();
	d.setTime( d.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
	
	return d.toGMTString();
};

/**
 * Frees resources used by each session
 * 
 * @since 0.0.1
 */
clientSession.prototype.destroy = function()
{
	delete store[this.id];
};