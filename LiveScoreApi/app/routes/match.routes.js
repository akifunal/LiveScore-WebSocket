module.exports = app => {
  const matches = require("../controllers/match.controller.js");

  var router = require("express").Router();

  // Create a new match
  router.post("/", matches.create);

  // Retrieve all matches
  router.get("/", matches.findAll);

  // Retrieve all published matches
  router.get("/published", matches.findAllPublished);

  // Retrieve a single Match with id
  router.get("/:id", matches.findOne);

  // Update a Match with id
  router.put("/:id", matches.update);

  // Delete a Match with id
  router.delete("/:id", matches.delete);

  // Create a new Match
  router.delete("/", matches.deleteAll);

  app.use('/api/matches', router);
};