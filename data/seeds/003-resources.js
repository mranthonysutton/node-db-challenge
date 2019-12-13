exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("resources").insert([
        { name: "Linux Distro", description: "The best OS for development" },
        { name: "HydroFlask", description: "The thing to keep my thirst away" },
        { name: "Spotify", description: "Gotta get those tunes in" }
      ]);
    });
};
