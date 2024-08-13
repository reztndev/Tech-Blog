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
  