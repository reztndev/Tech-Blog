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
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    /** 
     * After singing up a user, when the /dashboard-1 tries to perfom the 
     * following to find the user:

        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Post }],
        });

      We get the following runtime error:

      EagerLoadingError [SequelizeEagerLoadingError]: post is not associated to user!
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
