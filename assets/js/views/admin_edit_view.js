/** @jsx React.DOM */

var Backbone = require('backbone');
var React = require('react');
var _ = require('lodash');
var Post = require('../models/post');
// var Posts = require('../collections/posts');

// components
var EditPost = require('../components/edit_post');

// Backbone view
var AdminEditView = Backbone.View.extend({

    initialize: function(params) {
        console.log("--AdminEditView-- in initialize()", params);

        var self = this;

        this.model = new Post({
            pid: params.pid
        });

        var promise = this.model.fetch();
        promise.done(function(arg) {
            console.log("####>>>#>#>#>#>#>#>#>#>#> SUCCESS FETCH:", this, arg);
            console.log("................. will call render now", self.model);
            self.render();
        });
    }, 

    render: function() {
        console.log("--AdminEditView-- in render()", this.model);

        if (this.model) {
            console.log()
            React.renderComponent((
                <EditPost model={this.model} />
            ), $('#app_container').get(0));            
        }
        return this;
    }

});

module.exports = AdminEditView;