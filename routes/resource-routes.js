const express = require("express");
const Resources = require("../data/db-helpers");
const router = express.Router();

function validateResourceId(req, res, next) {
  Resources.getResourceById(req.params.id)
    .then(response => {
      if (response) {
        req.response = response;
        next();
      } else {
        res
          .status(404)
          .json({ error: "The specified resource ID does not exist." });
      }
    })
    .catch(error => {
      console.log({
        error: "Unable to retrieve the resource by the specified ID."
      });
    });
}

function checkUniqueName(req, res, next) {
  Resources.getResourceByName(req.body.name)
    .then(response => {
      if (response) {
        res.status(400).json({ error: "The resource name already exists." });
      } else {
        next();
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Unable to retrieve the resource by the specified name."
      });
    });
}

function validateResourcePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ error: "No data has been passed into the resource body." });
  } else {
    if (!req.body.name) {
      res
        .status(400)
        .json({ error: "Please enter a name into the resource body." });
    } else {
      next();
    }
  }
}

router.get("/", (req, res) => {
  Resources.getAllResources()
    .then(response => res.status(200).json(response))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve all resources." });
    });
});

router.get("/:id", validateResourceId, (req, res) => {
  res.send(req.response);
});

router.post("/", [validateResourcePost, checkUniqueName], (req, res) => {
  Resources.addResource(req.body)
    .then(response => res.status(201).json(response))
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Unable to add the resource to the database" });
    });
});

module.exports = router;
