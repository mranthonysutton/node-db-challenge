const db = require("./db-config");

module.exports = {
  getAllProjects,
  getAllTasks,
  getAllResources,
  getTaskById,
  addTask
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

function getTaskById(id) {
  return db("tasks")
    .select(
      "projects.name as projectName",
      "projects.description as projectDescription",
      "tasks.id as taskId",
      "tasks.description as taskDescription",
      "tasks.notes as taskNotes",
      "tasks.completed"
    )
    .from("tasks")
    .join("projects", "projects.id", "tasks.project_id")
    .where({ ["tasks.id"]: id })
    .first()
    .then(response => {
      if (response) {
        return { ...response, completed: !!response.completed };
      } else {
        return null;
      }
    });
}

function addTask(taskData) {
  return db("tasks")
    .insert(taskData, "id")
    .then(responseIds => {
      const [id] = responseIds;

      return getTaskById(id);
    });
}

// ********************** RESOURCES **********************
function getAllResources() {
  return db("resources");
}
