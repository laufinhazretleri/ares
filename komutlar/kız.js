const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args, member, client, level) => {
  const dogrulandi = bot.emojis.find(emoji => emoji.name === "tik");
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if (!message.member.hasPermission("MANAGE_ROLES"))
  if (!message.member.roles.find('name', '🌿 Commanders')) return message.channel.send('Yetkin yetmiyor.');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("**Etiket Atmayı Unuttun Knk**");
  user.addRole('618817729201438769')
  user.removeRole('618817730606399501')
    let banEmbed = new Discord.RichEmbed()
        .setDescription(`**${user}** **Hoşgeldin, Seninle Beraber** **__${message.guild.memberCount}__** **Üyeye Ulaştık.\nSunucumuzun** **__Kurallarına__** **<#618817770221469707>** **Kanalından Bakabilirsin.**`)
        .setColor(0xff0000)
        message.react(dogrulandi)

     let modlog = message.guild.channels.find('name', '●│genel-chat');
  if (!modlog) return message.channel.send('');

    modlog.send(banEmbed);
} 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["k", "Kız", "KIZ"],
    permLevel: 0
}
exports.help = {
    name: 'kız',
    description: 'kız',
    usage: 'kız'
}