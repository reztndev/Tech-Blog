const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
    },
    date_created: {           // restored
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    /** Not clear why the following forign key was to be
     * commented out as per Mark, given that in the index.js
     * we have the following relationship defined:
     * 
     * Comment.belongsTo(User, {
        foreignKey: 'user_id'
      });
     */

    // forign key
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
   // },
    
    /** Same arugement would hold true for the following should the following
     * relationship that is currently commented out in the index.js be uncommented:
      // Comment.belongsTo(Post, {
      //   foreignKey: 'post_id'
      // });
    */

  /**
   * As per Amazon Q, the following was uncommented as the (post_id: postId)
   * is performed after creating a new comment in commentRoutes.js. According
   * to Q, the following is needed to establish the relationship between the
   * comment and the post.  The comment will be associated with the correct post
   * based on the post_id passed in the URL parameter. The model relationship of
   * post.hasMany(Comment) relationship alone, as defined in the models/index.js 
   * file, requires the foreign key (post_id) to be defined in the comment model.
   * 
   * Its is still not clear if the additional relationship of {Comment.belongsTo(Post)}
   * ,as commented out above, is also needed. 
   */

   //foreign key 
    // post_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'post',
    //     key: 'id',
    //   },
    // }, 
   
  },
  {
    sequelize,
    //timestamps: false,    // This allows sequalize to auto generate the timestamp
    timestamps: false,      // restored after restoring date_created
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
