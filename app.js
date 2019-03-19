var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');

var index = require("./routes/index");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mifo3661",
    database: "test"
});

con.connect(function(err) {
	if(err){
		console.log('Connecting error.');
		return;
	}
	
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


app.use(function(req, res, next) {
    req.con = con;
    next();
});


app.listen(3000, function(){
	console.log("Listening on  port 3000!");
})

module.exports = app;