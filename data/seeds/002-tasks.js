exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          project_id: 1,
          description: "VIM-Adventures",
          notes: "Interactive game that teaches the basics of using VIM",
          completed: false
        },
        {
          project_id: 1,
          description: "VIM Tutor",
          notes: "Built in VIM Tutor find in vim / nvim",
          completed: false
        },
        {
          project_id: 2,
          description: "Find API",
          completed: true
        },
        {
          project_id: 2,
          description: "Determine Tech Stack",
          notes: "Need to determine what tools I will use for the project",
          completed: false
        },
        {
          project_id: 3,
          description: "Plan Dinner",
          completed: true
        },
        {
          project_id: 3,
          description: "Grocery Shopping",
          completed: true
        }
      ]);
    });
};
