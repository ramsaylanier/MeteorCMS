Template.default_template.helpers({
	showTitle: function(){
		if (Pages.findOne({_id: this._id}).hideTitle === 'checked'){
			return false;
		} else{
			return true;
		}
	}
});