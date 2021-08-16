
const app = require('express')();
app.get('/', (req, res) => res.send('Server is up.'));
app.listen(3000)
const Data = require('st.db')
const db = new Data(`data`)

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch')
const ms = require('ms')




client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Connected in ${client.guilds.cache.size} Server`);
  console.log(`Uses it ${client.users.cache.size} 
Server`);
client.user.setActivity(`${prefix}help `, {
    type: "PLAYING"
  });
  let channeel = client.channels.cache.get(await db.get(`channel`))

  setInterval(async () => {

    fetch(`https://api.shuruhatik.repl.co/azkar`)
      .then(res => res.json())
      .then(body => {
        const embed = new Discord.MessageEmbed()
          .setThumbnail("https://i.top4top.io/p_1997439em0.jpg")
          .setColor("#2097c2")
          .setDescription(`**${body.zekr}**`)
        channeel.send(embed)
      })
  }, 10000)
    
});

const prefix = process.env.prefix




client.on("message", async (message) => {
  if(message.content == prefix + "help"){
    const embed = new Discord.MessageEmbed()
          .setThumbnail("https://i.top4top.io/p_1997439em0.jpg")
          .setColor("#2097c2")
         .addField (`${prefix}azkar`,"أذكار عشوائية", true)
        .addField(`${prefix}set-azkar on`, "لتحديد روم أذكار", true)
         .addField(`${prefix}set-azkar off`, "لحذف روم اذكار المحدد", true) 
          
          
          message.channel.send(embed)
  }
});
  client.on("message", async (message) => {
  if (message.content.startsWith(prefix + "set-azkar on")) {

if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send("You Dont Have \`ADMINISTRATOR\`") 
    let channelmention = message.mentions.channels.first();
    if (!channelmention) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Error ❌")
          .setColor("RED")
          .setDescription(`**Ex : ${prefix}set-azkar on __#channel__**`)
      )
    }
    await db.set(`channel`, channelmention.id)
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Done ✅")
        .setColor("GREEN")
        .setDescription(`**روم الاذكار : ** ${channelmention}`)
    );
  }
  });
   client.on("message", async (message) => { 
  if (message.content.startsWith(prefix + "set-azkar off")) {


if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send("You Dont Have \`ADMINISTRATOR\`")
    await db.remove(`channel`)
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Done removed ✅")
        .setColor("GREEN")
       );
  }
     
   });
  client.on("message", async (message) => {
  if (message.content === prefix + "azkar") {
    fetch(`https://api.shuruhatik.repl.co/azkar`)
      .then(res => res.json())
      .then(body => {
        const embed = new Discord.MessageEmbed()
          .setTitle(body.category)
          .setThumbnail("https://i.top4top.io/p_1997439em0.jpg")
          .setColor("#2097c2")
          .setDescription(`**${body.zekr}**
          `)
        message.channel.send(embed)
      })
  }
});


client.login(process.env.token).catch(err => {
  console.error(`[INVIELD TOKEN] | 
  THE TOKEN IS INVIELD
  BOT BY ZombieX#0001`)
})
