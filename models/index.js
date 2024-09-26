const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A user can have many posts
User.hasMany(Post, {
  //foreignKey: 'user_id',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  //foreignKey: 'user_id',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
