const mongoose = require('./connectionModel').connection;

var memeSchema = mongoose.Schema({
        memeTitle: String,
        memeTag: String ,
        memeImage: String,
        memeOwner: String,
        memePrivacy: String,
        comment:[{
          commentOwner: String,
          commentDesc: String
        }]
}); // meme schema


var memeModel = mongoose.model('meme', memeSchema); // model used for database of memes


function addMeme(memeTitle,memeTag,memeImage, memeOwner, memePrivacy, callback){
  var instance = memeModel({ memeTitle: memeTitle, memeTag: memeTag,memeImage: image, memeOwner: memeOwner, memePrivacy: memePrivacy });
  instance.save(function (err) {
    if(err) return console.error(err);
    callback();
  });
}

function pushMeme(meme){
    var m = new memeModel(meme);
    m.save();
}



function pushComment(search, comment){
  memeModel.findOneAndUpdate({
    _id: search
    },{
    $push: {comment: comment}
  }).then();
}

function viewMeme(callback){
  memeModel.find({}, function (err, list) {
    if(err) return console.error(err);
    callback(list);
  });
}

function viewComment(search, callback){
  memeModel.findOne({_id: search},{comment: 1}).then((list) => {
    callback(list);
  }, (err) => {

  })
}

function searchMeme(search, callback){
  memeModel.find({memeTag: {$regex: search, $options: 'i'}}, function (err, list) {
    if(err) return console.error(err);
    callback(list);
  });
}

function searchOwner(search, callback){
  memeModel.find({memeOwner: {$regex: search, $options: 'i'}}, function (err, list) {
    if(err) return console.error(err);
    callback(list);
  });
}

function editMeme(id, memeTitle, memeTag, memeImage, memePrivacy){
  memeModel.findOneAndUpdate({
                    _id: id
                    },{
                    memeTitle, memeTag, memeImage, memePrivacy
                  }).then();
}
function deleteMeme(search){
  memeModel.remove({
                    _id:search
                  }).then();
}
    
function findMeme(id){
    return memeModel.findOne({_id:id});
}
// first input is search]
module.exports.editMeme = editMeme;
module.exports.searchOwner = searchOwner;
module.exports.searchMeme = searchMeme;
module.exports.pushMeme = pushMeme;
module.exports.addMeme = addMeme;
module.exports.viewMeme = viewMeme;
module.exports.findMeme = findMeme;
module.exports.viewComment = viewComment;
module.exports.pushComment = pushComment;
module.exports.deleteMeme = deleteMeme;