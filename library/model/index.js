/**
 * package: nodakwaeri
 * sub-package: model
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps;


/**
 * Entry point to the application's models
 *
 * @since 0.0.4
 */
function model( config )
{
    this.driver = config.dbdvr.driver;
    this.config = config.database;
};


/**
 * Gets an instance of the DBO
 *
 * @since 0.2.4
 */
model.prototype.dbo = function()
{
    var config = this.config;
    config.model = this.schema;

    return new this.driver( config );
};


/**
 * Extends the base model with derived properties
 */
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


// Export
module.exports = exports = model;