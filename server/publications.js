Meteor.publish('blocks',function(){
	return Blocks.find();
});

Meteor.publish('pages',function(){
	return Pages.find();
});

Meteor.publish('images', function() {
    return Images.find();
});