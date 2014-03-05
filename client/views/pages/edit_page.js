Template.editPage.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPageId = this._id;

		var pageAttributes = {
			title: $(e.target).find('[name=title]').val(),
			slug: $(e.target).find('[name=slug]').val(),
			hideTitle: checkOptions($('#show-title')),
			pageTemplate: $(e.target).find('[name=template-type]').val().replace(/_/g, ' '),
			content: $(e.target).find('[name=editor]').val()
		}

		Meteor.call('updatePage', currentPageId, pageAttributes, function(error, id) {
			if(error){
				throwError(error.reason, 'error');
			} else {
				throwError('Published!', 'success');
			}
		});
	},

	'click #delete-page-btn' : function(e) {
		e.preventDefault();

		if (confirm("Delete This Page?")){
			var currentPageId = this._id;
			Pages.remove(currentPageId);
			Router.go('/admin/pages');
		}
	}
});

//reset Session variable to the current page title when editing pages
Template.editPage.rendered = function(){
	//only run this code on the first rendering, not on a re-render
	var val = $('#slug').val();
	Session.set('slug', val.toLowerCase());
}

function checkOptions(option){
	if (option.is(':checked')){
		return 'checked'
	} else {
		return ''
	}
}
