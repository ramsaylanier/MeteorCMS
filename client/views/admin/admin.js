Template.admin.helpers({
	pageCount: function(){
		return Pages.find().count();
	},
	postCount: function(){
		return Posts.find().count();
	},
	categoryCount: function(){
		return Categories.find().count();
	},
	settings: function(){
		return Settings.findOne();
	}
});