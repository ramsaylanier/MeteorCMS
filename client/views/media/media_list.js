Template.media.events({
  'change .fileUploader': function (e) {
    /* Use for CollectionFS V2 when released
    FS.Utility.eachFile(e, function (file) {
      Media.insert(file);
    });
    */
  var files = e.target.files;
    Media.storeFiles(files);
  },
  'click #add-media-btn': function(e) {
    e.preventDefault();
    $('.fileUploader').click();
  },
  'click .delete-file': function(e) {
    Media.remove(this._id);
  }
});

Template.imageList.files = function(){
  return Media.find();
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

Template.insertImage.files = function(){
  return Media.find({}, { sort: { uploadDate:-1 } });
}

Template.insertImage.events({
  'click .insert-image': function(e){
    e.preventDefault();

    //set the value of the editor to include a new image
    var url = $(e.target).closest('img').attr('src');
    var oldContent = $('#editor').val();
    var newContent = oldContent + "</br><img src='" + url +"'/>";
    $('#editor').val(newContent);

    //update the iframe with the image before saving
    var iframe = $('#editor').next('iframe');
    iframe.contents().find('body').append("</br><img src='" + url +"'/>");
    $('.modal').remove();
  },
  'click .close-button': function(){
    $('.modal').remove();
  }
})

