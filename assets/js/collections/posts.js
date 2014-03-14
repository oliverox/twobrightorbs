var Backbone = require('backbone');
var Post = require('../models/post');

var Posts = Backbone.Collection.extend({
	initialize: function(params) {
		if (params && params.slug) {
			this.slug = params.slug;
		}
	},

	url: '/post',
	
	fetchBySlug: function() {
		return this.fetch({ 
			data: $.param({ slug: this.slug })
		});
	}

});

module.exports = Posts;