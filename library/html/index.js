/**
 * package: nodakwaeri
 * sub-package: html
 * version:  0.0.2
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


/**
 * Defining the rendering tools component
 *
 * @since 0.0.1
 */
module.exports = exports = html;

function html( config )
{
	html.prototype.nk = config;
};

html.prototype.version = function()
{
	return String( "0.0.1" );
};

html.prototype.label = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'label', args );
};

html.prototype.textbox = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'text', args );
};

html.prototype.password = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'password', args );
};

html.prototype.textarea = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'textarea', args );
};

html.prototype.select = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'select', args );
};

html.prototype.checkbox = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'checkbox', args );
};

html.prototype.radio = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'radio', args );
};

html.prototype.button = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'button', args );
};

html.prototype.submit = function( a1, a2 )
{
	var args = {};
	if( a2 !== undefined )
	{
		args['id'] = a1;
		html.prototype.nk.extend( args, a2 );
	}
	return html.prototype.construct( 'submit', args );
};

html.prototype.validationmessage = function( a1, a2 )
{
	var args = {};
	
	args['id'] = a1;
	if( a2 !== undefined )
	{
		html.prototype.nk.extend( args, a2 );
	}
	
	return html.prototype.construct( 'validationmessage', args );
};

html.prototype.construct = function( t, a )
{
	// Prep
	var classmap =
	{
		label: "col-md-2 control-label",
		text: "form-control",
		password: "form-control",
		textarea: "form-control",
		select: "form-control",
		"nk-select": "form-control",
		radio: "form-control",
		checkbox: "form-control",
		slider: "form-control",
		button: "btn ",
		submit: "btn ",
	},
	def = 
	{
		id: "",
		name: "",
		rows: 10,
		cols: 50,
		value: "",
		options: {
					option1: "Option 1",
					option2: "Option 2",
					option3: "option 3"
				 },
		checked: false,
		classes: classmap[t],
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
			//console.log( 'Label' );
			o = '<label class="' + a["classes"] + '" for="' + a["id"] + '">' + a["value"] + '</label>\n';
		}break;
		
		case 'text':
		case 'password':
		case 'submit':
		{
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
				}
				o = '<input type="' + t + '" class="' + a["classes"] + tclass + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';
			}
		}break;
		
		case 'textarea':
		{
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
				
				for( var option in a["options"] )
				{
					o += '<option value="' + a["options"][option] + '">' + option + '</a>\n';
				}
				
				o += '</select>\n';
			}
			else
			{
				o = '<select class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';
				
				for( var option in a["options"] )
				{
					o += '<option value="' + a["options"][option] + '">' + option + '</a>\n';
				}
				
				o += '</select>\n';
			}
		}break;
		
		case 'nk-select':
		{
			o = '<div class="' + a['classes'] + ' nk-select" role="combobox" tabindex="' + a["index"] + '" aria-haspopup="true">\n' +
		            '<div class="current">\n' +
		                'Select a value..\n' +
		            '</div>\n' +
		            '<div class="list-container">\n' +
		            	'<ol id="selectable" class="list">\n';
		            	
			for( var option in a["options"] )
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
			o = '<button id="' + a["id"] + '" class="' + a["classes"] + '" tabindex="' + a["index"] + '" aria-haspopup="false">"' + a["value"] + '</button>\n';
		}break;
		
		case 'checkbox':
		case 'radio':
		{
			//console.log( 'Checkbox' );
			var checked = "";
			if( a["checked"] !== false )
			{
				checked = 'checked="checked"';
			}
			
			if( !a["val"] )
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a["value"] + '" ' + checked + '>\n';
			}
			else
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '" ' + checked + '>\n';
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
