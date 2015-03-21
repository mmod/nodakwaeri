/**
 * package: nodakwaeri
 * sub-package: server
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var http = require( 'http' ),
    qs = require( 'querystring' ),
    url = require( 'url' );


/**
 * Entry point of the server
 *
 * @since 0.2.4
 */
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

    // Get our router
    var droutr = this.config.routr;

    // Now create a new instance of our router, feeding it the configuration
    var routr = new droutr( this.config );
    this.config.routr = routr;
    delete droutr;

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
                served.config.routr.route( request, response );
            }
        }
    );

    // Start the http server
    app.listen( this.config.server.port[this.config.appType], this.config.server.host );
    console.log( 'Platform: ' + process.platform + '\nArchitecture: ' + process.arch );
    console.log( 'Listening to http://' + this.config.server.host + ' on port ' + this.config.server.port[this.config.appType] );
};


/**
 * Processes a client's POST request
 *
 * @param request
 * @param response
 *
 * @since 0.2.4
 */
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
            if( posted.length > 1e6 )   // Assuming this works out to 5000000 or ~ 5MB
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

            served.config.routr.route( request, response );
        }
    );
    request.on
    (
        'error',
        function( e )
        {
            console.log( 'Error receiving http body [POST]: ' + e.message + 'line: ', /\(file:[\w\d/.-]+:([\d]+)/.exec( e.stack )[1] );
        }
    );
};


// Export
module.exports = exports = server;