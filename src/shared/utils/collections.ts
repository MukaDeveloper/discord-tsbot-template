import { Collection } from "discord.js";

export class Collections {
	private static commands: Collection<any, any>;
	private static events: Collection<any, any>;

	constructor() {}

	static getCommand(commandName: string) {
		return Collections.commands.get(commandName);
	}

	static getCommands() {
		return Collections.commands.values();
	}

	static getEvent(eventName: string) {
		return Collections.events.get(eventName);
	}

	static setCommand(commandName: string, command: any) {
		Collections.commands.set(commandName, command);
	}

	static setEvent(eventName: string, event: any) {
		Collections.events.set(eventName, event);
	}
}
