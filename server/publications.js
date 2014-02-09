Meteor.publish('works',function(){
	return Works.find();
});