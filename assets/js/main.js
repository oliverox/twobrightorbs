/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';
var Application = require('./application.js');

var app = new Application();
app.start();