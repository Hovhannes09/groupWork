import ShowTime from '../models/Showtime.js';
import HttpErrors from "http-errors";
import Films from '../models/Film.js';

export default {
  async createShowtime(req, res, next) {
    try {
      const {filmId, showDate, showTime, price} = req.body;

      const film = await Films.findByPk(filmId);

      if (!film) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Film not found',
          },
        });
      }

      const showtime = await ShowTime.create({
        filmId,
        showDate,
        showTime,
        price,
      });

      res.status(200).json(showtime);
    } catch (e) {
      next(e);
    }
  },

  async getShowtime(req, res, next) {
    try {
      const showTimes = await ShowTime.findAll({
        include: [
          {
            model: Films,
            as: 'Film',
          },
        ],
      });

      res.status(200).json(showTimes);
    } catch (e) {
      next(e);
    }
  },

  async deleteShowtimes(req, res, next) {
    try {
      const showTime = await ShowTime.findByPk(req.params.id);

      if (!showTime) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Showtime not found',
          },
        });
      }

      await showTime.destroy();

      res.json({
        message: 'Showtime deleted successfully',
      });
    } catch (e) {
      next(e);
    }
  }
}