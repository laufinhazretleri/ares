const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args, member, client, level) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if (!message.member.hasPermission("MANAGE_ROLES"))
  if (!message.member.roles.find('name', '🌿 Commanders')) return message.channel.send('Yetkin yetmiyor.🔒');
      message.delete()
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("**Etiket Atmayı Unuttun Knk**");
  user.addRole('618817736642002954')
      message.delete()
       .then(message => message.delete(3000));
   let banEmbed = new Discord.RichEmbed()
        .setDescription(`**${user} Adlı Kullanıcıya, ${message.author} Tarafından <@&618817736642002954> Rolü Verildi.**`)
        .setColor(0xff6a6a)

     let modlog = message.guild.channels.find('name', 'ꕻ│rol-log');
  if (!modlog) return message.channel.send('');

    modlog.send(banEmbed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}
exports.help = {
    name: 'gitarist',
    description: 'gitarist',
    usage: 'gitarist'
}