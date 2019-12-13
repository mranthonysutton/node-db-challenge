const express = require("express");
const Projects = require("../data/db-helpers");
const router = express.Router();

function validateProjectId(req, res, next) {
  Projects.getProjectById(req.params.id)
    .then(response => {
      if (response) {
        req.response = response;
        next();
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Unable to get the project with the specified ID." });
    });
}

function validateProjectBody(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ error: "No data has been passed into the project body." });
  } else {
    if (!req.body.name) {
      res
        .status(400)
        .json({ error: "Please enter a name into the project body." });
    } else {
      next();
    }
  }
}

router.get("/", (req, res) => {
  Projects.getAllProjects()
    .then(response => res.status(200).json(response))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve all projects." });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.send(req.response);
});

router.post("/", validateProjectBody, (req, res) => {
  Projects.addProject(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Unable to add the project to the database." });
    });
});

module.exports = router;
