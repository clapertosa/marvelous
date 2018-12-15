exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", t => {
    t.increments().primary();
    t.integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable();
    t.string("category", 50).notNullable();
    t.integer("category_id").notNullable();
    t.string("body").notNullable();
    t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
