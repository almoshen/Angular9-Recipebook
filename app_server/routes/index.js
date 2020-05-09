
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const recipeRoutes = require('./recipe');

const authMiddleware = require('../middleware/auth'); // check if a user is authenticated


const constructorMethod = (app) => {

  app.get('/favicon.ico', (req, res) => res.status(204));

  // app.use("*", (req, res) => {
  //   res.sendStatus(404);
  // });

  app.use(function(req, res, next) {  
    if (req.session.user) {
      app.locals.firstname = req.session.user.firstname;
      app.locals.username = req.session.user.username;
    } else {
      app.locals.firstname = null;
      app.locals.username = null;
    }
    next();
  })
  
  
  app.use('/', authMiddleware.checkIfAuth, homeRoutes);
  // Authentication
  app.use('/auth', authMiddleware.checkIfAuth, authRoutes);
  // Recipes
  app.use('/recipe', authMiddleware.checkIfAuth, recipeRoutes);
  
  app.use('/api', authMiddleware.checkIfAuth, (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // routing API
  const apiRouter = require('../../app_api/routes/index');
  app.use('/api', apiRouter);

 

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res
        .status(401)
        .render('404', { url: req.url });
        // .json({"message": err.name + ": " + err.message});
    }
  })

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    // res
    //     .status(401)
    //     .json({"message":"the URL does not exist"});
    // next(createError(404));
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }
  });


};

module.exports = constructorMethod;
