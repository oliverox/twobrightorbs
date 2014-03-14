/** @jsx React.DOM */

var React = require('react');
var PostList = require('./post_list');

var AdminLayout = React.createClass({
    render: function() {
        return(
            <div className="layout">
                <button type="button" className="btn btn-primary">New Post</button>
                <PostList collection={this.props.collection} />
            </div>
        );
    }
});

module.exports = AdminLayout;
