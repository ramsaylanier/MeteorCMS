Pages = new Meteor.Collection('pages');
Blocks = new Meteor.Collection('blocks');

//CollectionFS collection used for file uploads
Media = new CollectionFS('media', { autopublish: false });

Media.fileHandlers({
  default: function(options) { // Options contains blob and fileRecord — same is expected in return if should be saved on filesytem, can be modified
    console.log('I am handling default: ' + options.fileRecord.filename);
    return { blob: options.blob, fileRecord: options.fileRecord }; // if no blob then save result in fileHandle (added createdAt)
  },
  thumb: function(options) {
    if (options.fileRecord.contentType != 'image/jpeg')
      return null; // jpeg files only  

    var destination = options.destination();
    var dest = destination.serverFilename;

    // Uses meteorite graphicsmagick
    gm(options.blob, dest).resize(60, 60).quality(90).write(dest, function(err) {
      if (err) {
       console.log('GraphicsMagick error ' + err);
       return false;
       // False will trigger rerun, could check options.sumFailes
       // if we only want to rerun 2 times (default limit is 3,
       // but sumFailes is reset at server idle + wait period)
      } else {
        console.log('Finished writing image.');
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

Blocks.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
});

Media.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
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

		var page = _.extend(_.pick(pageAttributes, 'title', 'slug', 'hideTitle', 'content'), {
			submitted: new Date().getTime()
		});

		var pageId = Pages.insert(page);

		return pageId;
	},
	updatePage: function(pageAttributes){
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

		var page = _.extend(_.pick(pageAttributes, 'title', 'slug', 'hideTitle', 'content'), {
			submitted: new Date().getTime()
		});

		var pageId = Pages.update(page);

		return pageId;

	}
});
