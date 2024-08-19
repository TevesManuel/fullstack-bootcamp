const blogController = require("./../controllers/Blog");
const blogRouter = require("express").Router();

blogRouter.get("/", async (request, response) => {
  return response.status(200).json(await blogController.getAll());
});

blogRouter.post("/", async (request, response) => {
  if (request.token)
    return response.status(201).json(await blogController.create(request.body));
  else return response.status(401).json({ error: "You don't give token." });
});

blogRouter.post("/:id/comments", async (request, response) => {
  if (request.token) {
    return response
      .status(200)
      .json(await blogController.comment(request.body));
  } else {
    return response.status(401).json({ error: "You don't give token." });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  if (request.token) {
    if (
      await blogController.belongTo(
        request.params.id,
        request.body.decodedToken.id
      )
    ) {
      await blogController.deleteById(request.params.id);
      return response.sendStatus(204).end();
    } else {
      return response
        .status(400)
        .json({
          error: "Blog not belong to user",
        })
        .end();
    }
  } else return response.status(401).json({ error: "You don't give token." });
});

blogRouter.put("/:id", async (request, response) => {
  await blogController.update(request.params.id, request.body);
  response.sendStatus(200).end();
});

module.exports = blogRouter;
