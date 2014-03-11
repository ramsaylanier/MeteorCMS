Template.addMedia.events({
  'change .fileUploader': function (e) {
    var files = e.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Media.insert(files[i], function (err, id) {
        //Inserted new doc with _id = id, and kicked off the data upload using DDP
      });
    }
  },
  'click #add-media-btn': function(e) {
    e.preventDefault();
    $('.fileUploader').click();
  },
  'click .delete-file': function(e) {
    Media.remove(this._id);
  }
});

Template.addMedia.files = function() {
  //show all files that have been published to the client, with most recently uploaded first
  var files = $('.fileUploader').files;
  return Media.find(files);
};

Template.imageList.files = function(){
  return Media.find({}, { sort: { uploadDate:-1 } });
}

Template.imageList.events({
  'click .delete-file': function(e){
    Media.remove(this._id);
  }
});

Template.setFeaturedImage.files = function(){
  return Media.find({}, { sort: { uploadDate:-1 } });
}

Template.setFeaturedImage.events({
  'click .set-featured-image': function(e){
    e.preventDefault();
    var url = $(e.target).closest('img').attr('src');
    $('body').find('[name=featured-image]').val(url);
    $('.media-image').attr('src', url);
    $('.modal').remove();
  },
  'click .close-button': function(){
    $('.modal').remove();
  }
})

