/**
 * package: nodakwaeri
 * subpackage: html.construct
 * version:  0.0.1
 * author:  Richard B. Winters <a href="mailto:rik@mmogp.com">rik At MassivelyModified</a>
 * copyright: 2013-2014 Richard B. Winters
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */

// Deps


/**
 * Constructs an html form element
 * 
 * @param string	t		The type of html form element to create
 * @param object	a		method arguments
 * 							
 *
 * @since 0.0.1
 */
module.exports = exports = construct;

= function( t, a )
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
		name: def["id"],
		rows: 10,
		cols: 50,
		value: def["name"],
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
	
	a = nodakwaeri.extend( a, def );
	
	switch( t )
	{
		case 'label':
		{
			o = '<label class="' + a["classes"] + '" for="' + a["id"] + '>"' + a["value"] + '</label>\n';
		}break;
		
		case 'text':
		case 'password':
		case 'submit':
		{
			if( !a["val"] )
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '">\n';
			}
			{
				var tclass = "";
				if( t === password )
				{
					tclass = " valid";
				}
				o = '<input type="' + t + '" class="' + a["classes"] + tclass + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n' +
					'<span class="field-validation-valid" data-valmsg-for="' + a["id"] + '" data-valmsg-replace="' + a["val"] +'"></span>\n';
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
				o = '<textarea class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" rows="' + a["rows"] +'" cols="' + a["cols"] +'" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n' +
					'<span class="field-validation-valid" data-valmsg-for="' + a["id"] + '" data-valmsg-replace="' + a["val"] +'"></span>\n';
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
				
				o += '<span class="field-validation-valid" data-valmsg-for="' + a["id"] + '" data-valmsg-replace="' + a["val"] +'"></span>\n';
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
			var checked = "";
			if( a["checked"] !== false )
			{
				checked = 'checked="checked"';
			}
			
			if( !a["val"] )
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a["value"] + '" ' + checked + '>\n';
			}
			{
				o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '" ' + checked + '>\n' +
					'<span class="field-validation-valid" data-valmsg-for="' + a["id"] + '" data-valmsg-replace="' + a["val"] +'"></span>\n';
			}
		}break;
		
		default:
		{
			o = "default";
		}break;
	}
	
	return String( o );
};