const db = require("./db-config");

module.exports = {
  getAllProjects,
  getAllTasks,
  getAllResources
};

// ********************** PROJECTS **********************
function getAllProjects() {
  return db("projects").then(projects =>
    projects.map(project => {
      return { ...project, completed: !!project.completed };
    })
  );
}

// ********************** TASKS **********************
function getAllTasks() {
  return db("tasks")
    .select(
      "projects.name as projectName",
      "projects.description as projectDescription",
      "tasks.description as taskDescription",
      "tasks.notes as taskNotes",
      "tasks.completed"
    )
    .from("tasks")
    .join("projects", "projects.id", "tasks.project_id")
    .then(tasks =>
      tasks.map(task => {
        return { ...task, completed: !!task.completed };
      })
    );
}

// ********************** RESOURCES **********************
function getAllResources() {
  return db("resources");
}
