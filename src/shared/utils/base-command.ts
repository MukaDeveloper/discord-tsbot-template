import { CommandInteraction, Client } from "discord.js";

export abstract class BaseCommand {
  abstract execute(interaction: CommandInteraction, client: Client): Promise<void>;
}
