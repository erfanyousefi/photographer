require("dotenv").config();
const application = require("./app/server");
require("./app/utils/config/global");
new application(globalThis.PORT, globalThis.DB_URL);