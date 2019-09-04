const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix

module.exports.run = async (bot, message, args, member, client, level) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) 
  if (!message.member.hasPermission("ADMINISTRATOR")) 
  if (!message.member.roles.find('name', '🌿 Commanders')) return (message => message.delete(3000));
  let isim = args.slice(1).join(' ');
  let kullanici = message.mentions.users.first();
  if(!kullanici) return message.reply(`**Kimin Kullanici Adini Degistirmek İstedigini Etiketlemelisin**`)
  if(!isim) return message.reply(`**Kimin Kullanici Adini Degistirmek İstedigini Etiketlemelisin**`)
  if(isim.length > 32) return message.reply(`**Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!**`)
  message.guild.members.get(kullanici.id).setNickname(`ꕻ ${isim}`)
      message.delete()
       .then(message => message.delete(3000));
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["isim","İsim","İSİM","iSİM","nick","Nick","NİCK","nİCK"],
    permLevel: 0
}

exports.help = {
    name: 'isim',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isim @kullanıcı <kullanıcı adı>'
}