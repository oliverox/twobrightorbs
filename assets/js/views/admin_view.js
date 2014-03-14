/** @jsx React.DOM */

var Backbone = require('backbone');
var _ = require('lodash');
var React = require('react');
var Posts = require('../collections/posts');
var AdminLayout = require('../components/admin_layout');

var AdminView = Backbone.View.extend({

    initialize: function(params) {
        console.log("--AppView-- in initialize()", this, params);
        this.collection = new Posts();
        this.collection.on("reset", this.reset, this);
        this.collection.fetch({
            reset: true,
            success: function() {console.log('SUCCESS',arguments); },
            error: function() { console.log('ERROR', arguments); }
        });
    }, 

    reset: function() {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> reseting this.collection', this);
        this.render();
    },

    render: function() {
        console.log("--AppView-- in render()", this);
         React.renderComponent((

            <AdminLayout collection={this.collection} />

        ), $('#app_container').get(0));
        return this;
    }

});

module.exports = AdminView;