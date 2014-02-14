Template.viewPage.helpers({
	page: function(){
		return Pages.find({_id: this._id});
	},
	showTitle: function(){
		if (Pages.findOne({_id: this._id}).hideTitle === 'checked'){
			return false
		} else{
			return true
		}
	}
});