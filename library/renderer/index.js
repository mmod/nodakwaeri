/**
 * package: nodakwaeri
 * sub-package: renderer
 * version:  0.0.2
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps;
var fs = require( 'fs' );

/**
 * Layout processor
 *
 * @since 0.0.1
 */
module.exports = exports = renderer;

function renderer( rendering_tools, view_path )
{
	this.nk = rendering_tools;
	this.rendering_tools = new this.nk.html( this.nk );
	this.view_path = view_path;
	this.date = new Date();
};

renderer.prototype.construct = function( request, response, klay )
{
	// We would normally invoke the nodaklay module, and use the Pottr to construct our layout.  For now we will use a JS
	// version in order to help spur on development.
	var view_path = this.view_path;
	var processor = this;
	
	//console.log( 'Rendering tools: ' + this.rendering_tools );
	//console.log( 'View path: ' + this.view_path );
	
	//for( var prop in klay )
	//{
	//	console.log( 'Prop: ' + prop );
	//}
	
	// Construct will check if there is a layout specified, and invoke parse accordingly.
	if( klay.layout !== false )
	{
		fs.readFile
		( 
				view_path + '/' + klay.layout + '.kml', 
				'utf8', 
				function( error, ldata )
				{
					var buffer;
					
					// If there is an error
					if( error )
					{
						// Log it
						console.log( 'Error reading layout: ' + klay.layout + '.' );
						
						// And set content to contain an error message
						buffer = "<html><head><title>Failure</title></head><body><h1>Too Bad...</h1><p>There was an issue loading the requested layout!</p></body></html>";
						
						response.writeHead
						(
								200,
								{ 'Content-Type': 'text/html' }
						);
						
						response.write
						(
							buffer
						);
						
						response.end();
					}
					else
					{
						// Success
						fs.readFile
						(
								view_path + '/' + klay.controller + '/' + klay.view + '.kml',
								'utf8',
								function( error, vdata )
								{
									var buffer;
									
									if( error )
									{
										// Log it
										console.log( 'Error reading view, ' + this.view_path + '/' + klay.controller + '/' + klay.view + '.kml' );
										
										// And set content to contain an error message
										buffer = "<html><head><title>Failure</title></head><body><h1>Too Bad???...</h1><p>There was an issue loading the requested view!</p></body></html>"; 
										
										response.writeHead
										(
												200,
												{ 'Content-Type': 'text/html' }
										);
										
										response.write
										(
											buffer
										);
										
										response.end();
									}
									else
									{
										//var pottr = nodakwaeri.klay();
										//pottr.turn( request, response, klay );
										klay.layout = ldata;
										klay.view = vdata;
										processor.parse( request, response, klay ); 
									}
								}
						);
					}
				}
		);
	}else
	{
		fs.readFile
		(
			view_path + '/' + klay.controller + '/' + klay.view + '.kml',
			'utf8',
			function( error, data )
			{
				var buffer;
				
				if( error )
				{
					// Log it
					console.log( 'Error reading view' );
					
					// And set content to contain an error message
					buffer = "<html><head><title>Failure</title></head><body><h1>Too Bad!!!!...</h1><p>There was an issue loading the requested view: " + error + "\n" + data +"</p></body></html>";
					
					response.writeHead
					(
							200,
							{ 'Content-Type': 'text/html' }
					);
					
					response.write
					(
						buffer
					);
					
					response.end();
				}
				else
				{
					klay.layout = false;
					klay.view = data;
					processor.parse( request, response, klay );
				}
			}
		);
	}
}; 

renderer.prototype.parse = function( request, response, klay )
{
	// First let's prepare the body content; there may not be a layout, but if there is we need the body first.
	var processor = this;
	var body = klay.view;
	body = body
	.replace // First strip all comments
	(	/((\/\/[a-zA-Z0-9\s\t]*)\n|(\/\*(.*)\*\/))*/mg,
		function( match, shallow, deep, deeper )
		{
			//console.log( 'Match: \n' + match + '\n' + shallow + '\n' + deep + '\n' + deeper + '\n' );
			return "";
		}
	) // Then replace the subscripts with the content the subscripts represent (be it a partial view, or output of a method, or model, etc)
	.replace // Now we parse through the subscript blocks and invoke any members and replace any variables
	( 	/(\[\[[\s\t\r\n]*(([a-zA-Z0-9_]*)((\.([a-zA-Z0-9_]*))*(\((.*)\))?)*)[\s\t\r\n]*\]\])/mg, 
		function( match, subscript, codeflow, fof, memflow, memstring, member, argflow, args )
		{
			//console.log( '\nMatch: \'' + match + '\' Subscript \'' + subscript + '\' Code-flow: \'' + codeflow + '\' Factory/Function: \'' + fof + 
			//				'\' Member-flow: ' + memflow + ' Member-string: ' + memstring + ' Member: ' + member + ' Args-flow: ' + argflow +' Args: ' + args + '.' );
			if( fof == 'html' )
			{
				//console.log( args );
				return processor.decorate( fof, args, klay, memstring );
			}
			
			return processor.decorate( codeflow, codeflow, klay );
		}
	);
	
	// If a layout was requested, let's prep it
	if( klay.layout !== false )
	{
		klay.view = body;
		var view = klay.layout;
		view = view
		.replace // First strip all comments
		(	/((\/\/[a-zA-Z0-9\s\t]*)\n|(\/\*(.*)\*\/))*/mg,
			function( match, shallow, deep, deeper )
			{
				//console.log( 'Match: \n' + match + '\n' + shallow + '\n' + deep + '\n' + deeper + '\n' );
				return "";
			}
		)
		.replace // Now we parse through the subscript blocks and invoke any members and replace any variables
		( 	/(\[\[[\s\t\r\n]*(([a-zA-Z0-9_]*)((\.([a-zA-Z0-9_]*))*(\((.*)\))?)*)[\s\t\r\n]*\]\])/mg,  
			function( match, subscript, codeflow, fof, memflow, memstring, member, argflow, args )
			{
				//console.log( 'Match: \'' + match + '\' Subscript \'' + subscript + '\' Code-flow: \'' + codeflow + ' Factory/Function: \'' + fof + 
				//				'\' Member-flow: ' + memflow + ' Member-string: ' + memstring + ' Member: ' + member + ' Args-flow: ' + argflow +' Args: ' + args + '.' );
				if( fof == 'html' )
				{
					return processor.decorate( fof, codeflow, klay, memstring );
				}
				
				return processor.decorate( codeflow, codeflow, klay );
			}
		);
		
		response.writeHead
		(
			200,
			{ 'Content-Type': 'text/html' }
		);
		
		response.write
		(
			view
		);
		
		response.end();
	}
		
	response.writeHead
	(
		200,
		{ 'Content-Type': 'text/html' }
	);
	
	response.write
	(
		body
	);
	
	response.end();
};

/**
 * Returns the result of a subscript
 */
renderer.prototype.decorate = function( fof, args, klay, memstring )
{
	var processor = this;
	
	// Returns the output of the subscript
	switch( fof )
	{
		case 'test':
		{
			return 'Test replacement worked!';
		}break;
		
		case 'title':
		{
			return klay.title;
		}break;
		
		case 'pagetitle':
		{
			return klay.pagetitle;
		}break;
		
		case 'body':
		{
			return klay.view;
		}break;
		
		case 'date.year':
		{
			return this.date.getFullYear();
		}break;
		
		case 'html':
		{
			var subscript = args;
			//console.log( args );
			var rargs = {};
			var control = 0;
			subscript = subscript
			.replace
			(	/(((([a-zA-Z0-9_]*)(\.([a-zA-Z0-9_]*))*(\((.*)\))?[\}]?)|([\{](.*)\}))[\,]?)*/mg,
				function( match, match2, match3, noobjarg, method, memflow, member, argflow, argstring, objarg, objcontents  )
				{
					if( match3 !== ( undefined ) )
					{
						//console.log( 'Found: ' + match3 );
						rargs[control] = match3;
						control++;
					}
					return "";
				}
			);
			
			// The memstring contained .<whatever members were present after html>, let's split it
			var members = memstring.split( '.' );
			var rendering_tools = processor.rendering_tools;
			var requested_method = false;
			
			// Don't forget that the first array element will be empty!
			requested_method = rendering_tools[members[1]];
			
			// It must be a function, all objects accessible within the renderign tools are functions to be utilized
			if( this.nk.type( requested_method ) === 'function' )
			{
				if( ( rargs[0] && rargs[1] ) !== undefined )
				{	// Two args provided, parse second argument as a JSON string representation of an object
					rargs[1] = JSON.parse( rargs[1] );
					subscript = requested_method( rargs[0], rargs[1] );
				}
				else if( rargs[0] !== undefined )
				{	// One arg provided
					subscript = requested_method( rargs[0] );
				}
				else
				{	// No args provided
					subscript = requested_method();
				}
			}
			else
			{
				// There just weren't any members which matched
				console.log( 'Error: Invalid script `html.' + members[1] + '`.' );
				subscript = "";
			}
			
			// The following snippet displays the methods that are parsed
			var rstring = ""; 
			for( var prop in rargs )
			{
				if( prop == 0 )
				{
					rstring += rargs[prop];
				}
				else
				{
					rstring += ', ' + rargs[prop];
				}
			}
			//console.log( 'Method to run: \n' + fof + memstring + '\nArgs to pass: ' + rstring );
			
			// Now that we have our method and our arguments, we can actually invoke them.  With HTML factory, any second argument is an object of optional paramters.
			// The first argument likely references any objects that the method should target (such as a model).
			
			//console.log( requested_method );
			//requested_method( rargs[0], rargs[1] );
			return String( subscript );
		}
		
		default:
		{
			if( klay[match] !== ( null || undefined ) )
			{
				return klay[match];
			}
			
			return 'Error: Invalid script: \`' + match + '\`.';
		}break;
	}
	
	return 'Too bad...';
};