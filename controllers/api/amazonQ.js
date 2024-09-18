/* To associate the newly created comment with the post ID that was passed in, 
   you need to use the Post.hasMany association defined in your models. Here's 
   how you can modify your code:
*/

// Model setup:
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// Router setup:
const apiRoutes = require('./api');
router.use('/api', apiRoutes);
const commentRoutes = require('./commentRoutes');
router.use('/comments', commentRoutes);

// Code for creating a new Comment:
router.post('/post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: postId,
    });

    // Associate the new comment with the post
    await post.addComment(newComment);

    res.status(200).json(newComment);
    console.log("newComment created: ", newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/**
   * Here's what the changes do:

    1. First, we retrieve the 
    postId
    from the request parameters: 
    const postId = req.params.id;
    

    2. Then, we find the post by its primary key using 
    Post.findByPk(postId) This retrieves the post instance 
    from the database.

    3. If the post is not found, we return a 404 error.

    4. When creating the new comment, we include the 
    post_id in the comment data: post_id: postId

    5. After creating the new comment, we use the post.addComment(newComment)
    method to associate the new comment with the post instance. This method 
    is available because of the Post.hasMany(Comment) association defined in
    your models.

    Finally, we return the newly created comment as a JSON response.

    Note: This solution assumes that you have defined the Post.hasMany(Comment) 
    association in your models.

    By following these steps, each new comment will be associated with the correct 
    post based on the post_id passed in the URL parameter.

    Note: Make sure that the post_id field exists in your Comment model, 
    and that the association between Post and Comment is correctly defined in your models.
   */

/* Question: How can you handle cases where multiple comments have the same post ID? 
   You can modify the code to handle this scenario by using a different association method
   or adding additional logic. Here's an example of how you could modify the code to handle
   multiple comments for the same post:

   const Post = require('./models/Post');
*/

/**
 * To handle cases where multiple comments can have the same post ID, you need to ensure that 
 * the combination of post_id and another unique identifier (e.g., a comment ID) is unique in your database. This can be
   achieved by creating a composite unique index on the Comment model. [1]

Here's how you can modify your code to handle this scenario:

1. In your Comment model, add a unique composite index on post_id and id (assuming 
   id is the primary key for comments):
 */

// models/Comment.js
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init(
  {
    // Comment model attributes
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Other attributes
  },
  {
    sequelize,
    modelName: 'comment',
    indexes: [
      {
        unique: true,
        fields: ['post_id', 'id'],
      },
    ],
  }
);

module.exports = Comment;

/**
 * 2. In your router code, you don't need to make any changes. The unique composite index will 
 *    ensure that no two comments can have the same post_id and id combination.
 */

router.post('/post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: postId,
    });

    await post.addComment(newComment);

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/**
 * With this setup, if you try to create a new comment with the same post_id and id
   combination as an existing comment, the database will throw a unique constraint violation 
   error, preventing the creation of a duplicate comment.

   Note that if you want to use a different unique identifier for comments instead of the 
   id column, you can modify the composite index accordingly. For example, if you have a 
   comment_id column, you can create the index on post_id and comment_id.
 */

/**
 * Question: How can you handle scenarios where multiple comments have the same post ID and 
 * unique comment identifier (other than a comment ID) in the database?
 */

/**
 * To handle scenarios where multiple comments can have the same post ID and a unique comment 
 * identifier (other than a comment ID), you can create a composite unique index on the 
 * Comment model using the post_id and the unique comment identifier column.
 * Let's assume that the unique comment identifier is a uuid (Universally Unique Identifier) 
 * column in the Comment
 *  model. Here's how you can modify your code.
 * 
 * 1. In your Comment model, add a unique composite index on post_id and uuid:
 */

// models/Comment.js
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init(
  {
    // Comment model attributes
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    // Other attributes
  },
  {
    sequelize,
    modelName: 'comment',
    indexes: [
      {
        unique: true,
        fields: ['post_id', 'uuid'],
      },
    ],
  }
);

module.exports = Comment;

/**
 * In this example, we've added a uuid column to the Comment model, which will store a 
 * unique identifier for each comment. We've also created a unique composite index 
 * on post_id and uuid.
 * 
 * 2. In your router code, when creating a new comment, you don't need to explicitly set the 
 * uuid value, as it will be automatically generated and set by the defaultValue: DataTypes.UUIDV4 
 * option in the model.
 */

router.post('/post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: postId,
    });

    await post.addComment(newComment);

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/**
 * With this setup, each comment will have a unique 
 * uuid value, and the combination of post_id and uuid will be unique in the database. 
 * If you try to create a new comment with the same post_id and uuid combination as an 
 * existing comment, the database will throw a unique constraint violation error, 
 * preventing the creation of a duplicate comment. 
 * 
 * Note that you can use any other unique identifier column instead of uuid, as long as 
 * you create a composite unique index on post_id and that unique identifier column in 
 * the Comment model.
 */
