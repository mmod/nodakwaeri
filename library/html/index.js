/**
 * package: nodakwaeri
 * sub-package: html
 * version: 0.1.1
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


/**
 * Defining the rendering tools component  (This is ugly, I was rushing it is going to be fixed before the project is removed from pre-release)
 *
 * @since 0.0.1
 */
module.exports = exports = html;

function html( config )
{
	html.prototype.nk = config;
};

html.prototype._classmap =
{
	label: "col-md-2 control-label",
	textbox: "form-control",
	password: "form-control",
	textarea: "form-control",
	select: "form-control",
	multiselect: "form-control",
	checkbox: "",
	slider: "form-control",
	radio: "form-control",
	button: "btn ",
	submit: "btn ",
	validationmessage: ""
};

html.prototype._version = function()
{
	return String( "0.0.5-alpha" );
};

html.prototype.generate = function ( t, a1, a2 )
{
	var args = {};
	
	// Check if we're using model/non-plain-text values
	if( html.prototype.nk.type( a1 ) === 'array' )
	{
		if( a1[0] === false )
		{
			args['id'] = a1[1];
			args['npt'] = false;
		}
		else
		{
			args['id'] = a1[0];
			args['npt'] = a1[1];
		}
	}
	else
	{
		args['id'] = a1;
		args['npt'] = false;
	}
	
	if( a2 !== undefined )
	{
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( t, args );
};

html.prototype.construct = function( t, a )
{
	// Prep
	var def = 
	{
		id: a.id || "",
		name: a.name || a.id || "",
		rows: 10,
		cols: 50,
		value: "",
		placeholder: "Enter value",
		checked: false,
		classes: html.prototype._classmap[t],
		index: 0,
		val: false,
		valmsg: "Error"
	},
	o = "";
	
	a = html.prototype.nk.extend( a, def );
	
	switch( t )
	{
		case 'label':
		{
			if( a.npt !== false )
			{
				if( a.npt.hasOwnProperty( 'schema' ) )
				{	// Were using a model schema
					a.value = a.npt.schema[a.id][2];
				}
				else
				{	// Were using a viewbag value
					a.value = a.npt;
				}
			}
			else
			{	// Were using the id as the value
				//console.log( 'No Schema [' + a.id + ']' );
				a.value = a.id;
			}
			
			//console.log( 'Label' );
			o = '<label class="' + a["classes"] + '" for="' + a["id"] + '">' + a.value + '</label>\n';
		}break;
		
		case 'textbox':
		case 'password':
		case 'submit':
		{
			if( a.npt !== false )
			{
				a.value = a.npt;
			}
			else
			{
				a.value = a.id;
			}
			//console.log( 'Text or Password or Submit Input Type' );
			if( !a["val"] )
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '">\n';
			}
			{
				var tclass = "";
				if( t === 'password' )
				{
					tclass = " valid";
					a.value = "";
				}
				o = '<input type="' + t + '" class="' + a["classes"] + tclass + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';
			}
		}break;
		
		case 'textarea':
		{
			if( a.npt !== false )
			{
				a.value = a.npt;
			}
			else
			{
				a.value = a.id;
			}
			if( !a["val"] )
			{
				o = '<textarea class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" rows="' + a["rows"] +'" cols="' + a["cols"] +'" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '">\n';
			}
			else
			{
				o = '<textarea class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" rows="' + a["rows"] +'" cols="' + a["cols"] +'" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';
			}
		}break;
		
		case 'select':
		{
			if( !a["val"] )
			{
				o = '<select class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '">\n';
				
				for( var option in a.npt )
				{
					o += '<option value="' + option + '">' + a.npt[option] + '</a>\n';
				}
				
				o += '</select>\n';
			}
			else
			{
				o = '<select class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';
				
				for( var option in a.npt )
				{
					o += '<option value="' + option + '">' + a.npt[option] + '</a>\n';
				}
				
				o += '</select>\n';
			}
		}break;
		
		case 'multiselect':
		{
			o = '<div class="' + a['classes'] + ' nk-select" role="combobox" tabindex="' + a["index"] + '" aria-haspopup="true">\n' +
		            '<div class="current">\n' +
		                'Select a value..\n' +
		            '</div>\n' +
		            '<div class="list-container">\n' +
		            	'<ol id="selectable" class="list">\n';
		            	
			for( var option in a.npt )
			{
				o += 		'<li class="ui-widget-content">' + option + '</li>\n';
			}
		     
			o +=		'</ol>\n' +
		            '</div>' +
		        '</div>' +
		        '<div class="tooltip" >' +
		            'Select' +
		        '</div>';
		}break;
		
		case 'button':
		{
			if( a.npt !== false )
			{
				a.value = a.npt;
			}
			else
			{
				a.value = a.id;
			}
			o = '<button id="' + a["id"] + '" class="' + a["classes"] + '" tabindex="' + a["index"] + '" aria-haspopup="false">"' + a["value"] + '</button>\n';
		}break;
		
		case 'checkbox':
		case 'radio':
		{
			if( a.npt !== false )
			{
				if( t === 'radio' )
				{
					// A radio is usually in a group of other radios, the values could be numeric or textual, and expand beyond a simple true false for the group.
					a.value = a.npt;
				}
				else
				{
					// Checkbox only needs to be 0 or 1, because the name is essentially the only textual value we need
					a.value = 1;
				}
			}
			else
			{
				if( t === 'radio' )
				{
					a.value = a.id;
				}
				else
				{
					a.value = 1;
				}
			}
			
			//console.log( 'Checkbox' );
			var checked = "";
			if( a["checked"] !== false )
			{
				checked = 'checked="checked"';
			}
			
			if( !a["val"] )
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a.value + '" ' + checked + '>\n';
			}
			else
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a.value + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '" ' + checked + '>\n';
			}
		}break;
		
		case 'validationmessage':
		{
			o = '<span class="field-validation-valid" data-valmsg-for="' + a["id"] + '" data-valmsg-replace="' + a["val"] +'"></span>\n';
		}break;
		
		default:
		{
			o = "default";
		}break;
	}
	
	return String( o );
};
