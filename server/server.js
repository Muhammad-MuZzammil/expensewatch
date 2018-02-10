var express = require('express');
var app = express();
var bodParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const path = require('path');

var config = require('./config');
var user = require('./routes/user.js');
var expense = require('./routes/expense.js');

var port = process.env.PORT || config.serverport;
// app.use(express.static(__dirname) + '../dist')
mongoose.connect(config.database, function (err) {
  if (err) {
    console.log('Error connecting database, Please check if MongoDB is running')
  }
  else {
    console.log("Connected to database...");
  }
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type: '*/*' }));

// use morgan to log request to the console
app.use(morgan('dev'));

//Enable CORS from client-side
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Method', 'PUT,GET,POST,DELETE,OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Cridentials");
  res.setHeader("Access-Control-Allow-Cridentials", "true");
  next();
});

// basic routes

app.get('/', function (req, res) {
  res.send('Expense watch API is runnning at http://localhost:' + port + '/api');
});

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname + "../dist/index.html"));
// })

app.post('/register', user.signup);

//express router
var apiRoutes = express.Router();

// initialize apiRoutes so our full path is http://localhost:port/api
app.use('/api', apiRoutes);

// login Route
apiRoutes.post('/login', user.login);

//route middleware to  authenticate and  check all our tokens
apiRoutes.use(user.authenticate);

// authenticated routes
apiRoutes.get('/', function (req, res) {
  res.status(201).json({
    message: 'welcome to the authenticated routes'
  });
});
// User
apiRoutes.post('/user/:id', user.getuserDetails); // API returns user Details
apiRoutes.put('/user/:id', user.updateUser); // API updates user Details
apiRoutes.put('/password/:id', user.updatePassowrd); // API updates user password

// Expense

apiRoutes.post('/expense/:id', expense.saveexpense); //adds and update expense of the user

apiRoutes.delete('/expense/:id', expense.delexpense); // API removesthe expense details of given expense id

apiRoutes.get('/expense/:id', expense.getexpense) //API returns expense details of given expense id

apiRoutes.post('/expense/total/:id', expense.expensetotal); // adds total expense of given expense id

apiRoutes.post('/expense/report/:id', expense.expensereport); // API returns expense report based on user input

// kick off the server
app.listen(port);
console.log("Expense watch app is listening at http://localhost:" + port);
