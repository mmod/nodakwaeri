/**
 * package: nodakwaeri
 * sub-package: session
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var events = require( 'events' ),
    eventEmitter = new events.EventEmitter(),
    timestamp,
    store = {},
    lut = [];


module.exports = exports = session;

//Entry point of the session
function session( config )
{
    this.config = config;
    for( var i=0; i<256; i++ ) 
    { 
        lut[i] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 ); 
    };

    eventEmitter.on( 'userAuthenticated', this.authenticateUser );
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
    var cookies,
        cfg = {},
        ts = new Date(),
        stamp,
        expired = false;

    // Start by parsing the cookies
    cookies = this.getCookies( request );
    cookies.id = cookies.id || this.genId();
    cookies.uk = cookies.uk || this.genId();

    stamp = ts.setTime( ts.getTime() + ( 15 * 60 * 1000 ) );
    //console.log( 'Current session: ' + cookies.id );
    
    // Now check for the session by Id from the session store, and make sure the uk matches in order to further help in avoiding session take-over
    if( store.hasOwnProperty( cookies.id ) && store[cookies.id].uk === cookies.uk )
    {
        // Grab the current cookie expiration from the session store and then update the value to the new stamp.
        var cstamp = new Date( store[cookies.id].expires );
        store[cookies.id].expires = stamp;

        // If the session store's time stamp had expired, it just means the session cleanup cycle hasn't run, let's make sure to set
        // the authenticated value to false so that it is updated on the client's side.
        if( ts > cstamp )
        {
            store[cookies.id].authenticated = false;
        }
    }
    else
    {   // Otherwise create a new session using the cookie provided Id or new session Id that was generated. There is a chance that the session id 
        // existed in the store, but that the uk didn't match - we don't want to overwrite anyone's active session
        while( store.hasOwnProperty( cookies.id ) )
        {
            cookies.id = this.genId();      
        }
        
        cfg.id = cookies.id;
        cfg.uk = cookies.uk;
        cfg.host = this.config.url;
        cfg.expires = stamp;
        cfg.authenticated = false;
        store[cookies.id] = new clientSession( cfg );
    }
    //console.log( JSON.stringify( store[id].data ) );

    // We pass a copy of the client in the request, as well as the accepted cookies, and a method to fetch them
    request.session = {};
    request.session.client = store[cookies.id];
    request.session.cookies = cookies;
    request.session.get = session.prototype.get;
    request.setUserAuthenticated = session.prototype.setUserAuthenticated;
    request.isAuthenticated = session.prototype.isAuthenticated;

    // We create an empty cookies member for allowing cookies to be set, then attach a method to do just that, as well as construct and send the headers
    response.session = {};
    response.session.tools = this.config.rendering_tools;   // Add these tools for the set function;
    response.session.id = cookies.id;
    response.session.uk = cookies.uk;
    response.session.url = store[cookies.id].host;
    response.session.cookies = [];
    response.session.genExpirationDate = session.prototype.genExpirationDate; 
    response.session.set = session.prototype.set;
    response.session.set( 'sid', JSON.stringify( { i: cookies.id, d: cookies.uk } ), { secure: true } );
    response.setSession = session.prototype.setSession;
    response.redirect = session.prototype.redirect;

    callback( request, response );
};


session.prototype.authenticateUser =  function( sid, unauth )
{
    if( !unauth )
    {
        console.log( sid + ' is already authenticated: ' + store[sid].authenticated );
        store[sid].authenticated = true;
        console.log( sid + ' is now authenticated: ' + store[sid].authenticated );
    }
    else
    {
        session.prototype.destroy( sid );
        console.log( sid + ' is now signed out.' );
    }
};


session.prototype.setUserAuthenticated = function( sid, unauth )
{
    if( !unauth )
    {
        console.log( 'Triggering userAuthenticated event and passing ' + sid + ', and FALSE, as arguments.' );
        eventEmitter.emit( 'userAuthenticated', sid, false );
    }
    else
    {
        console.log( 'Triggering userAuthenticated event and passing ' + sid + ', and TRUE, as arguments.' );
        eventEmitter.emit( 'userAuthenticated', sid, true );
    }
};


session.prototype.getCookies = function( request )
{
    // We start by splitting the string by ';'...the last one doesn't need to have one :)
    var cstring,
        cookies = {};
    if( request.headers.cookie )
    {
        //console.log( 'Theres cookies!: ' + request.headers.cookie );
        var cstring = request.headers.cookie.toString();
        cstring = cstring.split( ';' );
        
        // We have an array of strings, each with an =
        for( var key in cstring )
        {
            var i = cstring[key].split( '=' );
            if( i )
            {
                // Remove any leading spaces from the keys
                i[0] = i[0].replace( ' ', '' );
                
                // Now we have a single cookie key and value
                if( i[0] == 'sid' )
                {
                    var ids = JSON.parse( i[1] );
                    cookies.id = ids.i;
                    cookies.uk = ids.d;
                    //console.log( 'The SID = ' + cookies.id );
                    //console.log( 'The DIFFERENTIAL = ' + cookies.uk );
                }
                else
                {
                    cookies[i[0]] = i[1];
                }
                //console.log( 'Cookie: ' + i[0] + ', Val: ' + i[1] );
            }
        }
    }
    
    return cookies;
};




/**
 * Generates a GUID
 * 
 * @returns {String}
 * 
 * @since 0.0.1
 */
session.prototype.genId = function()
{   // Thank you Jeff Ward, for the performance, and the saved time! http://stackoverflow.com/a/21963136var d0 = Math.random()*0xffffffff|0;
    var d0 = Math.random()*0xffffffff|0;  
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    
    return  lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
            lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
            lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
            lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
};




session.prototype.isAuthenticated = function()
{
    console.log( 'authenticated: ' + this.session.client.id + ' - ' + store[this.session.client.id].authenticated );

    return store[this.session.client.id].authenticated;
};


/**
 * Generates a cookie expiration date string
 * 
 * @param days  Number of days the cookie should persist
 * 
 * @returns String
 * 
 * @since 0.0.1
 */
session.prototype.genExpirationDate = function( minutes )
{
    var d = new Date();
    d.setTime( d.getTime() + ( minutes * 60 * 1000 ) );
    
    return d.toUTCString();
};


/**
 * Starts the session service
 * 
 * @since 0.0.5-alpha
 */
session.prototype.start = function( options )
{
    // For now we will default the timer to every 5 minutes.
    timestamp = new Date();
    this.cleanup( ( 5*60*1000 ) );
};


/**
 * Sets a Data/session variable
 * 
 * @since 0.0.5-alpha
 */
session.prototype.set = function( name, value, options )
{
    var nk = this.tools,
    def =
    {
        host: this.url,
        path: '/',
        secure: false,
        expires: this.genExpirationDate( 30 )
    },
    o = nk.extend( options || {}, def );
    
    if( o.secure )
    {
        o.secure = 'HttpOnly';
    }
    
    if( name && value )
    {
        this.cookies.push( name + '=' + value + '; host=' + o.host + '; path=' + o.path + '; expires=' + o.expires + '; ' + o.secure );
        //console.log( 'Setting: ' + name + '=' + value + '; host=' + o.host + '; path=' + o.path + '; expires=' + o.expires + '; ' + o.secure );
        return true;
    }
    
    return false;
};


/**
 * Gets a Data/session variable
 * 
 * @since 0.0.5-alpha
 */
session.prototype.get = function( name, def )
{
    if( name )
    {
        if( this.cookies.hasOwnProperty( name ) )
        {
            return this.cookies[name];
        }
    }
    
    if( def )
    {
        return def;
    }
};


/**
 * Sets the sessions cookies
 * 
 * @since 0.0.5-alpha
 */
session.prototype.setSession = function()
{
    this.setHeader( 'Set-Cookie', this.session.cookies );
};


/**
 * Sends a redirect header to the client
 * 
 * @param path
 */
session.prototype.redirect = function( path )
{
    //this.method = 'HEAD';
    this.statusCode = 302;
    this.setSession();
    this.setHeader( 'Location', path );
    this.end( '<p>Please wait while we redirect you.</p>' );
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
            stamp = new Date( store[client].expires );
            if( ts > stamp  )
            {
                session.prototype.destroy( client );
            }
            
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
    this.uk = config.uk;
    this.host = config.host;
    this.path = config.path || '/';
    this.persistent = config.persistent || true;
    this.expires = config.expires;
    this.authenticated = config.authenticated || false;
};