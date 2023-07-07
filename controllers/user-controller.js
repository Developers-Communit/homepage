const { UserService } = require("../services/user-service");

const getUser = async (req, res, next) => {
  const userService = new UserService();
  try {
    const users = await userService.getUserService();
    return res.render("backend/home", { users: users });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getUser };
