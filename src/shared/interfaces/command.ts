import { SlashCommandBuilder } from "discord.js";

export interface ICommand {
  data: SlashCommandBuilder;
	execute: (...args: any[]) => void;
}

export function Command(data: Partial<SlashCommandBuilder>) {
  return function (target: any) {
    target.prototype.data = data;
  };
}
