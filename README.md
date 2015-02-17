# nodakwaeri ( nk v0.3.1 )

A simple, yet powerful, and fully-featured cross-platform application framework for Node.js.


## Installation

Unless you are only planning on using a few pieces of nodakwaeri and intend to use custom facilities, it's recommended that you install nodakwaeri via the nk-mvc or nk-xrm project template.  There is more in-depth documentation available for [nk-mvc](http://www.github.com/mmod/nk-mvc/) which covers all aspects of the framework, and provides an excellent starting place for any nodakwaeri application. The [nk-xrm](http://www.github.com/mmod/nk-xrm/) repository may also provide more advanced resources, examples, and documentation for working with nodakwaeri as progress is made.  


To install the nodakwaeri module, use npm as shown below in either terminal/shell or command prompt.  Be sure to have Node.js and Git installed, with the latter's root directory in your systems environment path.

```
path_to_app/> npm install nk
```

If all went well, then you can use it inside of any node application:

```node
var nk = require( 'nk' );
nk = new nk();
...
```

<i>NOTE: When you do not pass a configuration to the constructor, the resulting object instance only contains the tools (.type, .extend, .each, .hash, .sjcl, etc.)</i>


## Usage

Below describes some general usage of nodakwaeri.  Browsing the source will also prove to be a good way to get to know the nk toolset.


### Checking the type of a variable

When one desires to check the type of a variable, consider the following snippet:

```node
...
if( nk.type( obj ) !== 'function' )
{
    // Do what you will
} 
...
```


### Extending objects and/or arrays

When extending objects and/or arrays, they can be of either type. Default behaviors occur when extending like types.

Objects:

```node
var obj1 = { 'First': 1, 'Second': 2, 'Fourth': 4 };
var piece3 = { 'Third': 3 };

obj1 = nk.extend( obj1, piece3 );

for( var prop in obj1 )
{
    console.log( 'Key:' + prop + ', Value: ' + obj1[prop] + '.' );
}
```

When executed in node.js it should output:

```
/> Key: First, Value: 1.
/> Key: Second, Value: 2.
/> Key: Fourth, Value: 4.
/> Key: Third, Value: 3.
```

Arrays:

```node
var arr1 = [ 1, 2, 4 ];
var piece3 = [ 3 ];

arr1 = nk.extend( arr1, piece3 );

for( var prop in arr1 )
{
    console.log( 'Key:' + prop + ', Value: ' + arr1[prop] + '.' );
}
```

When executed in node.js it should output:

```
/> Key: 0, Value: 1.
/> Key: 1, Value: 2.
/> Key: 2, Value: 4.
/> Key: 3, Value: 3.
```

When we wish to extend an array with an object, the default behavior is the same as when we extend an array with an array.  However, if we pass `false` as a third argument to the `extend()` method we can get nk to act as if we are extending default values onto an object:

Arrays with Objects (Non-default):

```node
var arr1 = [ 1, 2, 4 };
var piece3 = { '3': 3 };

arr1 = nk.extend( arr1, piece3, false );

for( var prop in arr1 )
{
    console.log( 'Key:' + prop + ', Value: ' + obj1[prop] + '.' );
}
```

When executed in node.js it should output:

```
/> Key: 0, Value: 1.
/> Key: 1, Value: 2.
/> Key: 2, Value: 4.
/> Key: 3, Value: 3.
```

As is typical with extending objects, had the object's property name been 0, 1, or 2, it would not have over-written the existing element's value.

Extending an Object with an array works the same as the above, but has no 'non-default' behavior:

```node
var obj1 = { 'First': 1, 'Second': 2, 'Fourth': 4 };
var piece3 = [ 3 ];

obj1 = nk.extend( obj1, piece3 );

for( var prop in obj1 )
{
    console.log( 'Key:' + prop + ', Value: ' + obj1[prop] + '.' );
}
```

When executed in node.js it should output:

```
/> Key: First, Value: 1.
/> Key: Second, Value: 2.
/> Key: Fourth, Value: 4.
/> Key: 0, Value: 3.
```

And of course, had obj1 already contained a property named 0, it would not have been over-written.


### Iterating variables

One of our jQuery favorites is an absolute must:

```node
var obj1 = { 'First': 1, 'Second': 2, 'Fourth': 4 };
var piece3 = { 'Third': 3 };

obj1 = nk.extend( obj1, piece3 );

nk.each
(
    obj1,
    function( k, v )
    {
        console.log( 'Key:' + k + ', Value: ' + v + '.' );
    } 
);
```

Which of course, when executed in node.js, should output:

```
/> Key: First, Value: 1.
/> Key: Second, Value: 2.
/> Key: Fourth, Value: 4.
/> Key: Third, Value: 3.
```

You are able to pass 0, 1, or 2 arguments.  
 * For 0 your callback will be called and no arguments passed. 
 * For 1 your callback will be called and passed the value of the iterator's property/index only.
 * For 2 your callback will be called and passed both the key and value of the iterator's property/index.


### Boot-Strapped

nodakwaeri also provides all of the facilities one might need to create an application.  This includes:

Factory | Purpose
--------|--------
Server  | Defines and initialises the http server, listening for incoming client connections.  Utilizes the session and router factories.
Session | Creates and manages all client sessions to provide persistence for the end user.  Protects against 'Session Take-over' and 'Session Injection' techniques.  Provides tools to the developer for manipulating the session.
Router  | Detects and processes media requests from the browser and/or routes client requests to the proper controller for further processing.
SCJL (Cryptography) | nodakwaeri is bootstrapped with [The Stanford Javascript Crypto Library](http://crypto.stanford.edu/sjcl/), via their [BSD License](https://github.com/bitwiseshiftleft/sjcl/blob/master/README/bsd.txt).
Controller | Implements the MVC design pattern.  Invokes the derived controller requested. Developers define the application's controllers.
Model | Implements the MVC design pattern.  Provides the interface to the data integration tools and database object.  Developers define the application's models.
Renderer | Implements the MVC design pattern.  Constructs XHTML for the response to the client, provides a fully featured scripting language for templating, and allows for shared layouts and powerful organization.  Developers define the application's views.
HTML | Provides tools for generating commonly used HTML5 controls in Accessible Rich Internet Applications (ARIA).

<i>As a side note, by default nk-mvc makes uses of nodamysql ([nk-mysql](https://github.com/mmod/nodamysql)) as a database provider, and uses Bootstrap(which includes Normalize) and jQuery via CDN.</i>

nodakwaeri is designed to work out of the box using a config file from the root of your application:

```node
var nk = require( 'nk' ),
config = require( './config' ),
app = new nk( config );

app.init();
// Your application is now running...
```

Take a look at [nk-mvc](http://www.github.com/mmod/nk-mvc/blob/master/config.js) to see an example of the config.js file (a copy of it with values replaced by you would suffice).


## Development

Feel free to fork the repository and submit pull requests. Browse any of our other repositories as well http://github.com/mmod.


### Created with:

[Eclipse Luna](https://www.eclipse.org/downloads/)

[Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))

[Node.js](http://nodejs.org)