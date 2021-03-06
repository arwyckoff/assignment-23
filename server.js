//WEBPACK -- configuration
let webpack
let webpackMiddleware
let webpackConfig
let webpackCompiler
//IMPORTS
//--------------
//import express web server
const express = require('express')
//import templating engine for rendering HTML
const renderFile = require('ejs').renderFile

//run the express app
const app = express()

if( process.env.NODE_ENV === 'development' ){
	webpack = require('webpack');
	webpackMiddleware = require('webpack-dev-middleware');
	webpackConfig = require('./webpack.config.js');
	webpackCompiler = webpack(webpackConfig)

	console.log('using teh webpack!')
	app.use(webpackMiddleware(webpackCompiler, {
	   noInfo: true,
	   publicPath: webpackConfig.output.publicPath
	}));
}


// set port if exists in environment for heroku or live site, else set to 3000 for dev
const PORT = process.env.PORT || 3000


//CONFIGURING TEMPLATING ENGINE FOR .HTML
//-----------------------
app.set('views', './dist');
app.engine('html', renderFile)
app.set('view engine', 'html');

// CONFIGURING STATIC FILES  (js, css, images)
// ------------------------------
// js, css, and imafiles from dist/assets/
app.use( express.static( __dirname + '/dist') );

//handle GET requests to `/` (root)
app.get('/', function (req, res) {
  res.render('index.html');
});

//handle GET requests to `/about` and serve page `about-page.html`
app.get('/about', function (req, res) {
  res.render('about-page.html');
});

//Set the port location
app.set('port', PORT)

//Tell Server to listen @ port-location
app.listen(PORT,function() {
	console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
