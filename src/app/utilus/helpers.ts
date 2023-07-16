export function generateId(): number {
  return Math.floor(Math.random() * 100000);
}

export function transformDate(date: string | null | undefined): string | null {
  if (date) {
    return new Date(date).toISOString().split('T')[0];
  }
  return null;
}





