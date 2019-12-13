const express = require("express");
const Tasks = require("../data/db-helpers");
const router = express.Router();

router.get("/", (req, res) => {
  Tasks.getAllTasks()
    .then(response => res.status(200).json(response))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve all tasks." });
    });
});

module.exports = router;
