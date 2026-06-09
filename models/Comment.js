import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';

import Films from './Film.js';
import Users from './Users.js';

class Comments extends Model {

}

Comments.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    rating: {
      type: DataTypes.BIGINT,
    },

    commentText: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize: db,
    modelName: 'comments',
    tableName: 'comments',
    timestamps: true,
  },
);



Users.hasMany(Comments, {
  foreignKey: 'userId',
  as: 'comments',
});

Comments.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
});

Films.hasMany(Comments, {
  foreignKey: 'filmId',
  as: 'comments',
});

Comments.belongsTo(Films, {
  foreignKey: 'filmId',
  as: 'film',
});

export default Comments;