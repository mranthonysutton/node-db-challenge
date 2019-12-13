exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Learn VIM",
          description:
            "I want to learn VIM so that I can replace vsCode with VIM for my editor",
          completed: false
        },
        {
          name: "Build Brewery Locator",
          description:
            "I want to be able to favorite and find additional breweries",
          completed: false
        },
        {
          name: "Plan Christmas Party",
          completed: true
        }
      ]);
    });
};
