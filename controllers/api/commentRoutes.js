const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

/*********************************************************************************
 * /controllers/api/commentRoutes.js
 * 
 * Purpose: Create a comment
 * 
 * Caller: Add comment event handler  (public/js/comment.js)
 * Calls:  SQL INSERT INTO posts table (models/Comment.js)
 * Args:   Comment's content
 * 
 * Returns: New post data
 *  
 *********************************************************************************/

// Use withAuth middleware to prevent access to route
//router.post('/post/:id', withAuth, async (req, res) => {
router.post('/:id', withAuth, async (req, res) => {

  // Debug logs
  console.log('---> Inside commentRoutes: Create comment: router.post(/api/comments/post/:id)');
  console.log("---> req.body: ", req.body);
  console.log("---> req.session: ", req.session);
  console.log("---> req.session.user_id: ", req.session.user_id);
  console.log("---> req.params.id: ", req.params.id);

  try {
    const postId = req.params.id;
 
    const post = await Post.findByPk(postId);

    if (!post) {
      console.log("---> No post found with this id!");
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.user_id,
      postId: postId,
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

module.exports = router;
