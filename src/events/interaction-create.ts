import { Client, CommandInteraction } from "discord.js";
import { errorsHandler } from "../shared/shared.service";
import { Collections } from "../shared/utils/collections";

export default {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction, client: Client) {
    if (interaction.isChatInputCommand()) {
      const command = Collections.getCommand(interaction?.commandName!);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error: any) {
        console.error(errorsHandler(client, error));
      }
    }
  },
};