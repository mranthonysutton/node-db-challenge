exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("project_task")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("project_task").insert([
        { project_id: 1, task_id: 1 },
        { project_id: 1, task_id: 2 },
        { project_id: 3, task_id: 3 },
        { project_id: 2, task_id: 2 }
      ]);
    });
};
