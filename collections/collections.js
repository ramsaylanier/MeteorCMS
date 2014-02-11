Works = new Meteor.Collection('works');
Pages = new Meteor.Collection('pages');


Pages.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	page: function(pageAttributes){
		var user = Meteor.user(),
			pageWithSameSlug = Pages.findOne({slug: pageAttributes.slug});
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add pages");

		//ensure page has a title
		if (!pageAttributes.title)
			throw new Meteor.Error(422, 'Please enter a page title');

		//ensure page has a slug
		if (!pageAttributes.slug)
			throw new Meteor.Error(422, 'Please enter a page slug');

		if (pageAttributes.slug && pageWithSameSlug){
			throw new Meteor.Error(302, 'This slug has already been used', pageWithSameSlug._id);
		}

		var page = _.extend(_.pick(pageAttributes, 'title', 'slug'), {
			submitted: new Date().getTime()
		});

		var pageId = Pages.insert(page);

		return pageId;
	}
});
