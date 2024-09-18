const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {

  // Debug logs
  console.log('---> Inside userRoutes: Signup: router.post(/api/users)');
  console.log(req.body);
 
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Debug logs
      console.log('---> User: ' + userData.name + ' signed up');
      console.log('---> User data: ', userData);
      console.log('---> req.session.user_id: ', req.session.user_id);
      console.log('---> req.session.logged_in: ', req.session.logged_in);
      console.log('---> Returning to the caller: signupFormHandler in login.js');
      
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log('---> Failed to sign up user');
    console.error(err);
    res.status(400).json(err);
  }
});

/************************************************************/
router.post('/login', async (req, res) => {

  // Debug logs
  console.log('---> Inside userRoutes: Login: router.post(/api/users/login)');
  console.log(req.body);

  try {
    console.log('---> user name to be logged in: ', req.body.name);
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      console.log('---> User not found');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Debug log
    console.log('---> userData: ', userData);  

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('--> Incorrect password');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Debug logs
      console.log('---> User: ' + userData.name + ' Logged in');
      //console.log('---> User data: ', userData);
      console.log('---> req.session.user_id: ', req.session.user_id);
      console.log('---> req.session.logged_in: ', req.session.logged_in);
      console.log('---> Returning to the caller: loginFormHandler in login.js');
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log('---> Failed to log in user');
    console.error(err);
    res.status(400).json(err);
  }
});

/************************************************************/
router.post('/logout', (req, res) => {

  // Debug logs
  console.log('---> Inside userRoutes: Logout: router.post(/api/users/logout)');
  console.log("---> req.body: ", req.body);
  console.log("---> req.session.user_id: ", req.session.user_id);

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      //console.log('User: ' + userData.name + ' logged out');
      console.log('---> User logged out');
    });
  } else {
    console.log('---> User is not logged in and therefore cannot be logged out');
    res.status(404).end();
  }
});

module.exports = router;
