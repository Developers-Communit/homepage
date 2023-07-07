const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

const { UserRepository } = require("../repositories/user/user-repository");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(request) {
    try {
      console.log("masuk auth service");
      // MENGAMBIL USER DGN USERNAME YANG DIMINTA
      const user = await this.userRepository.getUserCredentials(request);
      console.log("mengambil data user");
      // MENGECEK KESAMAAN PASSWORD
      const isPasswordCorrect = await bcrypt.compare(
        request.password,
        user.password
      );
      // JIKA BENAR RETURN TRUE
      if (isPasswordCorrect) {
        return true;
      }
      // SALAH MAKA FALSE
      return false;
    } catch (error) {
      console.error(error);
    }
  }

  async register(request) {
    const { username, email, password } = request;

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      username: username,
      password: hashedPassword,
      email: email,
    };

    try {
      // MENDAFTARKAN USER
      if (!username || !email || !password) {
        console.log("Username, email, dan password harus diisi.");
        return; // Menghentikan proses pendaftaran jika ada data yang kosong
      }

      this.userRepository.createUser(data);
      console.log("Berhasil Daftar");
    } catch (error) {
      console.error(error);
    }
  }
  async authenticateUser(req, res) {
    const { username, password } = req.body;

    // MENCARI USER
    const user = await this.userRepository.getUserCredentials(username);
    if (!user) {
      return new Error("User not found");
    }

    // MENGECEK PASSWORD
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new Error("Username atau Password Salah!");
    }

    // BUAT & SIMPAN TOKEN
    const token = uuid();
    res.cookie("authToken", token, { maxAge: 86400000, httpOnly: true });

    return "Login Berhasil";
  }
}
module.exports = { AuthService };
