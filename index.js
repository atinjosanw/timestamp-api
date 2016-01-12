'use strict';

// BASE SETUP
// =============================================================================

var express = require('express');
var app = express();
var Msg = require('./controllers/msg');

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function (req, res, next) {
	console.log('Receive connection.');
	next();
});

router.get('/', function (req, res) {
	res.json({ message: "This is a timestamp API in node!"});
});

router.route('/:ts').get( function (req, res) {
	Msg.interpretTime(req.params.ts, function (err, time) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(time);
	});
});

app.use('/', router);

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


