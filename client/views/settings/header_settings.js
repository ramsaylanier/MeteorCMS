
Template.headerSettings.rendered = function(){
	var headerLocation = Settings.findOne().headerLocation;
	$('.header-location').find('option[value='+headerLocation+']').prop('selected',true);
}

Template.headerSettings.events({
	'click #header-image-btn':function(e){
		e.preventDefault();
		/*var frag = Meteor.render(Template.setFeaturedImage);
		var frag = UI.render(Template.setFeaturedImage);
		$('body').append(frag);*/

		UI.insert(UI.render(Template.setFeaturedImage), document.body);
	},
	'click #remove-image-btn':function(e){
		e.preventDefault();
		var currentSettingsId = this._id;
		Settings.update(currentSettingsId, {$set: {headerImage: ""}});
	},
	'change .resize-header-image': function(e){
		var val = $(e.target).val();
		console.log(val);
		if (val == 'yes'){
			$('.header-resize-form').slideDown();
		} else {
			$('.header-resize-form').slideUp();
			$('.header-image-height').val('');
			$('.header-image-width').val('');
		}
	}
});