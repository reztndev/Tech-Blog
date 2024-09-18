const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Not clear why the following relationship had to be removed given that 
// A user can have many posts
//  
User.hasMany(Post, {
  //foreignKey: 'user_id',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

/**
 * The onDelete statement should be kept.  Here is why:
 * Here’s a breakdown:

Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' }): 
This sets up a foreign key relationship where each Post belongs to a User.
onDelete: 'CASCADE': When a User is deleted, all Post records with the 
corresponding userId are also deleted.
 */
Post.belongsTo(User, {
  //foreignKey: 'user_id',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

/** Conclusion:
 * Both scenarios work when retrieving a single post:
 * 1. User.hasMany(Post,..) + Post.belongsTo(User,..), or
 * 2. Post.belongsTo(User, ..) only
 * 
 * However, when sign up a new user and end up redirecting to 
 * /dashboard, the following error occurs:
 * 
 * EagerLoadingError [SequelizeEagerLoadingError]: post is not associated to user!
 * 
 * Hence, restored the above: User.hasMany(Post, {...
 * 
 * REMEMBER: Re-seed the db after making changes in the models
 */

/***************************************************** */

// User.hasMany(Comment, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

Comment.belongsTo(User, {
  foreignKey: 'userId'
});

/***************************************************** */

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// Comment.belongsTo(Post, {
//   foreignKey: 'post_id'
// });

module.exports = { User, Post, Comment };
