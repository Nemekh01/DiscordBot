// noinspection JSFileReferences
import Discord from 'discord.js';

import onReady from './onReady';
import onMessage from './onMessage';

export default function main(token) {
  if (!token) {
    console.error('No API token provided in DISCORD_TOKEN. Get a token for a test bot to test this here: https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token');
    return false;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Token:', token);
  }

  const client = new Discord.Client();
  client.on('ready', () => onReady(client));
  client.on('message', msg => onMessage(client, msg));
  // Not sure if I can pass console.error directly, better safe than sorry.
  client.on('error', e => console.error(e));
  client.on('warn', e => console.warn(e));
  // discord.js sometimes randomly stops responding to messages. It might get stuck in a loop. Log *everything* until we can get this fixed.
  client.on('debug', e => console.info(e));
  client.login(token);
  return true;
}
