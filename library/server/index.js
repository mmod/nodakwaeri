/**
 * package: nodakwaeri
 * sub-package: server
 * version: 0.1.4
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var http = require( 'http' );
var qs = require( 'querystring' );
var url = require( 'url' );


module.exports = exports = server;

//Entry point of the server
function server( config )
{
	this.config = config;
};

/**
 * Starts the server
 * 
 * @param void
 * 
 * @return void
 * 
 * @since 0.0.1
 */
server.prototype.start = function()
{
	var served = this;

	// Get our session and routing provider(s)
	//var session_provider = this.config.session_provider;
	var routing_provider = this.config.routing_provider;
	
	//delete this.config['session_provider'];
	delete this.config['routing_provider'];
	
	// Now create a new instance of our session and/or routing provider(s), feeding them their configuration ahead of time so we don't need
	// to pass it forward each time - just this once (Now it doesn't really matter that I wanted to be so anal about
	// verb-age :).
	//var session = new session_provider( this.config );
	var router = new routing_provider( this.config );
	this.config.router = router;
	
	// Define our http server application
	var app = http.createServer
	(
		function( request, response )
		{
			if( request.method === 'POST' )
			{
				served.processPost( request, response );
			}
			else
			{
				router.route( request, response );
			}
		}
	);

	// Start the http server
	app.listen( this.config.server.port, this.config.server.host );
	console.log( 'Platform: ' + process.platform + '\nArchitecture: ' + process.arch );
	console.log( 'Listening to http://' + this.config.server.host + ' on port ' + this.config.server.port );
};

server.prototype.processPost = function( request, response )
{
	var served = this;
	
	// Extract any posted data
	var posted = '';
	request.on
	( 
		'data',
		function( data )
		{
			posted += data.toString();
			
			// Make sure we aren't getting DOS bombed
			if( posted.length > 1e6 )	// Assuming this works out to 5000000 or ~ 5MB
			{
				console.log( 'Connection destroyed my son, network flooded in postage.' );
				request.connection.destroy();
			}
		}
	);
	request.on
	( 
		'end', 
		function()
		{
			// Add a new member to our request object containing the data
			request.posted = qs.parse( posted );
			//console.log( request.posted );
			
			served.config.router.route( request, response );
		}
	);
	request.on
	(
		'error',
		function( e )
		{
			console.log( 'Error receiving http body [POST]: ' + e.message );
		}
	);
};