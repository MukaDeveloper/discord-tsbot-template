import { SlashCommandBuilder, CommandInteraction, Client } from 'discord.js';
import { Command } from '@domain/interfaces/command.interface';
import { responseResolver } from '@infrastructure/discord/response-resolver';

export class PingCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Veja minha latência.');

  public async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();
    const response = responseResolver(interaction, false);
    await response({ content: 'Pong!' });
  }
}
