/**
 * package: nodakwaeri
 * sub-package: controller
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps;
var events = require( 'events' ),
    url = require( 'url' );


/**
 * Entry point to the application controller
 *
 * @since 0.2.4
 */
function controller( config )
{
    this.dpath = config.dpath;
    this.modl = config.modl;
    this.pottr = config.vew;
    this.promoter = new events.EventEmitter();

    // Config is discarded and the controller receives an updated configuration from the router
};


/**
 * Approaches the client's request
 *
 * @param request
 * @param response
 *
 * @since 0.2.4
 */
controller.prototype.approach = function( request, response )
{
    // Get the request url
    //request.requrl = url.parse( request.url, true );

    // Get the request method
    var reqmeth;
    if( request.method === 'POST' )
    {
        reqmeth = 'Post';
    }
    else
    {
        reqmeth = '';
    }

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
                // Get the derived controller
                var dtype = require( this.dpath + '/home' ),
                    dctrlr = new dtype();

                dctrlr.dpath = this.dpath;
                dctrlr.config = this.config;
                dctrlr.modl = this.modl;
                dctrlr.pottr = this.pottr;
                dctrlr.promoter = this.promoter;
                dctrlr.setUserAuth = this.setUserAuth;

                // The requested action determines the view, ensure the view action specified exists and that its a function, otherwise
                // we'll set Index as the action/view - and if that's not found then a great big 404 will display :)
                if( toString.call( dctrlr[parts[1]] ) !== '[object Function]' )
                {
                    parts[1] = 'index';
                }

                dctrlr.klay =
                {
                    controller: 'home',
                    view: parts[1],
                    viewbag: {}
                };

                dctrlr.rendr = controller.prototype.render;

                // Require the controller, and use the action term within the parts array to invoke the proper controller method
                dctrlr[parts[1] + reqmeth]( request, response );
            }break;

            default:
            {
                // Get the derived controller
                var dtype = require( this.dpath + '/' + parts[0] ),
                    dctrlr = new dtype();

                dctrlr.dpath = this.dpath;
                dctrlr.config = this.config;
                dctrlr.modl = this.modl;
                dctrlr.pottr = this.pottr;
                dctrlr.promoter = this.promoter;
                dctrlr.setUserAuth = this.setUserAuth;

                // The requested action determines the view, ensure the view action specified exists and that its a function, otherwise
                // we'll set Index as the action/view - and if that's not found then a great big 404 will display :)
                if( toString.call( dctrlr[parts[1]] ) !== '[object Function]' )
                {
                    parts[1] = 'index';
                }

                dctrlr.klay =
                {
                    controller:  parts[0],
                    view: parts[1],
                    viewbag: {}
                };

                dctrlr.rendr = controller.prototype.render;

                // Require the controller, and use the action term within the parts array to invoke the proper controller method
                dctrlr[parts[1] + reqmeth]( request, response );
            }break;
        }
    }
    catch( error )
    {
        // And log the error ofc
        console.error( 'Controller error: ' + error + ' Derived path: ' + path + 'line: ', /\(file:[\w\d/.-]+:([\d]+)/.exec( error.stack ) );

        // If the controller can't be loaded for some reason, handle the exception by showing a 404
        require( './404' ).get( request, response );
    }
};


controller.prototype.setUserAuth = function( sid, auth )
{
    if( this.promoter )
    {
        this.promoter.emit( 'moderate', 'authenticated', sid, auth );
        console.log( 'moderate signal emitted' );
    }
};


/**
 * Renders a response for the client
 *
 * @param request
 * @param response
 * @param klay
 *
 * @since 0.2.4
 */
controller.prototype.render = function( request, response, klay )
{
    if( !klay )
    {
        this.pottr.turn( request, response, this.klay );
    }
    else
    {
        this.pottr.turn( request, response, klay );
    }
};


//Export
module.exports = exports = controller;