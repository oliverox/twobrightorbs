/**
 * scripts/application.js
 */
'use strict';

var Backbone = require('backbone');
var AppRouter = require('./router');

var Application = function App() {};

Application.prototype.start = function() {
    console.log('-- App initialization --');
    var appRouter = new AppRouter();
    Backbone.history.start({pushState: true});

    $(document).on('click', 'a:not([data-bypass])', function(evt) {
        evt.preventDefault();
        appRouter.navigate(evt.target.pathname, { trigger: true });
    });

};

module.exports = Application;