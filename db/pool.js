const { Pool } = require("pg");
require('dotenv').config()


// Again, this should be read from an environment variable
module.exports = new Pool({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
});
