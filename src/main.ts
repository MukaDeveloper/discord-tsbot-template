import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import * as dotenv from "dotenv";
import { CommandHandler } from "./shared/handlers/command.handler";

dotenv.config();

const intents = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent,
];
const client = new Client({ intents, partials: [Partials.Channel] });

// deployCommands();
// eventsHandler(client);

const commandHandler = new CommandHandler(client);
async function init() {
	// Carrega todos os comandos
	await commandHandler.loadCommands();

	// Registra os comandos (pode ser chamado separadamente em um script de deploy)
	await commandHandler.registerCommands(
		process.env.CLIENT_ID!,
		process.env.GUILD_ID // opcional, para desenvolvimento
	);

	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isCommand()) return;
		await commandHandler.handleCommand(interaction);
	});

	client.login(process.env.DISCORD_TOKEN);
}

init().catch(console.error);
