var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
mongoose = require('mongoose');
var path = require('path');

app.use(express.static(__dirname));

// Connection to DB
mongoose.connect('mongodb://localhost/Finances', function (err, res) {
  if (err) throw err;
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());




// Import Domain and Services

// Conta
var Domain = require('./Domain/Entities/Conta')(app, mongoose);
var ContaServices = require('./Services.Data/ContaServicesData');


var router = express.Router();

// API routes

// Routes Conta
var routerContas = express.Router();

routerContas.route('/contas')
  .get(ContaServices.findAllContas)
  .post(ContaServices.addConta);

routerContas.route('/conta/:id')
  .get(ContaServices.findById)
  .put(ContaServices.updateConta)
  .delete(ContaServices.deleteConta);

// var pages = {
//     app:__dirname +'index.html' 
// }

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

//
// router.get('/', function(req, res) {  
//    res.sendFile(path.join(__dirname + '/index.html'));
// });

// All router

app.use('/api', routerContas);


app.listen(process.env.PORT || 8000);

console.log('rodando api na porta 8000');