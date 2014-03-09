Template.header.helpers({
	pages: function(){
		return Pages.find();
	},
	settings: function(){
		return Settings.findOne();
	}
});