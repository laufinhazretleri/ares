const Discord = require("discord.js");
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
    let aresUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!aresUser) return message.channel.send("**s!ban @Kullanıcı <Sebep>**");
    let aresReason = args.join(" ").slice(22);
   
    if(!aresReason) return message.channel.send("**s!ban @Kullanıcı <Sebep>**")
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("");
    if(aresUser.hasPermission("BAN_MEMBERS")) return message.channel.send("");
   if (aresUser.id === message.author.id) return message.channel.send("Kendinide Banlamazsın Bee")
 
    message.channel.send(` **${aresUser}** Adlı Kullanıcı <@${message.author.id}> Tarafından Başarıyla Banlandı!`)
    let banEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)    
    .setTimestamp()
    .addField("Banlanan Kullanıcı", `{aresUser} (${aresUser.id})`,true)
    .addField("Ban Atan Yetkili", `<@${message.author.id}>`,true)
    .addField("Banlanma Sebebi", `**${aresReason}**`)
    .setImage('https://media.giphy.com/media/C51woXfgJdug/giphy.gif')
   .setFooter('Ares Ban Hizmetleri',bot.user.avatarURL);

     let modlog = message.guild.channels.find('name', 'ꕻ│ban-log');
  if (!modlog) return message.reply('`ꕻ│ban-log` | Adında bir kanal gözükmüyor lütfen `ꕻ│ban-log` Adında bir kanal açınız.');

    message.guild.member(aresUser).ban(aresReason);
    modlog.send(banEmbed);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  kategori: "admin",
  description: 'İstediğiniz kişiyi banlar.',
  usage: 'ban [kullanıcı] [sebep]'
};