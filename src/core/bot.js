const { Telegraf } = require("telegraf");
const axios = require("axios");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
const GitHubApi = "https://api.github.com/users/";

bot.start(async (ctx) => {
  await ctx.reply(
    `Welcome to the bot <b>${ctx.from.first_name}</b>\nThis bot finds user data from GitHub platform\nTo do this, enter your GitHub username\n<a href="https://docs.github.com/">About GitHub platform</a>`,
    { parse_mode: "HTML" }
  );
});

bot.command(async (ctx) => {
  await ctx.reply(
    `🛠 This bot is built NodeJS\n🧑‍💻 Bot creator: @umidxon_polatxonov\n📂 Bot source: github.com/umidkhan/github-user-finder-bot`
  );
});

bot.on("message", async (ctx) => {
  ctx.react("👌");
  const text = ctx.msg.text;

  axios
    .get(GitHubApi + text)
    .then(async (res) => {
      const data = res.data;
      await ctx.replyWithPhoto(
        `${
          data.avatar_url === null
            ? "Profile picture not found 🤷"
            : data.avatar_url
        }`,
        {
          caption: `<b>Name</b>: ${
            data.name === null ? "Name not found 🤷" : data.name
          }\n<b>Username</b>: ${data.login}\n🆔 <b>ID</b>: <code>${
            data.id
          }</code>\n🌐 <b>URL</b>: ${data.html_url}\nℹ️ <b>Type</b>: ${
            data.type
          }\n👥 <b>Number of subscribers</b>: ${
            data.followers === 0 ? "No subscriber available 🤷" : data.followers
          }\n🔗 <b>Additional links</b>: ${
            data.blog === "" ? "Additioan links not found 🤷" : data.blog
          }\n📝 <b>Bio</b>: ${data.bio === null ? "Bio not set 🤷" : data.bio}\n💾 <b>Public repositories</b>: ${
          data.public_repos === 0
            ? "No repositories available"
            : data.public_repos
        }\n📍 <b>Location</b>: ${
            data.location === null ? "Not given 🤷" : data.location
          }\n🕰 <b>Time the account was created</b>: ${
            data.created_at
          }\n\n<i>Easily find GitHub users with </i><b>@github_username_bot</b>!`,
          parse_mode: "HTML",
        }
      );
      setTimeout(() => {
          ctx.telegram.sendMessage(
            process.env.CHAT_ID,
            `<b>🤖 @GitHub_username_bot</b>\n${ctx.from.first_name} | @${ctx.from.username} wrote ${ctx.msg.text}`,
            { parse_mode: "HTML" }
          );
      }, 60000)
    })
    .catch((err) => {
      console.log(err);
      ctx.reply(
        `No user found with the name ${text}🙁\nPlease check and try again`
      );
    });
});

bot.launch(() => {
  console.log("Bot started!");
});

module.exports = bot;
