Meteor.publish('usernames', function(){
	return Meteor.users.find({}, {fields: {username: 1}});
});

Meteor.publish('pages',function(){
	return Pages.find();
});

Meteor.publish('posts',function(){
	return Posts.find();
});

Meteor.publish('blocks',function(){
	return Blocks.find();
});

Meteor.publish('media', function() {
	return Media.find();
});

Meteor.publish('categories', function(){
	return Categories.find();
});

Meteor.publish('settings', function(){
	return Settings.find();
});

Meteor.publish('menus', function(){
	return Menus.find();
});