exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments().primary();
    t.string("name").notNullable();
    t.string("email")
      .unique()
      .notNullable();
    t.string("password").notNullable();
    t.string("avatar").notNullable();
    t.boolean("activated").defaultTo(false);
    t.string("resetToken");
    t.dateTime("resetTokenExpiration");
    t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
