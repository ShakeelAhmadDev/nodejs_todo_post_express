const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Headers", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
  });

  app.post("/api/post", [authJwt.verifyToken], controller.createPost);
  app.post("/api/comment", [authJwt.verifyToken], controller.createComment);

  app.get("/api/getPostComment", [authJwt.verifyToken], controller.getComments);
};
