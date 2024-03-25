const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const add = async (req, res, next) => {
  const { nickname, email, password } = req.body;
  try {
    const hashPassword = await argon2.hash(password);
    const user = await tables.user.create({
      nickname,
      email,
      hashPassword,
    });
    if (user.affectedRows === 0) {
      res.status(403).json({ error: "user not created" });
    } else {
      res.status(201).json({ id: user, nickname, email });
    }
    next();
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await tables.user.readByEmail(email);
    if (user == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(user.hash_password, password);
    if (verified) {
      delete user.hash_password;

      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .cookie("user_token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 300000, // 5 minutes
        })
        .json({ token, user });
    } else {
      res.status(403).json({ error: "mot de passe ou identifiant incorrect" });
    }
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};
const logout = (req, res) => {
  res
    .clearCookie("user_token", { httpOnly: true, path: "/", maxAge: 0 })
    .sendStatus(200);
};

// eslint-disable-next-line consistent-return
const getUser = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.APP_SECRET);
    const user = await tables.user.read(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    delete user.hash_password;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    next(err);
  }
};
module.exports = {
  add,
  login,
  logout,
  getUser,
};
