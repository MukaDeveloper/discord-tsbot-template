import { Command } from '@domain/interfaces/command.interface';
import { responseResolver } from '@infrastructure/discord/response-resolver';
import { msToDescription } from '@shared/utils/time.util';
import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export class UptimeCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Veja a quanto tempo estou online');

  public async execute(interaction: CommandInteraction, client: Client) {
    await interaction.deferReply();
    const reply = responseResolver(interaction, false);
    const uptime = client.uptime ?? 0;
    await reply.call(interaction, {
      content: `Estou online há ${msToDescription(uptime)} segundo${uptime > 0 ? 's' : ''}`,
    });
  }
}
