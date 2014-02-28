//create local Meteor collection (client-only) to store errors
Errors = new Meteor.Collection(null);

throwError = function(message, type){
	Errors.insert({message: message, type: type, seen: false})
}

clearErrors = function(){
	Errors.remove({seen:true});
}