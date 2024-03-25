import UserRepository from '../mongodb/user.repository.js';

const UserService = {
  async registerUser(userData) {
    return UserRepository.createUser(userData);
  },

  async getUserById(userId) {
    return UserRepository.findUserById(userId);
  },

  async updateUser(userId, userData) {
    return UserRepository.updateUser(userId, userData);
  },

  async deleteUser(userId) {
    return UserRepository.deleteUser(userId);
  },
};

export default UserService;
