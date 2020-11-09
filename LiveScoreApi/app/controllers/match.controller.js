const db = require("../models");
const Match = db.matches;
const Op = db.Sequelize.Op;


// Create and Save a new Match
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Match
  const match = {
    title: req.body.title,
    score: req.body.score,
    published: req.body.published ? res.body.published : false
  };

  // Save Match in the database
  Match.create(match)

    .then(data => {
      let io = req.app.get('io');
      io.emit('CreatedMatch', data);
      console.log("!!!!!!! Update match event activated from front-end.");
      // console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Match."
      });
    });
};

// Retrieve all Matches from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
    title: {
      [Op.like]: `%${title}%`
    }
  } : null;

  Match.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving matches."
      });
    });
};

// Find a single Match with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Match.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Match with id=" + id
      });
    });
};

// Update a Match by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Match.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        let io = req.app.get('io');
        let data = {
          id: parseInt(id),
          title: req.body.title,
          score: req.body.score,
          published: req.body.published ? req.body.published : false
        }

        io.emit('UpdatedMatch', data);

        console.log("!!!!!!! Update match event activated from front-end.");
        // console.log(io)

        res.send({
          message: "Match was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Match with id=${id}. Maybe Match was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Match with id=" + id
      });
    });
};

// Delete a Match with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Match.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        let io = req.app.get('io');
        let data = {
          id: parseInt(id),
          title: req.body.title,
          score: req.body.score,
          published: req.body.published ? req.body.published : false
        }

        io.emit('DeletedMatch', data);
        console.log("!!!!!!! Delete match event activated from front-end.");

        res.send({
          message: "Match was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Match with id=${id}. Maybe Match was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Match with id=" + id
      });
    });
};

// Delete all Matches from the database.
exports.deleteAll = (req, res) => {
  Match.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      let io = req.app.get('io');
      io.emit('DeleteAllMatches');
      console.log("!!!!!!! Delete all matches event activated from front-end.");
      res.send({
        message: `${nums} Matches were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all matchess."
      });
    });
};

// find all published Matches
exports.findAllPublished = (req, res) => {
  Match.findAll({
      where: {
        published: true
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving matches."
      });
    });
};