/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		slug: 'STRING',
		title: 'STRING',
		body: 'TEXT',
		published: 'BOOLEAN',
		publish_date: 'DATE',
		author_id: 'STRING',
		featured_image: 'STRING'
	},

	beforeCreate: function(val, next) {
		if (!val.title) {
			return next({ err: ["Must have a title!"] });
		}
		val.slug = val.title.replace(/\s+/g, '-').toLowerCase();

		next();
	}

};