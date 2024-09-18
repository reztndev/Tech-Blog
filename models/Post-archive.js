const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    // The following removed because we have commented out (timestamps: false) down below
    // date_created: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },

    // restored due to undefined date issue in format_date in helpers.js
    /** After restoring date_created, still observed runtime errors in format_date helper
     * function.  It worked however without the first glitch of now showing the posts due to
     * error encountered with removal of it.  So the blow works, but the following is the 
     * runtime logs:
     * Inside helper.js: Date:  2024-08-14T19:01:11.615Z
        Inside helper.js: Date:  undefined
        Inside helper.js: Invalid Date
        Inside helper.js: Date:  2024-08-14T19:01:11.615Z
        Inside helper.js: Date:  2024-08-14T19:01:11.617Z
        Inside helper.js: Date:  undefined
        Inside helper.js: Invalid Date
     */
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    /**
     * Not clear why user_id forign key had to be removed given
       that in the (models/index) we have retained the relationship:

       Post.belongsTo(User, {
       foreignKey: 'userId',
       onDelete: 'CASCADE'
       });
     */
    /** Restored the following forign key for user given the runtime logs after retrieving
     * all the posts in the homepage which showed null for user and its id:
     * Passing the post(s) to (homepage):  [
      {
        id: 1,
        title: 'Why MVC is so important',
        content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
        date_created: 2024-08-14T19:01:11.609Z,
        userId: null,
        user: null

        *--> Actually, the re-seeding of db fixed the userId = null problem
      },
     */
    // Still a good question as to why the following forign key is to be omitted
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
    /* After signing up a new user via signupFormHandler and calling /api/users in
    in userRoutes, the user was signed up successfully, and returned to the calling
    signupFormHandler in login.js which then replaced the route to /dashboard-1 in 
    homeRoutes.  The /dashboard-1 then tried to perfom the following to find the user:

        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Post }],
        });

    This reulsted in the following runtime error:

      Inside homeRoutes: Get Dashboard for logged in user: router.get(/dashboard-1, withAuth)
      req.session.user_id:  4
      EagerLoadingError [SequelizeEagerLoadingError]: post is not associated to user!  <--- Error
    */
    // As such, restored the forign key below to see if it would fix the problem
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },

  },

  {
    sequelize,
    //timestamps: false,
    timestamps: false,    // restored since using date_created above
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
