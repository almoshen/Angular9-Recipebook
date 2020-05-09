//////////////////
// HANDLEBARS CONFIGURATION
//////////////////
require('dotenv').config();
const exphbs = require('express-handlebars');
const path = require("path");
Handlebars = require('express-handlebars')


const handleBarsConfig = async (app) => {
    console.log('load handleBarsConfig');
    
    // Express Templates
    app.set('views',path.join(__dirname,'../../app_server', 'views'));
    app.engine('handlebars',exphbs({
      defaultLayout: 'main',
      partialsDir: path.join(__dirname + '../../views','partials')
    }));
    app.set('view engine', 'handlebars');

    var hbs = exphbs.create({});

    // register new function
    hbs.handlebars.registerHelper('ifCond', function(v1, v2, options) {
      if(v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    });


    
}

// module.exports = logger, middlewareMethod;
module.exports = handleBarsConfig;
