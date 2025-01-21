import { Client, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Collections } from "../utils/collections";
import { errorsHandler, responseResolver } from "../shared.service";

export class CommandHandler {
	constructor(private readonly client: Client) {}

	async loadCommands() {
		const path = join(__dirname, "..", "commands");
		const files = readdirSync(path).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

		for (const file of files) {
			const filePath = join(path, file);
			const command = await import(filePath);

			if ("data" in command && "execute" in command) Collections.setCommand(command.data.name, command);
		}
	}

	async registerCommands(clientId: string, guildId?: string) {
		const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN!);
		const commandsData = Array.from(Collections.getCommands()).map((command) => command.data.toJSON());

		try {
			if (guildId) {
				await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsData });
			} else {
				await rest.put(Routes.applicationCommands(clientId), { body: commandsData });
			}
		} catch (error) {
			console.error(errorsHandler(this.client, error));
		}
	}

	async handleCommand(interaction: any) {
		const command = Collections.getCommand(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction, this.client);
		} catch (error) {
			const response = responseResolver(interaction, true);
			await response("Ocorreu um erro ao executar o comando. Por favor, tente novamente mais tarde.");
			console.error(errorsHandler(this.client, error));
		}
	}
}
