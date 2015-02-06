var config = require('../config/database');
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Post = thinky.createModel('Posts', {
    id: String,
    title: String,
    _slug: {
      _type: String,
      enforce_missing: true
    },
    content: String,
    type: String,
    profileImage: String,
    displayName: String,
    username: String,
    author_id: String,
    postmetadata: {
      reads: {
        _type: Number,
        default: 0
      },
      likes: {
        _type: Number,
        default: 0
      },
      creation_date: {
        _type: Date,
        default: r.now()
      },
      publish_date: {
        _type: Date,
        default: r.now()
      },
      last_updated_date: {
        _type: Date,
        default: r.now()
      },
      time_to_read: Number
    }
});


Post.docAddListener('save', function(post) {
    console.log( 'A new post has been saved' );
});

Post.ensureIndex('_slug');


module.exports = Post;
