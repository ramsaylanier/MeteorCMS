Template.viewPage.helpers({
	page: function(){
		return Pages.find({_id: this._id});
	}
});