const express = require("express");
const Projects = require("../data/db-helpers");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.getAllProjects()
    .then(response => res.status(200).json(response))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve all projects." });
    });
});

module.exports = router;
