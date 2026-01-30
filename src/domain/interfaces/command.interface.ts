import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute(
    interaction: CommandInteraction,
    client: Client,
    ...args: any[]
  ): Promise<void>;
}
