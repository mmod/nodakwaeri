/**
 * package: nodakwaeri
 * subpackage: html
 * version:  0.0.0
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MassivelyModified</a>
 * copyright: 2013-2014 Richard B. Winters
 * license: GNU LGPL V3.0
 */


/**
 * Defining the html component
 *
 * @since 0.0.1
 */
module.exports = 
{
	version: function()
	{
		return String( "0.0.1" );
	},
	construct: require( "./construct.js" )
};