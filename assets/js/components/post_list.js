/** @jsx React.DOM */
var React = require('react');
var PostItem = require('./post_list/post_item');

var PostList = React.createClass({
    componentDidMount: function() {
        this.props.collection.on('change', function() {
            console.log('-- inside posts_component : componentDidMount : collection changed');
            this.forceUpdate();
        }.bind(this));
    },
    render: function() {
    	console.log('-- inside posts_component : render. collection=', this.props.collection);
        var i = -1;
        var model;
		var postItems = this.props.collection.map(function (post) {
			console.log('post', post);
  			return <PostItem key={post.get('id')} model={post}></PostItem>;
  		});
        return (
            <div className="posts">
                <table className="table table-hover">
                	<thead>
                		<tr>
    	            		<th>Title</th>
        	        		<th className="center">Date</th>
        	        		<th></th>
        	        		<th></th>
        	        	</tr>
                	</thead>
                	<tbody>
    	                {postItems}
    	            </tbody>
                </table>
            </div>
        );
    }
});

module.exports = PostList;
