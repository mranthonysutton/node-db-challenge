const express = require("express");
const ProjectsRouter = require("../routes/project-routes");
const TasksRouter = require("../routes/task-routes");
const ResourcesRouter = require("../routes/resource-routes");
const server = express();

server.use(express.json());

server.use("/api/projects", ProjectsRouter);
server.use("/api/tasks", TasksRouter);
server.use("/api/resources", ResourcesRouter);

server.use("/", (req, res) => {
  res.send({ message: "Projects API is running..." });
});

module.exports = server;
