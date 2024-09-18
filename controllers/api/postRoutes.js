const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

/*********************************************************************************
 * /controllers/api/postRoutes.js
 * 
 * Purpose: Create a new post
 * 
 * Caller: New post event handler  (public/js/dashboard.js)
 * Calls:  SQL INSERT INTO posts table (models/Post.js)
 * Args:   Post title, description
 * 
 * Returns: New post data
 *  
 *********************************************************************************/

// Use withAuth middleware to prevent access to route
router.post('/', withAuth, async (req, res) => {

  // Debug logs
  console.log('---> Inside postRoutes: Create post: router.post(/api/posts)');
  console.log("---> req.body: ", req.body);
  console.log("---> req.session.user_id: ", req.session.user_id);

  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
    console.log("newPost created: ", newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/*********************************************************************************
 * /controllers/api/postRoutes.js
 * 
 * Purpose: Delete a post
 * 
 * Caller: Delete a post event handler  (public/js/dashboard.js)
 * Calls:  SQL DELETE FROM posts table  (models/Post.js)
 * Args:   Post id
 * 
 * Returns: Deleted post data
 *  
 *********************************************************************************/

// Use withAuth middleware to prevent access to route
router.delete('/:id', withAuth, async (req, res) => {

  // Debug logs
  console.log(`---> Inside postRoutes: Delete post by id: router.post(/api/posts/:${req.params.id})`);
  console.log("---> req.params.id: ", req.params.id);
  console.log("---> req.session.user_id: ", req.session.user_id);
  console.log("---> req.body: ", req.body);

  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      console.log("---> No postData returned from Post.destroy()");
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.log('---> Post could not be deleted');
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
