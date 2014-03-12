Template.menuSettings.helpers({
	menus: function(){
		return Menus.find();
	},
	isSelected: function(title){
		var currentTitle = Session.get("currentMenuTitle");
		console.log(currentTitle);
		console.log(title);
		if (currentTitle == title){
			return "selected='selected'";
		}
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
	'click .categories-menu-option': function(e){
		e.preventDefault();
		var link = $(e.target).html();
		var linkURL = "/category/" + encodeURI(link.replace(/\s+/g, '-')).toLowerCase();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.update({_id: menu._id}, {$addToSet: {links: {linkTitle: link, linkURL: linkURL, linkType: "Category"}}});
	},
	'click .remove-menu-link': function(e){
		e.preventDefault();
		$(e.target).parents('li').remove();
	},
	'click .add-link-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		var link = $('.link-name').val();
		var linkURL = encodeURI($('.link-url').val().replace(/\s+/g, '-')).toLowerCase();
		var linkAttributes = {
			linkTitle: $('.link-name').val(),
			linkURL: encodeURI($('.link-url').val().replace(/\s+/g, '-')).toLowerCase(),
			linkType: "Custom"
		}		

		Meteor.call('addLink', menu, linkAttributes, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			}
		});
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

		Meteor.call('updateLink', menu, originalTitle, linkAttributes, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} else{
				throwError('Updated!', 'success');
			}
		});
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
	}
});

Template.menuSettings.created = function(){
	var title = Menus.findOne().title;
	console.log("created " + title);
	Session.set("currentMenuTitle", title);
}

Template.menuChoices.helpers({
	categories: function(){
		return Categories.find();
	}
});

Template.menuLayout.helpers({
	menuLinks: function(){
		var title = Session.get("currentMenuTitle");
		return Menus.findOne({title: title}, {fields: {'links': 1}}); 
	},
	currentMenuTitle: function(){
		return Session.get("currentMenuTitle");
	},
	isSelected: function(location){
		var menuLocation = Menus.findOne({title: Session.get("currentMenuTitle")}).location;
		if (location == menuLocation){
			return "selected='selected'";
		}
	}
});

Template.menuLayout.events({
	'click .save-menu-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		var menuAttributes = {
			title: $('.menu-name').val(),
			location: $('.menu-location').val()
		}

		//get all the links and their attributes and store them as objects in an array
		var links = [];
		var i = 0;
		$('.menu-links-list').children().children('li').each(function(){
			links[i++] = {
				linkTitle: $(this).find('.update-link-title').val(),
				linkType: $(this).find('.update-link-type').val(),
				linkURL: $(this).find('.update-link-url').val()
			}
		});

		Meteor.call('updateMenu', menu._id, menuAttributes, links, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} else{
				throwError('Menu updated!', 'success');
			}
		});
	},
	'click .delete-menu-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.remove(menu._id);
	}
})