# nodakwaeri

Kwaeri for Node.js


## Installation

To Install nodakwaeri, use npm as shown below in either terminal/shell or command prompt.  Be sure to have Node.js and Git installed, with the latter's root directory in your systems environment path.

```
path_to_app/> npm install nk
```

If all went well, then you can use it inside of any node application:

```node
var piece = "Try me now mofo.";
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


### Boot-Strappage

nodakwaeri also provides all of the facilities one might need to create an application.  This includes:

Factory | Purpose
--------|--------
Server  | Defines and initialises the http server, listening for incoming client connections.  Utilizes the session and router factories.
Session | Creates and manages all client sessions to provide persistence for the end user.
Router  | Detects and processes media requests from the browser and/or routes client requests to the proper controller for further processing.
Controller | Implements the MVC programming model.  Invokes the derived controller requested. Developers define the application's controllers.
Renderer | Implements the MVC programming model.  Constructs XHTML for the response to the client, provides a fully featured scripting language for templating, and allows for shared layouts and powerful organization.  Developers define the application's views.
HTML | Provides tools for generating HTML controls.

The easiest way by far to boot-strap nodakwaeri, involves creating a config file in the root of your application, and then passing it to the constructor for nk:

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
	 	router: new nk.router()
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

Take a look at [nk-mvc](http://www.github.com/mmod/nk-mvc/blob/master/config.js) to see an example of the config.js file (a copy of it with values replaced by you would suffice), as well as for a more finished example of using nodakwaeri for creating an application.  Browsing through the source will also provide additional details for customizing the toolset(s) and more.