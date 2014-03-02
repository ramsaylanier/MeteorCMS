Template.newPost.events({
	'submit form': function(e){
		e.preventDefault();

		var post ={
			title: $(e.target).find('[name=title]').val(),
			slug: Session.get('slug'),
			content: $(e.target).find('[name=editor]').val(),
			excerpt: $(e.target).find('[name=excerpt]').val()
		}

		Meteor.call('post', post, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason, 'error');
			} else {
				Router.go('/admin/posts', post);
			}
		});
	}
});

//reset Session variable that stores the slug for New Posts
Template.newPost.created = function(){
	var val = $('#title').val();
	Session.set('slug', encodeURI(val).toLowerCase());
}

Template.displayPostAdmin.rendered = function(){
	$('#editor').cleditor();
}

//live update the slug based on the title being typed in
Template.displayPostAdmin.events({
	'keyup #title':function(e){
		Session.set('slug', encodeURI(e.target.value).toLowerCase());
	},
	'change #slug':function(e){
		Session.set('slug', encodeURI(e.target.value).toLowerCase());
	},
	'click .edit-slug': function(e){
		e.preventDefault();
		$('.editable-slug').toggleClass('hidden');
		$('#slug').toggleClass('hidden');
	},
	'change .fileUploader': function(e) {
	    var files = e.target.files;
    	Assets.storeFiles(files);
	},
	'click #featured-image-btn':function(e){
		e.preventDefault();
		var frag = Meteor.render(Template.setFeaturedImage);
		$('body').append(frag);
	}
});

Template.displayPostAdmin.helpers({
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	}
});

Template.setFeaturedImage.helpers({
	media: function(){
		return Media.find({}, { sort: { uploadDate:-1 } });
	}
})

