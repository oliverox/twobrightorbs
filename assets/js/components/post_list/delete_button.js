/** @jsx React.DOM */
var React = require('react/addons');

var DeleteButton = React.createClass({
    render: function() {
        var cx = React.addons.classSet;
        var classes = cx({
            'fa fa-times fa-lg' : true,
            'invisible': !this.props.show
        });
        return (
            <i className={classes}></i>
        );
    }
});

module.exports = DeleteButton;