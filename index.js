const discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const config = require("./botlist/config.js");
const client = new discord.Client();
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
require("./botlist/Loader/event.js")(client);

client.on("ready", () => { console.log("[BOT]: "+client.user.tag+" aktif.") });

fs.readdir("./botlist/komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`[BOT]: ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./botlist/komutlar/${f}`);
    console.log(`[BOT]: Yüklenen komut: ${props.config.name}.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
});

client.login(config.token);