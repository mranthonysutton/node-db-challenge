exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("description");
      tbl.boolean("completed").defaultTo("false");
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.text("description").notNullable();
      tbl.text("notes");
      tbl.boolean("completed").defaultTo("false");
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .text("name")
        .notNullable()
        .unique();
      tbl.text("description");
    })
    .createTable("project_task", tbl => {
      tbl.primary(["project_id", "task_id"]);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("task_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("project_resource", tbl => {
      tbl.primary(["project_id", "resource_id"]);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("project_resource");
  return knex.schema.dropTableIfExists("project_task");
  return knex.schema.dropTableIfExists("resources");
  return knex.schema.dropTableIfExists("tasks");
  return knex.schema.dropTableIfExists("projects");
};
