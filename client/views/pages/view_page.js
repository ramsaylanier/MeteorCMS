Template.viewPage.helpers({
	page: function(){
		return Pages.find({_id: this._id});
	},
	showTitle: function(){
		if (Pages.findOne({_id: this._id}).hideTitle === 'checked'){
			return false;
		} else{
			return true;
		}
	},
	pageTemplate: function(){
		var templateName = Pages.findOne({_id: this._id}).pageTemplate.replace(/ /g, '_');
		return Template[templateName](Pages.findOne({_id: this._id}));
	}
});