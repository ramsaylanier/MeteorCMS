Pages = new Meteor.Collection('pages');
Posts = new Meteor.Collection('posts');
Blocks = new Meteor.Collection('blocks');
Categories = new Meteor.Collection('categories');
Settings = new Meteor.Collection('settings');
Menus = new Meteor.Collection('menus');

/*
thumbnail = new FS.Store.FileSystem("thumbnail", {
	beforeSave: function () {
    	
    }
});

medium = new FS.Store.FileSystem("medium", {
	beforeSave: function () {
    	
    }
});

full = new FS.Store.FileSystem("full");

Media = new FS.Collection("media", {
	stores: [thumbnail, medium, full],
	filter: {
	    allow: {
		    contentTypes: ['image/*'],
		    extensions: ['jpg', 'png', 'jpeg', 'gif']
	    },
	    onInvalid: function (message) {
		    throwError(message, 'error');
		}
	}
});

FS.debug = true;
*/

//CollectionFS collection used for file uploads
Media = new CollectionFS('media', { autopublish: false });
Media.filter({
	allow: {
		contentTypes: ['image/*']
	}
});

Media.fileHandlers({
  default: function(options) { // Options contains blob and fileRecord — same is expected in return if should be saved on filesytem, can be modified
    console.log('I am handling default: ' + options.fileRecord.filename);
    return { blob: options.blob, fileRecord: options.fileRecord }; // if no blob then save result in fileHandle (added createdAt)
  },
  thumb: function(options) {
    var destination = options.destination();
    var dest = destination.serverFilename;

    // Uses meteorite graphicsmagick
    gm(options.blob, dest).resize(60).quality(90).write(dest, function(err) {
      if (err) {
       console.log('Thumb: GraphicsMagick error ' + err);
       return false;
       // False will trigger rerun, could check options.sumFailes
       // if we only want to rerun 2 times (default limit is 3,
       // but sumFailes is reset at server idle + wait period)
      } else {
        console.log('Thumb: Finished writing image to ' + dest);
         // We only return the url for the file, no blob to save since we took care of it
      }
    });

   // I failed to deliver a url for this, but don't try again
   return { blob: options.blob, fileRecord: options.fileRecord };
  },
  medium: function(options) {
    var destination = options.destination();
    var dest = destination.serverFilename;

    // Uses meteorite graphicsmagick
    gm(options.blob, dest).resize(300).quality(90).write(dest, function(err) {
      if (err) {
       console.log('Medium: GraphicsMagick error ' + err);
       return false;
       // False will trigger rerun, could check options.sumFailes
       // if we only want to rerun 2 times (default limit is 3,
       // but sumFailes is reset at server idle + wait period)
      } else {
        console.log('Medium: Finished writing image to ' + dest);
         // We only return the url for the file, no blob to save since we took care of it
      }
		});

		// I failed to deliver a url for this, but don't try again
		return { blob: options.blob, fileRecord: options.fileRecord };
	}
});




Pages.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
});

Posts.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
})

Blocks.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
});

Media.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin,
	//download: isAdmin
})

Categories.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
})

Settings.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
})

Menus.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin,
})

Meteor.methods({
	page: function(pageAttributes){
		var user = Meteor.user(),
			pageWithSameSlug = Pages.findOne({slug: pageAttributes.slug});
			pageWithSameTitle = Pages.findOne({title: pageAttributes.title});
	
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

		if (pageAttributes.title && pageWithSameTitle){
			throw new Meteor.Error(302, 'This page already exists', pageWithSameTitle._id);
		}

		var page = _.extend(_.pick(pageAttributes, 'title', 'slug', 'hideTitle', 'pageTemplate', 'content'), {
			submitted: new Date().getTime()
		});

		var pageId = Pages.insert(page);

		return pageId;
	},
	updatePage: function(pageID, pageAttributes){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add pages");

		//ensure page has a title
		if (!pageAttributes.title)
			throw new Meteor.Error(422, 'Please enter a page title');

		//ensure page has a slug
		if (!pageAttributes.slug)
			throw new Meteor.Error(422, 'Please enter a page slug');

		var page = _.extend(_.pick(pageAttributes, 'title', 'slug', 'hideTitle', 'pageTemplate', 'content'), {
			submitted: new Date().getTime()
		});

		var pageId = Pages.update(pageID, page);

		return pageId;

	},
	post: function(postAttributes){
		var user = Meteor.user(),
			postWithSameSlug = Posts.findOne({slug: postAttributes.slug});
			postWithSameTitle = Posts.findOne({title: postAttributes.title});
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add posts");

		//ensure post has a title
		if (!postAttributes.title)
			throw new Meteor.Error(422, 'Please enter a post title');

		//ensure post has a slug
		if (!postAttributes.slug)
			throw new Meteor.Error(422, 'Please enter a post slug');

		//if no excerpt is set, set excerpt to post content
		if (!postAttributes.excerpt)
			postAttributes.excerpt = postAttributes.content;

		if (postAttributes.slug && postWithSameSlug){
			throw new Meteor.Error(302, 'This slug has already been used', postWithSameSlug._id);
		}

		if (postAttributes.title && postWithSameTitle){
			throw new Meteor.Error(302, 'This page already exists', postWithSameTitle._id);
		}

		var post = _.extend(_.pick(postAttributes, 'title', 'slug', 'content', 'excerpt', 'featuredImage', 'categories'), {
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	},
	updatePost: function(postID, postAttributes){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add posts");

		//ensure post has a title
		if (!postAttributes.title)
			throw new Meteor.Error(422, 'Please enter a post title');

		//ensure post has a slug
		if (!postAttributes.slug)
			throw new Meteor.Error(422, 'Please enter a post slug');

		if (!postAttributes.excerpt){
			postAttributes.excerpt = postAttributes.content.substring(0,250) + "\u2026";
		}


		var post = _.extend(_.pick(postAttributes, 'title', 'slug', 'content', 'excerpt', 'featuredImage', 'categories'), {
			submitted: new Date().getTime()
		});

		var postId = Posts.update(postID, post);

		return postId;
	},
	category: function(categoryAttributes){
		//ensure post has a title
		if (!categoryAttributes.name)
			throw new Meteor.Error(422, 'Please enter a category name');

		//ensure post has a slug
		if (!categoryAttributes.slug)
			throw new Meteor.Error(422, 'Please enter a category slug');

		var category = _.extend(_.pick(categoryAttributes, 'name', 'slug'), {
			submitted: new Date().getTime()
		});

		var categoryId = Categories.insert(category);

		return categoryId;
	},
	updateSettings: function(settingsID, settingsOptions){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add posts");

		var settings = _.extend(_.pick(settingsOptions, 'siteTitle', 'landingPage', 'headerLocation', 'headerImage', 'headerHeight', 'headerWidth'), {
			submitted: new Date().getTime()
		});

		var settingsId = Settings.upsert(settingsID, settings);

		return settings;
	},
	addMenu: function(title){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add posts");

		if (!title.title)
			throw new Meteor.Error(422, 'Please enter a menu title');

		var menu = _.extend(_.pick(title, 'title'));

		var menuId = Menus.insert(menu)

		return menuId;
	},
	updateMenu: function(menuId, menuAttributes, links){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add posts");

		if (!menuAttributes.title)
			throw new Meteor.Error(422, 'Please enter a menu title');

		if (!menuAttributes.location)
			throw new Meteor.Error(422, 'Please enter a menu location');

		var menu = _.extend(_.pick(menuAttributes, 'title', 'location'));

		var menuId = Menus.update({_id: menuId}, {$set: {title: menu.title, location: menu.location, links: links}});

		return menuId;
	},
	addLink: function(menu, linkAttributes){
		var user = Meteor.user();
		
		//make sure used is logged in before adding link
		if (!user)
			throw new Meteor.Error(401, "You need to login to add menus");

		//ensure link has a title
		if (!linkAttributes.linkTitle)
			throw new Meteor.Error(422, 'The link must have a title');

		//ensure link has a URL
		if (!linkAttributes.linkURL)
			throw new Meteor.Error(422, 'The link must have a URL');

		var link = _.extend(_.pick(linkAttributes, 'linkTitle', 'linkURL', 'linkType'));

		var linkId = Menus.update({_id: menu._id}, {$addToSet: {links: {linkTitle: link.linkTitle, linkURL: link.linkURL, linkType: "Custom"}}});
		console.log(link.linkTitle);

		return linkId;
	},
	updateLink: function(menu, originalTitle, linkAttributes){
		var user = Meteor.user();
		
		//make sure used is logged in before adding link
		if (!user)
			throw new Meteor.Error(401, "You need to login to add menus");

		//ensure link has a title
		if (!linkAttributes.linkTitle)
			throw new Meteor.Error(422, 'The link must have a title');

		//ensure link has a URL
		if (!linkAttributes.linkURL)
			throw new Meteor.Error(422, 'The link must have a URL');

		var link = _.extend(_.pick(linkAttributes, 'linkTitle', 'linkURL', 'linkType'));

		var linkId = Menus.update({_id: menu._id, "links.linkTitle": originalTitle}, {$set: { "links.$.linkTitle" : linkAttributes.linkTitle, "links.$.linkURL": linkAttributes.linkURL}});
		console.log(linkAttributes.linkTitle);

		return linkId;
	}
});
