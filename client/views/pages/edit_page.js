Template.editPage.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPageId = this._id;

		var pageProperties = {
			title: $(e.target).find('[name=title]').val(),
			slug: $(e.target).find('[name=slug]').val(),
		}

		Pages.update(currentPageId, {$set: pageProperties}, function(error){
			if(error){
				alert(error.reason);
			} else {
				Router.go('/admin/pages');
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