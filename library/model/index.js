/**
 * package: nodakwaeri
 * sub-package: model
 * version: 0.0.4-alpha
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps;


/**
 * Defines the application's models
 *
 * @since 0.0.4
 */
module.exports = exports = model; 

function model( config )
{
	this.driver = config.db_provider;
	this.config = config.database;
	this.type = config.type;
	this.extend = config.extend;
};

// Gets an instance of the DBO
model.prototype.dbo = function()
{
	var config = this.config;
	config.model = this.schema;
	return new this.driver( config );
};

// Extends the base model object with derived properties
model.prototype.set = function( child )
{
	// We'll do it the old fashioned way
	for( var prop in child )
	{
		if( prop !== 'model' || 'dbo' || 'set' )
		{
			this[prop] = child[prop];
		}
	}
	return this;
};