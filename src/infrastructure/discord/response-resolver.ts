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

export function responseResolver(
  interaction: CommandInteraction,
  followUpIfReplied: boolean = false,
): (options: ReplyOptions) => Promise<unknown> {
  const acknowledged = interaction.deferred || interaction.replied;
  return async (options: ReplyOptions) => {
    if (acknowledged) {
      if (followUpIfReplied) {
        return interaction.followUp(
          options as string | MessagePayload | InteractionReplyOptions,
        );
      }
      return interaction.editReply(
        options as string | MessagePayload | InteractionEditReplyOptions,
      );
    }
    return interaction.reply(
      options as string | MessagePayload | InteractionReplyOptions,
    );
  };
}
