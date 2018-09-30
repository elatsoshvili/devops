module.exports = function(req, res, next) {
  res.contentType = "json";
  res.send({ message: "Hello Devops Georgia Day 2 Hi" });
  next();
};
