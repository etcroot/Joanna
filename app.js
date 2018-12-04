const { RichEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Discord = require('discord.js');
const client = new Discord.Client();
const cfg = require('./src/config.json');
client.music = require("discord.js-musicbot-addon");
client.music.start(client, {
    youtubeKey: cfg.api,
    anyoneCanSkip: true,
    help: {
      enabled: false,
    },
    ownerOverMember: true,
    inlineEmbeds: true,
    musicPresence: false,
    clearPresence: false,
    messageHelp: true,
    defVolume: cfg.defaultvolume,
    botPrefix: cfg.prefix,
    djRole: cfg.musicrole,
    botAdmins: cfg.admins,
    embedColor: cfg.colour,
    ownerID: cfg.ownerid,
    cooldown: {
      enabled: false,
      timer: 1000,
      exclude: ["volume","queue","pause","resume","np"]
    }
  });

  client.on('ready', () => {
    client.user.setActivity(`${cfg.prefix}help | ${client.guilds.size} guilds`, { type: 'LISTENING' });
  });


  client.on("message", (message) => {
    if (!message.content.startsWith(cfg.prefix) || message.author.bot) return;

    if (message.content.startsWith(cfg.prefix + "help")) {
    const embed = new RichEmbed()
         .setTitle('__Joanna Commands__')
         .setThumbnail(client.user.displayAvatarURL)
         .setColor(cfg.colour)
         .setDescription('All commands starts with `jo!`')
         .addField('__General Commands__', "__help__ - Get Joanna\'s help menu.\n__info__ - Get information about Joanna.\n__ping__ - Get Joanna's ping.\n__invite__ - Invite Joanna.\n__support__ - Get an invite to the support server.\n", false)
         .addField('__Music Commands__', '__play__ - Queue a song/playlist by URL or name.\n__pause__ - Pause playing audio.\n__resume__ - Resume paused audio.\n__volume__ - Changed the volume output of the audio.\n__skip__ - Skip a song or songs with `skip [number]`\n__leave__ - Leaves the voice channel.\n__queue__ - Display current audio queue.\n__loop__ - Sets the loop state for the queue.\n__clear__ - Clears the entire queue.\n__remove__ - Remove a song from the queue by position.\n__search__ - Searches up to 10 videos from youtube.\n__np__ - Display next audio track.', false)
         .setFooter('Joanna - By: etcroot#6666');
       message.channel.send(embed);
    }
    if (message.content.startsWith(cfg.prefix + "info")) {
      const embed = new RichEmbed()
        .setThumbnail(client.user.displayAvatarURL)
        .setTitle('__Joanna Information__')
        .setDescription('Hello! <:foxlaff:519644864577798159> I\'m Joanna.\nI can do lots of things l-like... Oh! Be a DJ! Well... There isn\'nt much else i can do... Use `jo!help` to see what other things i can do.')
        .setColor(cfg.colour)
        .addField('__Developer__', '<@484765734803734540>', true)
        .addField('__Library__', 'Discord.js', true)
        .addField('__Server Count__', client.guilds.size, true)
        .addField('__User Count__', client.users.size, true)
        .addField('__Channel Count__', client.channels.size, true)
        .addField('__Emojis Count__', client.emojis.size, true)
        .addField('__Uptime__', moment.duration(client.uptime).format('d[d ]h[h ]m[m ]s[s]'), true)
        .addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
        .setFooter(`${client.user.username} | By: etcroot#6666`)
      message.channel.send(embed);
    }
    if (message.content.startsWith(cfg.prefix + "ping")) {
      message.channel.send('Pinging...')
        .then(m => {
          m.edit(`Pong! took \`${m.createdTimestamp - message.createdTimestamp}\`ms`)
        })
    }

    if (message.content.startsWith(cfg.prefix + "invite")) {
      message.channel.send("Here's my invite <:foxlaff:519644864577798159>\n<https://discordapp.com/oauth2/authorize?client_id=517010338261237771&scope=bot&permissions=37080128>");
    }
    if (message.content.startsWith(cfg.prefix + "support")) {
      message.channel.send("Here's my support server <:foxlaff:519644864577798159>\nhttps://discord.gg/97wgYe2");
    }
});
  

  client.login(cfg.credentials);