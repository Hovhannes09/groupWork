import {Users, Films, ShowTime, Bookings, Comments} from './models/index.js';

;(async () => {
  console.log('Running Migration');

  const models = [
    Users,
    Films,
    ShowTime,
    Bookings,
    Comments
  ];

  for (const model of models) {
    try {
      console.log('model -> ', model);
      await model.sync({alter: true});
    } catch (e) {
      console.error(e);
    }
  }
})();