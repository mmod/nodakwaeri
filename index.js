/**
 * package: nodakwaeri
 * version: 0.3.1
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var http = require( 'http' ),
    env = process.env.NODE_ENV,
    argv;

if( env === ( "" || null ) )
{
    env = "development";
}

// See if admin argument is passed, if so set the proper variables for usage within the framework
if( process.argv.length > 2 )
{
    argv = [];
    var index = 0;
    for( var i = 2; i < process.argv.length; i++ )
    {
        argv[index] = process.argv[i];
    }
}


// Entry point to the NodaKwaeri module
function nk( config )
{
    na = this;

    if( config )
    {
        // Set up dev or production environment
        this.config = config[env];
        this.config.debug = ( env === "development" ) ? true : false;

        // See if we are running the public or administrative application
        if( argv && argv.length > 0 )
        {
            this.admin = false;
            if( argv[0] === 'admin' )
            {
                this.admin = true;
                this.config.appType = 'admin';
            }
            else
            {
                this.config.appType = 'app';
            }
        }
        else
        {
            this.admin = false;
            this.config.appType = 'app';

            // Remove the admin paths from memory
            delete this.config.admin;
        }
    }
    else
    {
        //console.log( 'No config - loading core tools.' );
        for( var lib in this )
        {
            if( !na._coremap.hasOwnProperty( lib ) )
            {
                delete this.lib;
            }
        }
    }
};


// Component version string
nk.prototype._versionmap =
{
    "nodakwaeri": "0.2.4"
};


// Object class to class type mapping
nk.prototype._classmap =
{
    // List of types
    "[object Boolean]":     "boolean",
    "[object Number]":      "number",
    "[object String]":      "string",
    "[object Function]":    "function",
    "[object Array]":       "array",
    "[object Date]":        "date",
    "[object RegExp]":      "regexp",
    "[object Object]":      "object"
};

// Core facility mapping
nk.prototype._coremap =
{
    "nk":   true,
    "_versionmap": true,
    "_classmap": true,
    "_coremap": true,
    "version": true,
    "type": true,
    "extend": true,
    "each": true,
    "sjcl": true,
    "hash": true,
    "html": true
}

/**
 * Gets the current NodaKwaeri Version
 *
 * @returns string      The NodaKwaeri version string
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
 * @param entity    object      The object to check the instance type of
 *
 * @returns string  The instance type of the object class
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
 * @param a     object      Object being extended
 * @param b     object      Object which keys and values are taken to extend another object
 * @param def   bool        Determines if (true)object will be added to or (false)extended as an object in the case that (a) and (b) do not match in type
 *
 * @returns object  a, extended by b
 */
nk.prototype.extend = function( a, b, def )
{   // Default to true
    if( !def && def !== false || def === true )
    {
        def = true;
    }
    else
    {
        def = false;
    }

    var tA = this.type( a ), tB = this.type( b );

    if( tA === tB )
    {   // Both types are alike
        if( tA === 'array' )
        {   // And both arrays
            var alength = a.length + 1;
            for( var i = 0; i < b.length; i++ )
            {
                a[alength] = b[i];
                alength++;
            }
        }
        else
        {   // And both objects
            for( var property in b )
            {
                if( !a.hasOwnProperty( property ) )
                {
                    a[property] = b[property];
                }
            }
        }
    }
    else
    {   // Otherwise
        if( tA === 'array' )
        {   // We're extending an array with an object
            if( !def )
            {
                for( var property in b )
                {
                    if( IsNumeric( property ) )
                    {
                        if( !a[property] )
                        {
                            a[property] = b[property];
                        }
                    }
                }
            }else
            {
                var alength = a.length + 1;
                for( var property in b )
                {
                    a[alength] = b[property];
                    alength++;
                }
            }
        }
        else
        {   // We're extending an object with an array
            for( var i = 0; i < b.length; i++ )
            {
                if( !a.hasOwnProperty( i ) )
                {
                    a[i] = b[i]
                }
            }
        }
    }

    // Regardless of how we got here, return a
    return a;
};


/**
 * Executes a supplied method for each member of a supplied object or array
 *
 * @param o     object      An array or object to be iterated over
 * @param f     function    A function to execute in each iteration
 *
 * @returns {Boolean}   True if processed, false if invalid arguments supplied
 */
nk.prototype.each = function( o, f )
{
    // Ensure the second argument is a function
    if( this.type( f ) === "function" )
    {   // Get the number of arguments expected
        var nargs = f.length;

        // Determine the type of the supplied object
        switch( this.type( o ) )
        {
            case "array":
            {
                // Iterate over the array
                for( var i = 0; i < o.length; i++ )
                {
                    // Provide the index as the key to the provided function
                    if( nargs > 1 )
                    {   // Send the key and value
                        f( i, o[i] );
                    }
                    else if( nargs === 1 )
                    {   // Send only the value
                        f( o[i] );
                    }
                    else
                    {
                        f();
                    }
                }
            }break;

            case "object":
            {
                // Iterate over the objects properties
                for( var p in o )
                {
                    // Supply the property name as the key to the provided function
                    if( nargs > 1 )
                    {   // Send the key and value
                        f( p, o[p] );
                    }
                    else if( nargs === 1 )
                    {   // Send only the value
                        f( o[p] );
                    }
                    else
                    {
                        f();
                    }
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


/**
 * Hashes a given password using the supplied salt
 *
 * @param args Object   Defines the arguments for the method
 *  @var data String        Defines the string to be hashed
 *  @var salt String        Defines a 128, 192, or 256 bit(s) string to derive a salt from
 *  @var iterations Int     ( Optional ) Defines the number of iterations; Key stretching
 *  @var keySize Int        Controls how the method will interpret the salt argument
 *
 * @returns String()    Securely hashed data.
 *
 * @since 0.2.0
 */
nk.prototype.hash = function( args )
{
    var na = this,
        def = { data: 'password', salt: false, iterations: 100, keySize: 256 },
        o = this.extend( args || {}, def );

    // Courtesy of: https://jswebcrypto.azurewebsites.net/demo.html#/pbkdf2
    var hmacSHA256 = function( key )
    {
        var hasher = new na.sjcl.misc.hmac( key, na.sjcl.hash.sha256 );
        this.encrypt = function()
        {
            return hasher.encrypt.apply( hasher, arguments );
        };
    };

    if( !o.salt )
    {
        o.salt = "fff9a94e51b5aa416ff4c42a2e3c754447f3c78cb4f7da9226a63672e15bf00e";
    }

    var salt = this.sjcl.codec.hex.toBits( o.salt ),
        derived = this.sjcl.misc.pbkdf2( o.data, salt, o.iterations, o.keySize, hmacSHA256 );

    return this.sjcl.codec.hex.fromBits( derived );
};


/**
 * Starts the application
 *
 * @param o
 */
nk.prototype.init = function( o )
{
    var na = this,
        nnk = new nk(),
        appType = this.config.appType;

    // Set the defaults for those who wish to use NodaKwaeri to its
    // fullest, and invoke this method supplying only the necessary paths
    var defaults =
    {
        sessn: 'nk',
        routr: 'nk',
        ctrlr: 'nk',
        dbdvr: 'nk',
        modl: 'nk',
        vew: 'nk'
    };
    o = this.extend( o || {}, defaults );

    // Make sure the paths were provided, they have to be because of the fact that __dirname in this
    // file will not point to the proper directories for the application being created using this
    // framework
    if( this.admin )
    {
        if( !this.config.admin.controller_path || !this.config.admin.model_path || !this.config.admin.view_path || !this.config.admin.asset_path )
        {
            console.error( 'Administrative MVC and Asset paths must be set for administrative application');

            throw( 'MVC and Asset paths must be set.' );
        }
    }
    else
    {
        if( !this.config.app.controller_path || !this.config.app.model_path || !this.config.app.view_path || !this.config.app.asset_path  )
        {
            console.error( 'MVC and Asset paths must be set.' );

            throw ( 'MVC and Asset paths must be set.' );
        }
    }

    // If a custom session provider wasn't specified, deploy the built in session provider
    if( o.sessn === 'nk' )
    {
        o.sessn = this.session;
        console.log( 'Loading nk.session' );
    }

    // If a custom router wasn't provided, deploy the built in router
    if( o.routr === 'nk' )
    {
        o.routr = this.router;
        console.log( 'Loading nk.router' );
    }

    // If a custom database provider wasn't provided, deploy the built in driver
    if( o.dbdvr === 'nk' )
    {
        o.dbdvr = require( 'nk-mysql' );
        console.log( 'Loading nk-mysql' );
    }

    // If a custom model provider wasn't provided, deploy the built in facility
    if( o.modl === 'nk' )
    {
        o.modl = new this.model( { dbdvr: o.dbdvr, database: this.config.database } );
        console.log( 'Loading nk.model' );
    }

    // If a custom renderer wasn't provided, add renderer_tools to the configuration
    if( o.vew === 'nk' )
    {

        // If custom rendering_tools was not provided in the configuration, add it
        if( !o.hasOwnProperty( 'rtools' ) )
        {
            o.rtools = nnk;
            console.log( 'Loading nk.html' );
        }
        else
        {
            // Otherwise make sure it's an object, and then extend it to make sure all ends are covered in case of missing components
            if( this.type( o.rtools ) !== ( 'object' ) )
            {
                o.rtools = nnk;
                console.log( 'Replacing custom rtools with nk.html' );
            }
            else
            {
                o.rtools = this.extend( o.rtools, new nnk.html( nnk ) );
                console.log( 'Loading nk.html' );
            }
        }

        // Now instantiate the renderer passing in the configuration
        o.vew = new this.renderer( o.rtools, this.config[appType].view_path );
    }

    // If a custom controller wasn't provided, deploy the built in controller initialized with the supplied controller path
    if( o.ctrlr === 'nk' )
    {
        o.ctrlr = new this.controller( { dpath: this.config[appType].controller_path, modl: o.modl, vew: o.vew } );
        console.log( 'Loading nk.controller' );

        // we can also delete the model_provider variable now as we won't need it
        delete o.modl;
        delete o.vew
    }

    // Let's update the configuration to handle dependencies further along the chain
    config = this.extend( this.config, o );

    // Initialize our server with the updated configuration
    var server = new this.server( config );
    server.start();
};


nk.prototype.sjcl = require( './library/sjcl/sjcl' );


nk.prototype.server = require( "./library/server" );


nk.prototype.session = require( "./library/session" );


nk.prototype.router = require( "./library/router" );


nk.prototype.controller = require( "./library/controller" );


nk.prototype.model = require( "./library/model" );


nk.prototype.renderer = require( "./library/renderer" );


nk.prototype.html = require( "./library/html" );


// Export
module.exports = exports = nk;