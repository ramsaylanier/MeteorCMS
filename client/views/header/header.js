Template.header.helpers({
	pages: function(){
		return Pages.find();
	},
	settings: function(){
		return Settings.findOne();
	},
	headerMenu: function(){
		return Menus.findOne({location: "header"});
	}
});