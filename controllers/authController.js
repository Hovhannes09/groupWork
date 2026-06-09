import HttpErrors from 'http-errors';
import Users from '../models/Users.js';

export default {
  async register(req, res, next) {
    try {
      const { name, email, password, fullName, role } = req.body;

      const emailUser = await Users.findOne({
        where: {
          email,
        }
      });

      if (emailUser) {
        throw new HttpErrors(422, {
          errors: {
            message: 'Email already in use.',
          },
        });
      }

      const user = await Users.create({
        name,
        email,
        password,
        fullName,
        role,
      });

      delete user.password;

      res.status(200).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.name,
          email: user.email,
        },
      });
    } catch (e) {
      next(e);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user || user.password !== Users.hash(password)) {
        throw new HttpErrors(401, {
          errors: {
            message: 'Invalid email or password',
          },
        });
      }

      req.session.user = {
        id: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
      }

      delete user.password;

      res.status(200).json({
        message: 'Logged in',
        user,
      });
    } catch (e) {
      next(e);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;

      const user = await Users.findByPk(req.session.user.id);

      if (!user || user.password !== Users.hash(oldPassword)) {
        throw new HttpErrors(404, {
          errors: {
            message: 'User not found',
          },
        });
      }

      await user.update({
        password: newPassword,
      });

      res.status(200).json({
        message: 'Password updated successfully',
      });
    } catch (e) {
      next(e);
    }
  },

  async me(req, res, next) {
    try {
      if (!req.session.user) {
        throw new HttpErrors(401, {
          message: 'Unauthorized',
        });
      }

      const user = await Users.findByPk(req.session.user.id);

      if (!user) {
        throw new HttpErrors(401, {
          message: 'Users not found',
        });
      }

      delete user.password;

      res.status(200).json({
        user,
      });
    } catch (e) {
      next(e);
    }
  },

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          next(err);
          return;
        }

        res.clearCookie('cookie.sid');

        res.status(200).json({
          message: 'Logged out',
        });
      });

    } catch (e) {
      next(e);
    }
  }
}