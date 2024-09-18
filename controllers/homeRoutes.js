const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

/************************************************************/
router.get('/', async (req, res) => {

  // Debug logs
  console.log('---> Inside homeRoutes: Get all posts: router.get(/)');
  //console.log(req.body);

  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log("---> Passing the post(s) to (homepage): ", posts);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/************************************************************/
router.get('/post/:id', async (req, res) => {

  // Debug logs
  console.log(`---> Inside homeRoutes: Get post by id: router.get(/post/:/${req.params.id})`);
  console.log("---> req.params.id: ", req.params.id);
  //console.log("req.body: ", req.body);

  try {
    // const postData = await Post.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //     // {
    //     //   model: Comment,
    //     //   //attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
    //     //   attributes: ['id', 'content', 'date_created', 'user_id'],
    //     // },
    //   ],
    // });

    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    /** The above works. Here is the log after a fetching the post by its id:
     * Cleanded up post:  {
        id: 1,
        title: 'Why MVC is so important',
        content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
        date_created: 2024-08-14T21:49:22.217Z,
        user_id: 2,
        user: {
          id: 2,
          name: 'Sal',
          password: '$2b$10$3OLJCwFzNSpcPYs8riP5DOkN9vWyeWiy1C8VnjrorgKPGx7.n2Up2'
        },
        comments: []
      }
     */

    if (!postData) {
      console.log("---> No postData found with this id!");  
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    // Debug logs
    console.log("---> Cleanded up post: ", JSON.stringify(post, null, 2) );
    console.log("---> Sending the post to (post-detail) template");

    res.render('post-detail', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("---> Failed to get the post by id");
    console.log(err);
    res.status(500).json(err);
  }
});

/************************************************************/
// Use withAuth middleware to prevent access to route
router.get('/dashboard-1', withAuth, async (req, res) => {

// Debug logs
console.log(`---> Inside homeRoutes: Get Dashboard for logged in user: router.get(/dashboard-1, withAuth)`);
console.log("---> req.session.user_id: ", req.session.user_id);
console.log("---> req.body: ", req.body);

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log("---> Cleaned up userData: ", user);
    console.log("---> Sending the userData, including user's posts, to (dashboard-1) template");

    res.render('dashboard-1', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    // EagerLoadingError [SequelizeEagerLoadingError]: post is not associated to user!
    res.status(500).json(err);
  }
});

/************************************************************/
router.get('/login', (req, res) => {

  // Debug logs
  console.log("---> Inside homeRoutes: Login: router.get(/login)");  

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    console.log("---> User is already logged in. Redirecting to (/dashboard-1)");
    res.redirect('/dashboard-1');
    return;
  }

  console.log("---> Rendering the (login) template for user to log in");
  res.render('login');
});

module.exports = router;
