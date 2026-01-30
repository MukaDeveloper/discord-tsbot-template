import { Event } from '@domain/interfaces/event.interface';

export class EventRegistry {
  private nameMap = new Map<string, Event>();

  constructor(events: Event[]) {
    for (const event of events) {
      const name = event.name;
      if (this.nameMap.has(name)) {
        throw new Error(`Nome de evento duplicado: "${name}"`);
      }
      this.nameMap.set(name, event);
    }
  }

  public find(eventName: string): Event | null {
    return this.nameMap.get(eventName) || null;
  }

  public getAll(): Event[] {
    return [...this.nameMap.values()];
  }
}
