import { Interaction } from 'discord.js';
import { Event } from '@domain/interfaces/event.interface';
import { InteractionHandler } from '@infrastructure/discord/handlers/interaction-handler';

export class InteractionEvent implements Event {
  public name: string = 'interactionCreate';

  public async execute(
    handler: InteractionHandler,
    interaction: Interaction,
  ): Promise<void> {
    await handler.handle(interaction);
  }
}
