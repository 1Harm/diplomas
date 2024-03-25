import User from '../mongodb/models/user.js';

const UserRepository = {
  async createUser(userData) {
    return User.create(userData);
  },

  async findUserById(userId) {
    return User.findById(userId);
  },

  async updateUser(userId, userData) {
    return User.findByIdAndUpdate(userId, userData, { new: true });
  },

  async deleteUser(userId) {
    return User.findByIdAndDelete(userId);
  },
};

export default UserRepository;
