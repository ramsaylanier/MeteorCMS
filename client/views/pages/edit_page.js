Template.editPage.events({
	'click #delete-page-btn' : function(e) {
		e.preventDefault();

		if (confirm("Delete This Page?")){
			var currentPageId = this._id;
			Pages.remove(currentPageId);
			Router.go('/admin/pages');
		}
	}
});