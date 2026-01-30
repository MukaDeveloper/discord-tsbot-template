import { Command } from '@domain/interfaces/command.interface';

export class CommandRegistry {
  private nameMap = new Map<string, Command>();

  constructor(commands: Command[]) {
    let i = 0;
    for (const cmd of commands) {
      const name = cmd.data.name;
      if (this.nameMap.has(name)) {
        throw new Error(`Nome de comando duplicado: "${name}"`);
      }
      this.nameMap.set(name, cmd);
      i++;
    }
  }

  public find(commandName: string): Command | null {
    return this.nameMap.get(commandName) || null;
  }

  public getAll(): Command[] {
    return [...this.nameMap.values()];
  }
}
