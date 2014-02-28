Meteor.publish('blocks',function(){
	return Blocks.find();
});

Meteor.publish('pages',function(){
	return Pages.find();
});

Meteor.publish('media', function() {
	return Media.find();
});