(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express')
  const path =require('path');
  const appConfig = require('./config/main-config.js');
  const routeConfig = require('./config/route-config.js');
  const errorConfig = require('./config/error-config.js');

  // *** express instance *** //
  const app = express();
  var bodyParser = require('body-parser');


  var pub = __dirname;
  app.use(express.static(pub));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '..', 'client')));
  app.set('views', __dirname+'/views');
  app.set('view engine', 'jade');


  var multer  = require('multer');
  app.use(multer({dest:'./uploads/'}).single('file'));

  // *** config *** //
  routeConfig.init(app);
  errorConfig.init(app);



  module.exports = app;

}());
