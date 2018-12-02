exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.string("avatar").alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.string("avatar")
      .notNullable()
      .alter();
  });
};
