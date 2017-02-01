/*jshint node:true*/
'use strict';

var spdy = require('spdy'),
    server = require('./server.js');

server.run(spdy);
