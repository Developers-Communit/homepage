const bcrypt = require("bcrypt");
const { UserRepository } = require("../repositories/user/user-repository");

class UserService {
  constructor() {
    // MENGGUNAKAN USER REPOSITORY
    this.userRepository = new UserRepository();
  }

  async getUserService() {
    try {
      // console.log(await this.userRepository.getUsers());
      return await this.userRepository.getUsers();
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = { UserService };
