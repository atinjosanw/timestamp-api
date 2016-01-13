'use strict';

var express = require('express'),
    app = express(),
    timestamp = require('./router/timestamps.js');

app.use('/', timestamp);

module.exports = app;

