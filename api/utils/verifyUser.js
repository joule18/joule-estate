import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

const verifyToken = (req, res, next) => {
  console.log("hello token");
  const token = req.cookies.access_token;
  if (!token) {
    next(errorHandler(401, "User unauthorized."));
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Access is forbidden."));
    }
    req.user = user;
    next();
  });
};

export { verifyToken };
