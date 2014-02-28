Template.errors.helpers({
	errors: function(){
		return Errors.find();
	}
});

Template.error.rendered = function(){
	var error = this.data;
	Meteor.defer(function(){
		Errors.update(error._id, {$set: {seen: true}});
	});
}

Template.error.events({
	'click .close': function(e){
		$(e.target).parent('.alert').remove();
	}
});