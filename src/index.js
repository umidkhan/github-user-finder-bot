const app = require("./core/server");
const task = require("./modules/cron");
require("dotenv").config();

task.start();
app.listen(process.env.PORT, () => console.log("Server is running!"));
