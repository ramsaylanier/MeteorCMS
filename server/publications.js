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