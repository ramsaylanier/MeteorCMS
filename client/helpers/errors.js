//create local Meteor collection (client-only) to store errors
Errors = new Meteor.Collection(null);

throwError = function(message){
	Errors.insert({message: message, seen: false})
}
clearErrors = function(){
	Errors.remove({seen:true});
}