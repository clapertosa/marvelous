exports.up = function(knex, Promise) {
  return knex.schema.raw("ALTER TABLE comments ADD COLUMN user_ip cidr");
};

exports.down = function(knex, Promise) {
  return knex.schema.table("comments", t => {
    t.dropColumn("user_ip");
  });
};
