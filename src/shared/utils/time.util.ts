import {
  MS_IN_ONE_DAY,
  MS_IN_ONE_HOUR,
  MS_IN_ONE_MINUTE,
  MS_IN_ONE_SECOND,
} from './time.constants';

export function msToDescription(ms: number): string {
  const days = Math.floor(ms / MS_IN_ONE_DAY);
  const hours = Math.floor((ms % MS_IN_ONE_DAY) / MS_IN_ONE_HOUR);
  const minutes = Math.floor((ms % MS_IN_ONE_HOUR) / MS_IN_ONE_MINUTE);
  const seconds = Math.floor((ms % MS_IN_ONE_MINUTE) / MS_IN_ONE_SECOND);

  const parts = [];
  if (days > 0) parts.push(`${days} dia${days === 1 ? '' : 's'}`);
  if (hours > 0) parts.push(`${hours} hora${hours === 1 ? '' : 's'}`);
  if (minutes > 0) parts.push(`${minutes} minuto${minutes === 1 ? '' : 's'}`);
  if (seconds > 0) parts.push(`${seconds} segundo${seconds === 1 ? '' : 's'}`);

  if (parts.length === 0) return '0 segundos';
  else if (parts.length === 1) return parts[0];
  else if (parts.length === 2) return `${parts[0]} e ${parts[1]}`;
  else {
    const lastPart = parts.pop();
    const formattedParts = parts.join(', ');
    return `${formattedParts}, e ${lastPart}`;
  }
}
