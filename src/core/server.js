const express = require("express");
const bot = require("./bot");

const app = express();

app.use(express.json())
app.use(bot.webhookCallback("/telegram"));

module.exports = app