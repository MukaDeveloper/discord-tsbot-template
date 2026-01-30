import { Command } from '@domain/interfaces/command.interface';

export class CommandRegistry {
  private nameMap = new Map<string, Command>();

  constructor(commands: Command[]) {
    for (const cmd of commands) {
      const name = cmd.data.name;
      if (this.nameMap.has(name)) {
        throw new Error(`Nome de comando duplicado: "${name}"`);
      }
      this.nameMap.set(name, cmd);
    }
  }

  public find(commandName: string): Command | null {
    return this.nameMap.get(commandName) || null;
  }

  public getAll(): Command[] {
    return [...this.nameMap.values()];
  }
}
