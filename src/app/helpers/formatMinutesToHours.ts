export function formatMinutesToHours(minutes: string): string {
  const totalMinutes = parseInt(minutes, 10);
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const hoursString = hours > 0 ? `${hours}h` : '';
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes}min` : '';

  if (hoursString && minutesString) {
    return `${hoursString} ${minutesString}`;
  } else {
    return hoursString || minutesString || '0min';
  }
}
