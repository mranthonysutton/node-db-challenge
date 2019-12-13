const express = require("express");
const Tasks = require("../data/db-helpers");
const router = express.Router();

function validateTaskId(req, res, next) {
  Tasks.getTaskById(req.params.id)
    .then(response => {
      if (response) {
        req.response = response;
        next();
      } else {
        res
          .status(404)
          .json({ error: "The specified task ID does not exist." });
      }
    })
    .catch(error => {
      console.log({
        error: "Unable to retrieve the task by the specified ID."
      });
    });
}

function validateTaskBody(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ error: "No data has been passed into the task body." });
  } else {
    if (!req.body.project_id) {
      res
        .status(400)
        .json({ error: "Please enter a project_id into the task body." });
    } else if (!req.body.description) {
      res
        .status(400)
        .json({ error: "Please enter a description into the task body." });
    } else {
      next();
    }
  }
}

router.get("/", (req, res) => {
  Tasks.getAllTasks()
    .then(response => res.status(200).json(response))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve all tasks." });
    });
});

router.get("/:id", validateTaskId, (req, res) => {
  res.send(req.response);
});

router.post("/", validateTaskBody, (req, res) => {
  Tasks.addTask(req.body)
    .then(response => res.status(201).json(response))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to add a task to the database." });
    });
});

module.exports = router;
