import { Client, Interaction } from 'discord.js';
import { CommandRegistry } from '../registry/command-registry';
import { responseResolver } from '../response-resolver';
import { errorsHandler } from './error-handler';

export class InteractionHandler {
  constructor(
    private registry: CommandRegistry,
    private client: Client,
  ) {}

  async handle(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command = this.registry.find(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, this.client);
    } catch (error) {
      const response = responseResolver(interaction, true);
      await response('Ocorreu um erro ao executar o comando. Tente novamente.');
      console.error(errorsHandler(this.client, error));
    }
  }
}
