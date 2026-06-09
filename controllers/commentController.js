import HttpErrors from "http-errors";

import Comment from '../models/Comment.js';
import Booking from '../models/booking.js';
import ShowTime from '../models/Showtime.js';
import Users from '../models/Users.js';

const PAGE_SIZE = 10;

export default {
  async createComment(req, res, next) {
    try {
      const {filmId, rating, commentText} = req.body;

      const existingComment = await Comment.findOne({
        where: {
          userId: req.session.user.id,
          filmId,
        },
      });

      if (existingComment) {
        throw new HttpErrors(400, {
          errors: {
            message: 'You already reviewed this film',
          },
        });
      }

      const booking = await Booking.findOne({
        where: {
          userId: req.session.user.id,
          status: 'confirmed',
        },
        include: [
          {
            model: ShowTime,
            as: 'showtime',
            where: {
              filmId,
            },
          },
        ],
      });

      if (!booking) {
        throw new HttpErrors(403, {
          errors: {
            message: 'You must watch this film first',
          },
        });
      }

      const comment = await Comment.create({
        userId: req.session.user.id,
        filmId,
        rating,
        commentText,
        status: 'approved',
      });

      res.status(200).json(comment);
    } catch (e) {
      next(e);
    }
  },

  async getFilmComments(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;

      const {count, rows} = await Comment.findAndCountAll({
        where: {
          filmId: req.params.filmId,
          status: 'approved',
        },
        include: [
          {
            model: Users,
            as: 'user',
            attributes: ['id', 'name'],
          },
        ],
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
        comments: rows,
        pagination: {
          page,
          totalPages: Math.ceil(count / PAGE_SIZE),
          totalResults: count,
        },
      });
    } catch (e) {
      next(e);
    }
  },

  async updateComment(req, res, next) {
    try {
      const comment = await Comment.findOne({
        where: {
          id: req.params.id,
          userId: req.session.user.id,
        },
      });

      if (!comment) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Comment not found',
          },
        });
      }

      await comment.update({
        rating: req.body.rating,
        commentText: req.body.commentText,
      });

      res.status(200).json({
        message: 'Comment successfully updated',
        comment,
      });
    } catch (e) {
      next(e);
    }
  },

  async deleteComment(req, res, next) {
    try {
      const comment = await Comment.findOne({
        where: {
          id: req.params.id,
          userId: req.session.user.id,
        },
      });

      if (!comment) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Comment not found',
          },
        });
      }

      await comment.destroy();

      res.status(200).json({
        message: 'Comment deleted successfully',
      });
    } catch (e) {
      next(e);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const comment = await Comment.findByPk(req.params.id);

      if (!comment) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Comment not found',
          },
        });
      }

      await comment.update({
        status: req.body.status,
      });

      res.json(comment);
    } catch (e) {
      next(e);
    }
  },
}