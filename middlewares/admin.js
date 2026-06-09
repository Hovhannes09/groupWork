import HttpErrors from "http-errors";

export default (req, res, next) => {
  console.log("session →", req.session);
  console.log("session.user →", req.session.user);
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
