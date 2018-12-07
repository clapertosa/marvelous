// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "marvelous",
      user: "postgres",
      password: "password"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
