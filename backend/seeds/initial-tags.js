exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tags")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tags").insert([{ name: "red" }, { name: "yellow" }, { name: "green" }, { name: "blue" }]);
    });
};
