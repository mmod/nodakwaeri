/**
 * package: nodakwaeri
 * sub-package: session
 * version: 0.1.3
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


var timestamp,
	store = {},
	lut = [];


module.exports = exports = session;

//Entry point of the session
function session( config )
{
	this.config = config;
	store = {};
	lut = [];
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
		cfg = {},
		ts = new Date(),
		stamp;
	
	// Start by grabbing the Session Id from the request
	id = this.getId( request );
	stamp = ts.setTime( ts.getTime() + ( 15 * 60 * 1000 ) );
	
	// Now check for the session by Id from the session store
	if( store.hasOwnProperty( id ) )
	{	// If it exists, and its not expired set the client session to that instance
		store[id].expires = stamp;
	}
	else
	{	// Otherwise create a new session using the cookie provided Id or new session Id that was generated
		cfg['id'] = id;
		cfg['host'] = this.config.url;
		cfg['expires'] = stamp;
		cfg['data'] = session.prototype.getDataCookie( request );
		cfg.data['authenticated'] = false;
		store[id] = new clientSession( cfg );
		request.session = store[id];
	}
	
	// We must fetch the latest cookies
	store[id].data = this.getDataCookie( request );
	//console.log( JSON.stringify( store[id].data ) );
	
	// And pass the session along to our application code
	request.session = store[id];
	response.setSession = session.prototype.set;
	response.setCookieHeader = session.prototype.setCookieHeader;
	
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

		//console.log( 'Cookie! ' + header[1] );
		
		return header[1];
	}
	else
	{
		// First generate our Session Id 
		// By the way - Thank you Jeff Ward, for the performance, and the saved time! http://stackoverflow.com/a/21963136
		//console.log( 'Creating new SID' );
		return this.genId();
	}
};

/**
 * Generates a GUID
 * 
 * @returns {String}
 * 
 * @since 0.0.1
 */
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

/**
 * Gets the 'data' cookie
 * 
 * @param request
 * @returns
 * 
 * @since 0.0.5-alpha
 */
session.prototype.getDataCookie = function( request )
{
	if( request.headers.cookie )
	{
		var data = /data=(\{(.*)\})/g.exec( request.headers.cookie );
		
		if( data )
		{
			if( data.length > 1 )
			{
				return JSON.parse( data[1] );
			}
		}
	}
	
	return { username: 'Guest' }
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
session.prototype.setCookieHeader = function( client )
{
	return 	[
			 	'SID=' + client.id,
			 	'domain=' + client.host,
			 	'path=' + client.path,
			 	'expires=' + session.prototype.genExpirationDate( 30 ),		// We'll set it for 30 days later if remember me is checked when a user logs in.
			 	'data=' + JSON.stringify( client.data )
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
session.prototype.genExpirationDate = function( minutes )
{
	var d = new Date();
	d.setTime( d.getTime() + ( minutes * 60 * 1000 ) );
	
	return d.toGMTString();
};

/**
 * Starts the session service
 * 
 * @since 0.0.5-alpha
 */
session.prototype.start = function( options )
{
	// For now we will default the timer to every 15 minutes.
	timestamp = new Date();
	this.cleanup( ( 5*60*1000 ) );
};

/**
 * Sets a Data/session
 * 
 * @since 0.0.5-alpha
 */
session.prototype.set = function( client )
{
	this.setHeader( 'Set-Cookie', this.setCookieHeader( client.id ) );
};

/**
 * Performs cleanup tasks
 * 
 * @since 0.0.5-alpha
 */
session.prototype.cleanup = function( delay )
{
	var reaper = session.prototype.cleanup,
		count = 0,
		ts = new Date(),
		stamp;
	
	if( store )
	{
		for( var client in store )
		{
			console.log( '\n' );
			console.log( 'Session-' + count + ': ' + client );
			for( var member in store[client] )
			{
				console.log( '[S' + count + '] ' + member + ': ' + store[client][member] );
				if( member == 'data' )
				{
					for( var param in member )
					{
						console.log( 'In our client: ' + param + ', with a value of: ' + member[param] );
					}
				}
			}

			stamp = new Date( store[client].expires );
			if( ts > stamp  )
			{
				console.log( client + ' is inactive for too long, removing session.' );
				session.prototype.destroy( client );
			}
			else
			{
				console.log( 'It is: ' + ts + '. ' + store[client].id + ' is still active until ' + stamp + ', not destroying session.' );
			}
			
			console.log( '\n' );
			count++;
		}
	}
	
	console.log( count + ' active client sessions.  Up since ' + timestamp + ', and is now: ' + new Date() );
	setTimeout( function(){ reaper( delay ); }, delay );
};

/**
 * Frees resources used by each session
 * 
 * @since 0.0.1
 */
session.prototype.destroy = function( id )
{
	delete store[id];
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
	this.expires = config.expires
	this.data = config.data;
	this.host = config.host;
	this.path = config.path || '/';
	this.persistent = config.persistent || true;
};