const discord = require("discord.js");
const db = require("quick.db");
const emoji = require("../config.js");

exports.run = async (client, message, args) => {
  let botlog = db.fetch(`bot.log.${message.guild.id}`);
  if(!botlog) return message.reply('<:'+emoji.name2+':'+client.emojis.cache.get(emoji.red)+'> Bot Log kanalı ayarlı değil!')
  let basvuru = db.fetch(`bot.ekle.log.${message.guild.id}`);
  if(!basvuru) return message.reply('<:'+emoji.name2+':'+client.emojis.cache.get(emoji.red)+'> Bot Ekleme kanalı ayarlı değil!')
  if(message.channel.id !== basvuru) return message.reply('<:'+emoji.name2+':'+client.emojis.cache.get(emoji.red)+'> Lütfen bunu <#'+basvuru+'> kanalında dene!')
  let botid = args[0];
  let botprefix = args[1];
  if(!botid) return message.reply('<:'+emoji.name2+':'+client.emojis.cache.get(emoji.red)+'> Lütfen bir bot ID gir!')
  if(!botprefix) return message.reply('<:'+emoji.name2+':'+client.emojis.cache.get(emoji.red)+'> Lütfen bir bot Prefix gir!')
  let embed = new discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
  .addField("Bot ID", botid, true)
  .addField("Bot Prefix", botprefix, true)
  .setColor("BLUE")
  .setFooter(client.users.cache.get(botid).username+" için istek geldi.")
  let botvaryok = db.fetch(`bot.id.${botid}`)
  if(botid) {
    if(botprefix) {
      if(botvaryok) {
        message.reply('<:'+emoji.name2+':'+client.emojis.cache.get(emoji.red)+'> Bu bot zaten sistemde var!')
      } else {
      if(message.channel.id !== basvuru) return message.reply('<:'+emoji.name2+':'+client.emojis.cache.get(emoji.red)+'> Lütfen bunu <#'+basvuru+'> kanalında dene!')
      if(client.channels.cache.get(basvuru).send(embed));
      if(client.channels.cache.get(botlog).send('<:'+emoji.name1+':'+client.emojis.cache.get(emoji.yes)+`> ${message.author} adlı kullanıcı <@${botid}> adlı botu eklemek için sıraya ekledi!`));
      message.reply('<:'+emoji.name1+':'+client.emojis.cache.get(emoji.yes)+'> Bot ekleme isteğin alındı!')
      db.set(`bot.id.${botid}`, 'yes')
      };
    };
  };
};

exports.config = { name:"botekle", aliases:["bot-ekle"] };