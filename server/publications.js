Meteor.publish('works',function(){
	return Works.find();
});

Meteor.publish('pages',function(){
	return Pages.find();
});