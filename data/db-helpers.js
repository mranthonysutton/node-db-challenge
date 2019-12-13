const db = require("./db-config");

module.exports = {
  getAllProjects,
  getAllTasks,
  getAllResources,
  getTaskById,
  addTask,
  getResourceById,
  addResource,
  getResourceByName,
  addResource,
  getProjectById,
  addProject,
  getResourceByProjectId
};

// ********************** PROJECTS **********************
function getAllProjects() {
  return db("projects").then(projects =>
    projects.map(project => {
      return { ...project, completed: !!project.completed };
    })
  );
}

function getProjectById(id) {
  // Return the call to get all of the projects based off of one id
  return db("projects")
    .where({ id })
    .first()
    .then(response => {
      // Checks if the response for that id is valid
      if (response) {
        // We want to grab all of the tasks, so we do a call within a call to return the task object array
        return db("tasks")
          .select("id", "description", "notes", "completed")
          .where({ project_id: id })
          .then(tasks => {
            tasks.map(item => {
              const tasks = {
                ...item,
                completed: !!item.completed
              };
            });

            return db("resources")
              .select("id", "name", "description")
              .join(
                "project_resource",
                "resources.id",
                "project_resource.resource_id"
              )
              .where({ ["project_resource.project_id"]: id })
              .then(resources => {
                const resourceList = { ...resources };
                return {
                  ...response,
                  completed: !!response.completed,
                  tasks: tasks,
                  resources: [resourceList]
                };
              });
          });
      } else {
        return null;
      }
    });
}

function addProject(projectData) {
  return db("projects")
    .insert(projectData, "id")
    .then(responseIds => {
      const [id] = responseIds;

      return getProjectById(id);
    });
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

function getTasksByProjectId(id) {
  return db("tasks")
    .select("id", "description", "notes", "completed")
    .where({ project_id: id })
    .then(projects =>
      projects.map(item => {
        return { ...item, completed: !!item.completed };
      })
    );
}

// ********************** RESOURCES **********************
function getAllResources() {
  return db("resources");
}

function getResourceById(id) {
  return db("resources")
    .where({ id })
    .first();
}

function getResourceByName(name) {
  return db("resources")
    .where({ name })
    .first();
}

function addResource(resourceData) {
  return db("resources")
    .insert(resourceData, "id")
    .then(responseIds => {
      const [id] = responseIds;

      return getResourceById(id);
    });
}

function getResourceByProjectId(projectId) {
  return db("resources")
    .select("*")
    .join("project_resource", "resources.id", "project_resource.resource_id")
    .where({ ["project_resource.project_id"]: projectId });
}
