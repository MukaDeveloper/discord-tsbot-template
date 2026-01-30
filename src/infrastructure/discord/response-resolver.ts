import {
  CommandInteraction,
  MessagePayload,
  InteractionReplyOptions,
  InteractionEditReplyOptions,
} from 'discord.js';

export type ReplyOptions =
  | string
  | MessagePayload
  | InteractionReplyOptions
  | InteractionEditReplyOptions;

/**
 * Retorna uma função que envia a resposta na interação com o contexto
 * correto (evita "Cannot read properties of undefined (reading 'deferred')").
 */
export function responseResolver(
  interaction: CommandInteraction,
  followUpIfReplied: boolean = false,
): (options: ReplyOptions) => Promise<unknown> {
  const acknowledged = interaction.deferred || interaction.replied;
  const method = acknowledged
    ? followUpIfReplied
      ? interaction.followUp.bind(interaction)
      : interaction.editReply.bind(interaction)
    : interaction.reply.bind(interaction);

  return (options: ReplyOptions) =>
    method(options as Parameters<CommandInteraction['reply']>[0]);
}
