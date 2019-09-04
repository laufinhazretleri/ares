const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
require('./util/eventLoader')(client);


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
     files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(aliases => {
      client.aliases.set(aliases, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("message", message => {
    const dmchannel = client.channels.find("name", "bot-özel-görme");// 'notechdm' yazan yeri sunucunuzda bi' kanalın ismini yazın. bota özelden yazılanlar oradan görülecektir.
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        dmchannel.sendMessage("", {embed: {
                color: 3447003,
                title: `Yazan: ${message.author.tag} ID: ${message.author.id}`,
                description: `${message.content}`
              }})
    }
    if (message.channel.bot) return;
  
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'x');// 'notech-log' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
  if (!channel) return;
 const embed = new Discord.RichEmbed()
  .setColor('0xff1a1a')
  .setAuthor(client.user.username, client.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(`:outbox_tray: ${member.user.username} Sunucudan ayrıldı.`)
  .setTimestamp()
  channel.sendEmbed(embed);
});

});
client.on('message', msg => {
  if (msg.content === 'tag') {
    msg.channel.send('`ꕻ`');
  }
});

client.on('message', msg => {
  if (msg.content === 'Tag') {
    msg.channel.send('`ꕻ`');
  }
});


client.on('message', msg => {
  if (msg.content === 'TAG') {
    msg.channel.send('`ꕻ`');
  }
});

client.on('message', msg => {
  if (msg.content === '!tag') {
    msg.channel.send('**Buyur Tagımız : **`ꕻ`');
  }
});


client.on("message", (message) => {
    if (message.content.startsWith("s!say")) {
	message.channel.send(`<a:kus:617865507252600852> Sunucumuzun Mevcut Sayısı **${message.guild.memberCount}**`);
    }
});

client.on("message", (message) => {
    if (message.content.startsWith("say")) {
	message.channel.send(`<a:kus:617865507252600852> Sunucumuzun Mevcut Sayısı **${message.guild.memberCount}**`);
    }
});



client.on('message', msg => {
  if (msg.content === 'sa') {
    msg.reply('**Aleyküm Selam Dostum Hoşgeldin.**');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'bot-koruma')

    if(member.user.bot !==true){

    } 
    else {

    sChannel.send(`**Adelaido Koruma Sistemi**
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
@everyone`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
  }  
  });

  
client.on("message", msg => {
    const kzgn = client.emojis.get("553759645836247040");
    const embedlul = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription( msg.author + " Reklam Yasak Bunu Bilmiyormusun!")
    
const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor")
      .setColor(0x00AE86)
      .setDescription("")
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**")

if (msg.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/) (htpp)/g) && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
    if(msg.member.hasPermission('BAN_MEMBERS')){
    return;
    } else {
    msg.delete(30).then(deletedMsg => {
     deletedMsg.channel.send(embedlul)
     msg.guild.owner.send(embedlulz).catch(e => {
            console.error(e);
          });
        }).catch(e => {
          console.error(e);
        });
      };
      };
    })
;

//////////////////

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ares her daim hr') {  // İstediğiniz Komut
       msg.member.addRole("618817712843391016") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
  }
});


client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("CHYPER", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<a:dogrulandi:618432568022401025> Sunucumuza Hoşgeldin **${member.user}** Seninle Birlikte **__${member.guild.memberCount}__** Kişiyiz\n<a:koruma:618432554806149121> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n<a:tik2:618432555485626387> **<@&618817723463499816>**  Rolündeki Yetkililer Seninle İlgilenecektir.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});


client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

}); 
   


//////////////////////////////////////////////////////////////ROL KORUMA/////////////////////////////////////////////////////////////////////

////////////////Metin Kanalı ya da Ses Kanalı Silindiğinde Yetki Çekme
client.on("channelDelete", async channel => {
  // Eğer kanal silinirse üstteki kod devreye girer ve işlemleri başlatır
  var elementalbotlog = channel.guild.channels.find(c => c.name === "ꕻ│claus-bot-koruma")
  const guild = client.guilds.get('613451640883642378');
  // Rich Embed oluşturma
  const embedmemberadd23 = new Discord.RichEmbed()
  .setTitle(-` + ${channel.name} adlı kanal silindiği için yetki rolleri çekildi., `)
  .addField(`Hangi Yetkiye Sahip Roller Çekilir?,(Yönetici, Rolleri Yönet, Denetim Kaydını Görüntüle, Kanalları Yönet, Sunucuyu Yönet) yetkilerine sahip roller çekildi.`)
.setImage("https://biblionyan.files.wordpress.com/2018/07/angels-of-death-gif-01.gif%22")
if (client.channels.get === "607847918111817729") return
   elementalbotlog.send(embedmemberadd23)
  guild.owner.send(embedmemberadd23)
  // Herkesin Yetkisini Çektiği Kısım
  channel.guild.members.forEach(member => {
    member.removeRole("618817713984372736") // 
    member.removeRole("618817720208588811") // 
    member.removeRole("618817725682155551") // 
    member.removeRole("") // 
  });
});


client.on("roleUpdate", async function (oldRole, newRole) {

  let sChannel = newRole.guild.channels.find(c => c.name === "ꕻ│rol-koruma")


  if (newRole.hasPermission("ADMINISTRATOR") || newRole.hasPermission("KICK_MEMBERS") || newRole.hasPermission("BAN_MEMBERS") || newRole.hasPermission("MANAGE_ROLES") ||

    newRole.hasPermission("MANAGE_GUILD") || newRole.hasPermission("MANAGE_SERVER")) {

    if (newRole.id === "Müsade Edilecek Rol ID") return

    newRole.setPermissions(["CREATE_INSTANT_INVITE", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "EMBED_LINKS", "ATTACH_FILES",

      "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "CONNECT", "SPEAK", "USE_VAD",])

    if (!sChannel) {
      return newRole.guild.owner.send('Antiraid nedeniyle bir role Yönetici, Sunucuyu Yönet, Üyeleri Yasakla, Üyeleri At veya Kanalları Yönet Verildiği için roldeki yetki geri alındı.  \n Güncellenen Rol: **' + newRole.name + '**')

      newRole.setPermissions(["CREATE_INSTANT_INVITE", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "EMBED_LINKS", "ATTACH_FILES",

        "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "CONNECT", "SPEAK", "USE_VAD",])

    }

    sChannel.send('Güncellenen bir role Yönetici, Sunucuyu Yönet, Üyeleri Yasakla, Üyeleri At veya Kanalları Yönet Verildiği için yetkisini geri aldım \n Güncellenen Rol: **' + newRole.name + '**')

  }

});


// Birisi rol sildiği zaman tüm yetkileri çeker. ( {Tüm} dediğimiz roller sizin seçtiğiniz roller.)
client.on("roleDelete", async role => {
  // Rich Embed oluşturma
   const embedmemberadd31 = new Discord.RichEmbed()
   .setTitle(`-  ` + `${role.name} adlı rol silindiği için yetki rolleri çekildi.`, ``)
  .addField(`Hangi Yetkiye Sahip Roller Çekilir?`, `(Yönetici, Rolleri Yönet, Denetim Kaydını Görüntüle, Kanalları Yönet, Sunucuyu Yönet) yetkilerine sahip roller çekildi.`)
.setImage("https://biblionyan.files.wordpress.com/2018/07/angels-of-death-gif-01.gif")
var deathbotlog = role.guild.channels.find(c => c.name === "ꕻ│rol-koruma")
const guild = client.guilds.get('613451640883642378');
  if (role.guild.id === '617666044131016721')
  if (client.channels.get === "617667257748946945") return
  deathbotlog.send(embedmemberadd31)
  
  // Sunucu sahibine mesaj gönderme
  guild.owner.send(embedmemberadd31)
  
  // Herkesin Yetkisini Çektiği Kısım
   role.guild.members.forEach(member => {
    member.removeRole("618817713984372736") // 
    member.removeRole("618817720208588811") // 
    member.removeRole("618817725682155551") // 
    member.removeRole("") // 
   });
});


client.on('messageDelete', function(message) {
 const emoji = (client.emojis.find("name", "tik").toString())

    if(message.channel.type == 'text') {
        var log = message.guild.channels.find('name', "ꕻ│message-log");
        if (log != null)
            var embed = new Discord.RichEmbed()
        .setTitle(`Mesaj silindi. ${emoji}`)
        .setColor("#36393E")
        .setDescription(`<#${message.channel.id}> **kanalında** ` + message.author + ` **tarafından gönderilen bir mesaj silindi. \nSilinen Mesaj:** ` + message.cleanContent)
        .setFooter(`Silinen Mesaj ID: ${message.id} | Mesajı Silen Kullanıcı ID: ${message.author.id}`)
            log.sendMessage(embed);

    }

});

client.on('messageUpdate', function(oldMessage, newMessage) {

    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {

        var log = newMessage.guild.channels.find('name', "ꕻ│message-log");
        if (log != null)
            
var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle('Mesaj Düzenlendi.')
          .setDescription(`<@${oldMessage.author.id}> **adlı kullanıcı** <#${oldMessage.channel.id}> **kanalına gönderdiği mesajı düzenledi.**`)
          .addField(`Eski Mesaj`, `${oldMessage.cleanContent}`)
          .addField(`Yeni Mesaj`, `${newMessage.cleanContent}`)
          
            log.sendMessage(embed);
    }

}); 



//////////////////////////////////////////////////////////////REKLAM SISTEMI////////////////////////////////////////////////////////////////////

client.on("message", msg => {
    const kzgn = client.emojis.get("617666044131016721");
    const embedlul = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription( msg.author + " Reklam Yapma Oğlluuum")
    
const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
      .setColor(0x00AE86)
      .setDescription("")
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**")

if (msg.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/) (htpp)/g) && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
    if(msg.member.hasPermission('BAN_MEMBERS')){
    return;
    } else {
    msg.delete(30).then(deletedMsg => {
     deletedMsg.channel.send(embedlul)
     msg.guild.owner.send(embedlulz).catch(e => {
            console.error(e);
          });
        }).catch(e => {
          console.error(e);
        });
      };
      };
    })
;

client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
         if (message.content === 's!gir' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
           if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.join()
            
                message.reply("Bot odaya giriş yaptı.").then(m => m.delete(9000));

      }
           if (message.content === 's!gir' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
      if (message.content === 'e!çık' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.leave()
        
                message.reply("Bot odadan çıkış yaptı.").then(m => m.delete(9000));

      }
             if (message.content === 's!çık' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
  })


client.on('message', message => {
if (message.content === `<@${client.user.id}>`) {
 message.reply('Prefixim: s!')
}
});




//////////////////////////////////////////////////////////////TAG ////////////////////////////////////////////////////////////////////

		client.on("userUpdate", async(old, nev) => {
  if(old.username !== nev.username) {
  if(!nev.username.includes("ꕻ") && client.guilds.get("613451640883642378").members.get(nev.id).roles.has("618817724071542795")) {
     client.guilds.get("613451640883642378").members.get(nev.id).removeRole("618817724071542795")
     client.channels.get('618817778387910666').send(`**${nev}, Adlı Üye [ꕻ] Tagını Çıkardığı İçin <@&618817724071542795> Rolü Alındı.**  gidin tag aldırın amk çocukları `)
    } 

//////////////////////////////////////////////////////////////TAG VERİLDİ////////////////////////////////////////////////////////////////////

     if(nev.username.includes("ꕻ") && !client.guilds.get("613451640883642378").members.get(nev.id).roles.has("618817724071542795")) {
      client.channels.get('618817778387910666').send(`**${nev}, Adlı Üye [ꕻ] Tagını Aldığı İçin <@&618817724071542795>  Rolü Verildi.**`) 
      client.guilds.get("613451640883642378").members.get(nev.id).addRole("618817724071542795")
     }
  }
  }) 

client.login(ayarlar.token);




////////////////Metin Kanalı ya da Ses Kanalı Silindiğinde Yetki Çekme
client.on("channelDelete", async channel => {
  // Eğer kanal silinirse üstteki kod devreye girer ve işlemleri başlatır
  var elementalbotlog = channel.guild.channels.find(c => c.name === "ꕻ│claus-kanal-koruma")
  const guild = client.guilds.get('613451640883642378');
  // Rich Embed oluşturma
  const embedmemberadd23 = new Discord.RichEmbed()
  .setTitle(-` + ${channel.name} adlı kanal silindiği için yetki rolleri çekildi., `)
  .addField(`Hangi Yetkiye Sahip Roller Çekilir?,(Yönetici, Rolleri Yönet, Denetim Kaydını Görüntüle, Kanalları Yönet, Sunucuyu Yönet) yetkilerine sahip roller çekildi.`)
.setImage("https://biblionyan.files.wordpress.com/2018/07/angels-of-death-gif-01.gif%22")
if (client.channels.get === "617856281302138899") return
   elementalbotlog.send(embedmemberadd23)
  guild.owner.send(embedmemberadd23)
  // Herkesin Yetkisini Çektiği Kısım
  channel.guild.members.forEach(member => {
    member.removeRole("617667175942979586") // Destek Ekibi 
    member.removeRole("617667176706342913") // Moderatör
    member.removeRole("617667216317480960") // D.Mod
  });
});




