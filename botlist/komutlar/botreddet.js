const discord = require("discord.js");
const db = require("quick.db");
const emoji = require("../config.js");

exports.run = async (client, message, args) => {
  let onayred = db.fetch(`onay-red.log.${message.guild.id}`);
  if(!onayred) return message.reply("<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Onay-Red log kanalı ayarlı değil!")
  let yetkili = db.fetch(`bot.yetkili.rol.${message.guild.id}`);
  if(!yetkili) return message.reply("<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Bot Yetkilis rolü ayarlı değil!")
  if(!message.member.roles.cache.has(yetkili)) return message.reply("<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Sen bunu yapamazsın!")
  let botid = args[0];
  if(!botid) return message.reply("<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Lütfen bir bot ID gir!")
  let sebep = args.slice(1).join(" ");
  if(!sebep) return message.reply("<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Lütfen bir bot red sebebi gir!")
  let botvaryok = db.fetch(`bot.id.${botid}`)
  if(botid) {
    if(!botvaryok) {
      return message.reply("<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+'> Sistemde böyle bir bot yok!')
    } else {
      if(client.channels.cache.get(onayred).send('<:'+emoji.name1+':'+client.emojis.cache.get(emoji.yes)+"> <@"+botid+"> adlı bot <@"+message.author.id+"> tarafından reddedildi!\nSebep: **"+sebep+"**"));
      message.reply('<:'+emoji.name1+':'+client.emojis.cache.get(emoji.yes)+"> <@"+botid+"> adlı bot reddedildi!")
      db.delete(`bot.id.${botid}`)
    }
  }
};

exports.config = { name:"botreddet", aliases:["bot-reddet"] };