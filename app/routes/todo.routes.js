const { authJwt } = require("../middlewares");
const controller = require("../controllers/todo.controller");

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

  app.get("/api/todo", [authJwt.verifyToken], controller.findAllTodo);

  app.post("/api/todo", [authJwt.verifyToken], controller.createTodo);

  app.delete("/api/todo", [authJwt.verifyToken], controller.deleteTodo);

  app.patch("/api/todo", [authJwt.verifyToken], controller.patchTodo);

  app.get("/api/userTodo", [authJwt.verifyToken], controller.findAllTodoUsers);
};
