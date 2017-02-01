/*jshint node:true*/
'use strict';

var https = require('https'),
    server = require('./server.js');

server.run(https);
