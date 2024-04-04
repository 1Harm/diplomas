import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../application/user.service.js';

const AuthController = {
  async signUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserService.registerUser({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({ token });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default AuthController;
