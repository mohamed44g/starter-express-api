const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];

  if (!auth) {
    return res
      .status(401)
      .json({ status: "error", data: { message: "not logged in" } });
  }

  const decode = jwt.verify(auth, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: "error", data: { message: "not authorized" } });
    } else {
      next();
    }
  });
};

module.exports = verify;
