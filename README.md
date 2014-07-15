# nodakwaeri (nk)

A simple, yet powerful, and fully-featured cross-platform application framework for Node.js.


## Installation

Unless you are only planning on using a few pieces of nodakwaeri and intend to use custom facilities, it's recommended that you install nodakwaeri via the nk-mvc project template.  There is more in-depth documentation available for [nk-mvc](http://www.github.com/mmod/nk-mvc/) which covers all aspects of the framework, and provides an excellent starting place for any nodakwaeri application. 


To install the nodakwaeri module without the project template, use npm as shown below in either terminal/shell or command prompt.  Be sure to have Node.js and Git installed, with the latter's root directory in your systems environment path.

```
path_to_app/> npm install nk
```

If all went well, then you can use it inside of any node application:

```node
var nk = require( 'nk' );
nk = new nk();
...
```


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

When extending objects and/or arrays, be aware that both variables must be of the same type; either objects or arrays, respectively.  This could change in the future, but probably not for a while anyways.

Consider the following code snippet:

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


### Iterating variables

It's not wholly complete, but one of our jQuery favorites is an absolute must:

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


### Boot-Strapped

nodakwaeri also provides all of the facilities one might need to create an application.  This includes:

Factory | Purpose
--------|--------
Server  | Defines and initialises the http server, listening for incoming client connections.  Utilizes the session and router factories.
Session | Creates and manages all client sessions to provide persistence for the end user.
Router  | Detects and processes media requests from the browser and/or routes client requests to the proper controller for further processing.
Cryptography | nodakwaeri is bootstrapped with [The Stanford Javascript Crypto Library](http://crypto.stanford.edu/sjcl/), via their [BSD License](https://github.com/bitwiseshiftleft/sjcl/blob/master/README/bsd.txt).
Controller | Implements the MVC design pattern.  Invokes the derived controller requested. Developers define the application's controllers.
Model | Implements the MVC design pattern.  Provides the interface to the data integration tools and database object.  Developers define the application's models.
Renderer | Implements the MVC design pattern.  Constructs XHTML for the response to the client, provides a fully featured scripting language for templating, and allows for shared layouts and powerful organization.  Developers define the application's views.
HTML | Provides tools for generating commonly used HTML5 controls in Accessible Rich Internet Applications (ARIA).

<i>As a side note, by default nk-mvc makes uses of nodamysql ([nk-mysql](https://github.com/mmod/nodamysql)) as a database provider, and the included template uses Bootstrap(which includes Normalize) and jQuery via CDN.</i>

nodakwaeri is designed to work out of the box using a config file from the root of your application:

```node
var nk = require( 'nk' ),
config = require( './config' ),
app = new nk( config );

app.init();
// Your application is now running...
```

As opposed to something like the following:

```node
...
app.init
(
	{	
	 	routes: <routes_configuration>,							// OR
	 	router: new nk.router(),
	 	db_provider: <your custom provider>,
	 	controller_path: __dirname + '/app/controllers',		// OR
		controller_provider: new nk.controller( { 'controller_path': __dirname + '/app/controllers' } ),
		model_path: __dirname + '/app/models',					// OR
		model_provider: new nk.model( { 'model_path': __dirname + '/app/models' } ),
		view_path: __dirname + '/app/views',					// OR	
		view_provider: new nodaklay.pottr( { 'view_path': __dirname + '/app/views' } ),
		asset_path: __dirname + '/assets'	
	}
);
// Your application is now running...
```

Take a look at [nk-mvc](http://www.github.com/mmod/nk-mvc/blob/master/config.js) to see an example of the config.js file (a copy of it with values replaced by you would suffice).


## Development

Feel free to fork the repository and submit pull requests. Browse any of our other repositories as well http://github.com/mmod.


### Created with:

[Eclipse Kepler](https://www.eclipse.org/downloads/)

[Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))

[Node.js](http://nodejs.org)