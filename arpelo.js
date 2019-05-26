const Discord = require("discord.js");
const client = new Discord.Client();
/*
http://github.com/arpelo
*/

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = "!";
var token = "NTcxMjc4OTk2NTgzNzQzNDg4.XOqHTg.4CREg2SkEGXzRAsxd7f5D7y0YFo";

client.on("ready", () => {
  console.log("Bu bot opensource bir projedir. http://github.com/arpelo");
  console.log("Bot Giriş Yaptı Şu Kadar Sunucuya Hizmet veriyorum:" + client.guilds.size);
  client.user.setGame(`Musicey By 4Dnk GT| ${prefix}help`);
});

client.on("guildCreate", (guild) => {
client.user.setGame(`Musicey By 4Dnk GT| ${prefix}help`);
    guild.owner.user.send(`Selam bu bot opensource bir projedir. http://github.com/arpelo`);
});

/*
http://github.com/arpelo
*/

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: Musicey Ticket System`)
    .setColor(0xCF40FA)
    .setDescription(`Hello i am Musicey By 4DNK GT here are the commands`)
    .addField(`Tickets`, `!cticket] ()> Creates Support Ticket!`)
    .addField(`Others`, `The other !help ()> shows the help menu. \ !ping ()> Discord Displays the API ping.`)
    message.channel.send({ embed: embed });
  }

  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`IT'S COMING!!`).then(m => {
    m.edit(`:ping_pong: 

: ping_pong: Wow, that was too fast, mate. ** Pong! ** \ nMessage Edit time `+ (m.createdTimestamp - message.createdTimestamp) +` ms, Discord API pingim `+ Math.round (client.ping) +` ms.`);
   });
}

/*
http://github.com/arpelo
*/

if (message.content.toLowerCase().startsWith(prefix + `cticket`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`I couldn't find the '** Support Team **' role on this Server, so I can't open a ticket.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Ticket created..`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Hi, Successful Ticket Opened`)
        .setTimestamp();
        c.send({ embed: embed });
        message.delete();
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `closeticket`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You cannot use this command.`);

    message.channel.send(`Are you sure you want to close the Support Channel? ** - close ** to close.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-kapat.Bu bot opensource bir projedir. http://github.com/arpelo', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Your Ticket Shutdown request timed out.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

/*
http://github.com/arpelo
*/

});

client.login(token);
