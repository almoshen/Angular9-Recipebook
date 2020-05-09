/*
file for the configuration
*/
require('dotenv').config();
require('../../app_api/models/db');

const logger = require('morgan');
const sessionCookieLocal = require('./session');
const handleBarsConfig = require('./handlebars');

const configModules = (app) => {
    console.log('load configModules');
    
    if (process.env.MORGAN_FORMAT !== 'none') {
        app.use(logger(process.env.MORGAN_FORMAT));
    }

    // load handlebars configuration
    handleBarsConfig(app);

    // load session cookies
    sessionCookieLocal(app);

}


module.exports = configModules;