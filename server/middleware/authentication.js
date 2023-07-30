const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

const authentication = (req, res, next) => {
  const userJwt = req.headers.authorization;
  if (userJwt) {
    const token = userJwt.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      req.userId = user.id;
      console.log(user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authentication, SECRET };
