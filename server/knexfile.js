// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "marvelous",
      user: "postgres",
      password: "postgres"
    }
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }},
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
