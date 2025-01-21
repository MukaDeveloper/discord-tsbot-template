import { SlashCommandBuilder, CommandInteraction, Client } from "discord.js";
import { Command } from "../shared/interfaces/command";
import { BaseCommand } from "../shared/utils/base-command";
import { responseResolver } from "../shared/shared.service";

@Command(new SlashCommandBuilder().setName("ping").setDescription("Pong!"))
export class PingCommand extends BaseCommand {
	async execute(interaction: CommandInteraction, client: Client): Promise<void> {
    interaction.deferReply();
		const response = responseResolver(interaction, true);
		await response("Pong!");
	}
}
