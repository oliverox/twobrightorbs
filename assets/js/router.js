var Backbone = require('backbone');
var AdminView = require('./views/admin_view');
var AdminEditView = require('./views/admin_edit_view');

var AppRouter = Backbone.Router.extend({
    routes : {
        "" : "index",
        "admin": "admin",
        "admin/edit/:slug" : "edit",
        "search/:query": "search",
        "search/:query/p:page": "search"
    },
    index: function() {
        console.log(">>>>>>>>>>>> index");
        var app_view = new AppView({
            el: "#app_container"
        });
        app_view.render();
    },
    admin: function() {
        console.log(">>>>>>>>>>>> admin");
        var admin_view = new AdminView({
            el: "#app_container"
        });
        admin_view.render();
    },
    edit: function(pid) {
        console.log(">>>>>>>>>>>> edit post", pid);
        var admin_edit_view = new AdminEditView({
            el: "#app_container",
            pid: pid
        });
        admin_edit_view.render();
    },
    search: function() {
        console.log(">>>>>>>>>>>> search");
    }
});

module.exports = AppRouter;