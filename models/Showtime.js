import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';

import Films from './Film.js';

class ShowTime extends Model {

}

ShowTime.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    showDate: {
      type: DataTypes.DATEONLY,
    },

    showTime: {
      type: DataTypes.TIME,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
    }
  },
  {
    sequelize: db,
    modelName: 'showTimes',
    tableName: 'showtime',
    timestamps: true,
  },
);


Films.hasMany(ShowTime, {
  foreignKey: 'filmId',
  as: 'showtime',
});

ShowTime.belongsTo(Films, {
  foreignKey: 'filmId',
  as: 'film',
});

export default ShowTime;