const { Pool } = require("pg")

module.exports = new Pool({
    user:'postgres',
    password: "LUCAS",
    host: 'localhost',
    port: 5432,
    database: "fabrica_jogos"
})