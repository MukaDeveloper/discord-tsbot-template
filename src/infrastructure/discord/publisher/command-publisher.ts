import { REST, Routes } from 'discord.js';
import { CommandRegistry } from '../registry/command-registry';

export async function registerCommandsREST(
  clientId: string,
  registry: CommandRegistry,
  guildId?: string,
) {
  const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN!);

  const commandsData = registry.getAll().map((cmd) => cmd.data.toJSON());

  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandsData,
    });
    return;
  }

  await rest.put(Routes.applicationCommands(clientId), {
    body: commandsData,
  });
}
