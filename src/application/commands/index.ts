import { PingCommand } from './ping.command';
import { UptimeCommand } from './uptime.command';

export const commandList = [new PingCommand(), new UptimeCommand()];
