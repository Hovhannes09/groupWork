import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.sequelize.js';

class Film extends Model {

}

Film.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.TEXT,
    },

    genre: {
      type: DataTypes.STRING,
    },

    duration: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'films',
    tableName: 'films',
    timestamps: true,
  },
);


export default Film;