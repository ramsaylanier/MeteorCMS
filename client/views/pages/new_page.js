Template.newPage.events({
	'submit form': function(e){
		e.preventDefault();

		var page ={
			title: $(e.target).find('[name=title]').val(),
			slug: Session.get('slug'),
			hideTitle: checkOptions($('#show-title')),
			content: $(e.target).find('[name=editor]').val()
		}

		Meteor.call('page', page, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason);
			} else {
				Router.go('/admin/pages', page);
			}
		});
	}
});

//reset Session variable that stores the slug for New Pages
Template.newPage.created = function(){
	var val = $('#title').val();
}

Template.displayPageAdmin.rendered = function(){
	$('#editor').cleditor();

}

//live update the slug based on the title being typed in
Template.displayPageAdmin.events({
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
	}
});

Template.displayPageAdmin.helpers({
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	}
});

function checkOptions(option){
	if (option.is(':checked')){
		return 'checked'
	} else {
		return ''
	}
}