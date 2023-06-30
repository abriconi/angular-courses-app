export function generateId(): number {
  return Math.floor(Math.random() * 100000);
}

export function transformDate(dateString: string | null | undefined): string {
  if(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`;
  }
   else {
     return 'undefined date';
   }

}



