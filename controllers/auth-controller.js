const { AuthService } = require("../services/auth-service");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async register(req, res, next) {
    try {
      await this.authService.register(req.body, res);

      return res.redirect("/login");
    } catch (e) {
      next(e);
      // console.error(e);
      return res.render("register", {
        error: e.message,
      });
    }
  }

  async login(req, res) {
    try {
      await this.authService.authenticateUser(req, res);
      req.session.islogin = true;
      return res.redirect("/");
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = { AuthController };
