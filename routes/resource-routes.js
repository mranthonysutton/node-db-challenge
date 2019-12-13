const express = require("express");
const Resources = require("../data/db-helpers");
const router = express.Router();

router.get("/", (req, res) => {
  Resources.getAllResources()
    .then(response => res.status(200).json(response))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve all resources." });
    });
});

module.exports = router;
