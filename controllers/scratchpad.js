/**
 * The issue with your code is that you have two separate include arrays. 
 * In Sequelize, you should combine all the models you want to include in a 
 * single include array. Here’s the corrected code:
 */

router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment,
            attributes: ['id', 'content', 'date_created', 'user_id'],
          },
        ],
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Previously suggest by Amazon Q:
  // //attributes: ['id', 'comment_text', 'post_id', 'user_id'],
  
  // Updated implementation as per Mark
  // Get single post
  router.get('/post/:id', async (req, res) => {
    console.log("req.param.id:", req.params.id);
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
  
      if (!postData) {
        console.log("No postData found with this id!");  
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      const post = postData.get({ plain: true });
  
      console.log(post);
  
      res.render('post-detail', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Runtime logs
// ******************* Populating homepage: *********************************

// ---> Passing the post(s) to (homepage):  
[
  {
    id: 1,
    title: 'Why MVC is so important',
    content: 'MVC allows developers to maintain a true separation of concerns, 
    devising their code between the Model layer for data, the View layer for design, 
    and the Controller layer for application logic.',
    date_created: 2024-08-15T19:05:40.283Z,
    user_id: 1,
    user: { name: 'Amiko' }
  },  
]

// ***************** Getting a single post by id: **************************
/**
 * Displayed in in post-detail.handlebars
 *
 * Why MVC is so important
MVC allows developers to maintain a true separation of concerns, 
devising their code between the Model layer for data, the View layer 
for design, and the Controller layer for application logic.

Created by Amiko on 8/15/2024

Inside: post-detail.handlebars

* Runtime log:

---> Cleanded up post:  {
  id: 1,
  title: 'Why MVC is so important',
  content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
  date_created: 2024-08-15T19:05:40.283Z,
  user_id: 1,
  user: {
    id: 1,
    name: 'Amiko',
    password: '$2b$10$kcMMmUKEaIxcMHST6zi66urMjOhbtu9WRVIyPMicxaQKbV1gqrer2'
  },
  comments: []
}
 */

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

    ---> Cleaned up userData:  { id: 4, name: 'Farah', posts: [] }