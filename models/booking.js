import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';

import Users from './Users.js';
import ShowTimes from './Showtime.js';

class Bookings extends Model {

}

Bookings.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    seats: {
      type: DataTypes.STRING,
    },

    totalPrice: {
      type: DataTypes.DECIMAL,
    },

    bookingReferance: {
      type: DataTypes.STRING,
    },

    bookingDate: {
      type: DataTypes.DATE,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: 'cancelled',
    }
  },
  {
    sequelize: db,
    modelName: 'bookings',
    tableName: 'bookings',
    timestamps: true,
  },
);


Users.hasMany(Bookings, {
  foreignKey: 'userId',
  as: 'bookings',
});

Bookings.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
});


ShowTimes.hasMany(Bookings, {
  foreignKey: 'showtimeId',
  as: 'bookings',
});

Bookings.belongsTo(ShowTimes, {
  foreignKey: 'showtimeId',
  as: 'showtime',
});


export default Bookings;