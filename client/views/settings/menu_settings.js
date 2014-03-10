Template.menuSettings.helpers({
	pages: function(){
		return Pages.find();
	},
	menus: function(){
		return Menus.find();
	},
	menuLinks: function(){
		var title = Session.get("currentMenuTitle");
		return Menus.findOne({title: title}, {fields: {'links': 1}}); 
	},
	currentMenuTitle: function(){
		return Session.get("currentMenuTitle");
	}
});

Template.menuSettings.events({
	'change .menu-select': function(){
		var title = $('.menu-select').val();
		Session.set("currentMenuTitle",title);
	},
	'click .page-menu-option': function(e){
		e.preventDefault();
		var link = $(e.target).html();
		var linkURL = "/" + encodeURI(link.replace(/\s+/g, '-')).toLowerCase();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.update({_id: menu._id}, {$addToSet: {links: {linkTitle: link, linkURL: linkURL, linkType: "Page"}}});
	},
	'click .remove-menu-link': function(e){
		e.preventDefault();
		var link = $(e.target).attr('data-link');
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.update({_id: menu._id}, {$pull: {links: {linkTitle: link}}});
	},
	'click .add-link-button': function(e){
		e.preventDefault();
		var link = $('.link-name').val();
		var linkURL = encodeURI($('.link-url').val().replace(/\s+/g, '-')).toLowerCase();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.update({_id: menu._id}, {$addToSet: {links: {linkTitle: link, linkURL: linkURL, linkType: "Custom"}}});
	},
	'click .update-link-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		var originalTitle = $(e.target).attr('data-title');
		var linkAttributes = {
			linkTitle: $(e.target).parent().find('.update-link-title').val(),
			linkURL: encodeURI($(e.target).parent().find('.update-link-url').val().replace(/\s+/g, '-')).toLowerCase(),
			linkType: $(e.target).parent().find('.update-link-type').val()
		}
		console.log(linkAttributes.linkTitle);

		Meteor.call('updateLink', menu, originalTitle, linkAttributes, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} else{
				throwError('Updated!', 'success');
			}
		});
	},
	'click .save-menu-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		var title = $('.menu-name').val();
		var location = $('.menu-location').val();
		Menus.update({_id: menu._id}, {$set: {title: title, location: location}});
	},
	'click .add-menu-button': function(e){
		e.preventDefault();
		var title = {title: $('.new-menu-title').val()};
		Meteor.call('addMenu', title, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} else {
				throwError('Menu Added!', 'success');
			}
		});
	},
	'click .delete-menu-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.remove(menu._id);
	}
});

Template.menuSettings.rendered = function(){
	var title = $('.menu-select').val();
	Session.set("currentMenuTitle",title);
}