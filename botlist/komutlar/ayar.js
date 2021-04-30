const discord = require("discord.js");
const db = require("quick.db");
const emoji = require("../config.js");

exports.run = async (client, message, args) => {
  let blue = new discord.MessageEmbed().setColor("BLUE");
  let red = new discord.MessageEmbed().setColor("RED");
  if(!message.member.hasPermission('ADMINISTRATOR')) {
    return message.channel.send(
      red.setDescription("<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Bunu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
    );
  }
  let arg = args[0];
  if (!arg) {
    return message.channel.send(
      red.setDescription(
        "<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Girebileceğin argümentler: **bot-ekle-kanal**, **bot-log-kanal**, **onay-red-log-kanal**, **bot-yetkili-rol**"
      )
    );
  } else if (arg == "bot-ekle-kanal") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      return message.channel.send(
        red.setDescription(
          "<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Geçerli bir kanal etiketlemen gerek: **#kanal**"
        )
      );
    }
    db.set(`bot.ekle.log.${message.guild.id}`, kanal.id);
    return message.channel.send(
      blue.setDescription(
        "<:"+emoji.name1+":"+client.emojis.cache.get(emoji.yes)+"> Bot Ekleme kanalı ayarlandı: <#" +
          kanal +
          ">"
      )
    );
  } else if (arg == "bot-log-kanal") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      return message.channel.send(
        red.setDescription(
          "<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Geçerli bir kanal etiketlemen gerek: **#kanal**"
        )
      );
    }
    db.set(`bot.log.${message.guild.id}`, kanal.id);
    return message.channel.send(
      blue.setDescription(
        "<:"+emoji.name1+":"+client.emojis.cache.get(emoji.yes)+"> Bot Log kanalı ayarlandı: <#" + kanal + ">"
      )
    );
  } else if (arg == "onay-red-log-kanal") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      return message.channel.send(
        red.setDescription(
          "<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Geçerli bir kanal etiketlemen gerek: **#kanal**"
        )
      );
    }
    db.set(`onay.red.log.${message.guild.id}`, kanal.id);
    return message.channel.send(
      blue.setDescription(
        "<:"+emoji.name1+":"+client.emojis.cache.get(emoji.yes)+"> Onay-Red kanalı ayarlandı: <#" + kanal + ">"
      )
    );
  } else if (arg == "bot-yetkili-rol") {
    let rol = message.mentions.roles.first();
    if (!rol) {
      return message.channel.send(
        red.setDescription(
          "<:"+emoji.name2+":"+client.emojis.cache.get(emoji.red)+"> Geçerli bir rol etiketlemen gerek: **@rol**"
        )
      );
    }
    db.set(`bot.yetkili.rol.${message.guild.id}`, rol.id);
    return message.channel.send(
      blue.setDescription(
        "<:"+emoji.name1+":"+client.emojis.cache.get(emoji.yes)+"> Bot Yetkilisi rolü ayarlandı: <@&" +
          rol +
          ">"
      )
    );
  }
};

exports.config = { name: "ayar", aliases: ["bot-ayar", "botayar", "ayarlar"] };
