/** @jsx React.DOM */
var React = require('react');
var DeleteButton = require('./delete_button');
var DatePicker = require('./date_picker');

var PostItem = React.createClass({
    getInitialState: function() {
        return {
            showDeleteButton: false
        }
    },
    componentDidMount: function() {
        this.props.model.on('change', function() {
            console.log('....... updating model', this);
            this.forceUpdate();
        }.bind(this));
    },
    handleMouseEnter: function(evt) {
        this.setState({
            showDeleteButton: true
        });
    },
    handleMouseLeave: function(evt) {
        this.setState({
            showDeleteButton: false
        });
    },
    render: function() {
        var editPostUrl = '/admin/edit/' + this.props.model.get('id');
        var createdAt = this.props.model.get('createdAt').split('T')[0];
        return (
        	<tr onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        		<td><a href={editPostUrl}>{this.props.model.get('title')}</a></td>
        		<td className="col-xs-2"><DatePicker model={this.props.model} date={createdAt} /></td>
        		<td className="center">{this.props.model.get('published') ? <button type="button" className="btn btn-default btn-sm pub-btn">unpublish</button> : <button type="button" className="btn btn-primary btn-sm pub-btn">publish</button>}</td>
        		<td><DeleteButton show={this.state.showDeleteButton}/></td>
        	</tr>
        );
    }
});

module.exports = PostItem;