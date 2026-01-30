import {
  ActivitiesOptions,
  ActivityType,
  Client,
  GatewayIntentBits,
  Partials,
} from 'discord.js';
import { CommandRegistry } from './registry/command-registry';
import { commandList } from '@application/commands';
import { InteractionHandler } from './handlers/interaction-handler';
import { EventRegistry } from './registry/event-registry';
import { eventList } from '@application/events';
import { registerCommandsREST } from './publisher/command-publisher';

export async function createClient() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
  });

  const commandRegistry = new CommandRegistry(commandList);
  const interactionHandler = new InteractionHandler(commandRegistry, client);

  const eventRegistry = new EventRegistry(eventList);
  const allEvents = eventRegistry.getAll();

  for (const event of allEvents) {
    if (event.once) {
      client.once(event.name, (...args) =>
        event.execute(interactionHandler, ...args),
      );
      continue;
    }
    client.on(event.name, (...args) =>
      event.execute(interactionHandler, ...args),
    );
  }

  client.once('ready', async () => {
    const activities = [`Em desenvolvimento`];

    let i = 0;
    setInterval(
      () =>
        client.user?.setActivity({
          name: `${activities[i++ % activities.length]}`,
          type: ActivityType.Playing,
        } as ActivitiesOptions),
      5000,
    );

    console.log(`🤖 Aplicação iniciada como ${client.user?.tag}`);

    await registerCommandsREST(process.env.CLIENT_ID!, commandRegistry);
  });

  return client;
}
