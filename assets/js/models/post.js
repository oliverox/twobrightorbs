var Backbone = require('backbone');

var Post = Backbone.Model.extend({

	initialize: function(params) {
		console.log('== initialize model: Post ==', params);
		this.pid = params.pid;
	},

	url: function() {
		return '/post/' + this.pid;
	}
});

module.exports = Post;