require("dotenv").config();
const application = require("./app/server");
const port = process.env.PORT;
require("./app/utils/config/global");
new application(port, globalThis.DB_URL);