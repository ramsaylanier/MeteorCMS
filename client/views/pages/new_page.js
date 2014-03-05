Template.newPage.events({
	'submit form': function(e){
		e.preventDefault();

		var page ={
			title: $(e.target).find('[name=title]').val(),
			slug: Session.get('slug'),
			hideTitle: checkOptions($('#show-title')),
			pageTemplate: $(e.target).find('[name=template-type]').val().replace(/_/g, ' '),
			content: $(e.target).find('[name=editor]').val()
		}

		Meteor.call('page', page, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason, 'error');
			} else {
				Router.go('/admin/pages', page);
			}
		});
	}
});

//reset Session variable that stores the slug for New Pages
Template.newPage.created = function(){
	var val = $('#title').val();
	Session.set('slug', encodeURI(val).toLowerCase());
}

Template.displayPageAdmin.rendered = function(){
	$('#editor').cleditor();

}

//live update the slug based on the title being typed in
Template.displayPageAdmin.events({
	'keyup #title':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	},
	'change #slug':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	},
	'click .edit-slug': function(e){
		e.preventDefault();
		$('.editable-slug').toggleClass('hidden');
		$('#slug').toggleClass('hidden');
	},
	'change .fileUploader': function(e) {
	    var files = e.target.files;
    	Media.storeFiles(files);
	}
});

Template.displayPageAdmin.helpers({
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	},
	getTemplates: function(){
		var templates = _.filter(_.keys(Template), function(name){return name.match('template');});
		return _.map(templates, function(name){ return name.replace(/_/g, ' ');});
	},
	isSelected: function(name, pageTemplate){
		if (name == pageTemplate){
			return "selected='selected'";
		}
	}
});

function checkOptions(option){
	if (option.is(':checked')){
		return 'checked'
	} else {
		return ''
	}
}