// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors')

const campaignRoutes = require('./routes/campaigns')
const { userRoutes } = require('./routes/login_register')
const { jwtMiddleware } = require("./middleware/middleware")

const PORT = process.env.PORT || 3002;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cookieParser());

// Set up CORS: https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.options('*', cors())

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/campaigns', jwtMiddleware, campaignRoutes);
app.use(userRoutes)



// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
