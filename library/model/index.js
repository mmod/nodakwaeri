/**
 * package: nodakwaeri
 * sub-package: model
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
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
	this.driver = config.db_provider.Driver;
	this.config = config.database;
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
	var nmodel = this;
	
	// We'll do it the old fashioned way
	for( var prop in child )
	{
		if( prop !== 'model' || 'dbo' || 'set' )
		{
			nmodel[prop] = child[prop];
		}
	}
	return nmodel;
};