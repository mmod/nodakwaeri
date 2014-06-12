/**
 * package: nodakwaeri
 * sub-package: server
 * version:  0.0.2
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var http = require( 'http' );


module.exports = exports = server;

//Entry point of the server
function server( config )
{
	//console.log( config );
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
	// Get our routing provider, then remove its reference from the configuration itself so we arent passing it forward
	var routing_provider = this.config.routing_provider;
	
	delete this.config['routing_provider'];
	
	// Now create a new instance of our routing provider, feeding it the configuration ahead of time so we don't need
	// to pass it forward each time - just this once (Now it doesn't really matter that I wanted to be so anal about
	// verb-age :).
	var router = new routing_provider( this.config );
	
	//for( var property in this.config )
	//{
	//	console.log( property );
	//}
	
	// Define our http server application
	var app = http.createServer
	(
			function( request, response )
			{
				router.route( request, response );
			}
	);

	// Start the http server
	app.listen( this.config.server.port, this.config.server.host );
	console.log( 'Platform: ' + process.platform + '\nArchitecture: ' + process.arch );
	console.log( 'Listening to http://' + this.config.server.host + ' on port ' + this.config.server.port );
};