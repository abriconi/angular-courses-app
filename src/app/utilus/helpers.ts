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

export function formatDateToServer(date: string | null | undefined): string {
  if (date) {
    const dateCreation = date.split('-');
    return `${dateCreation[1]}/${dateCreation[2]}/${dateCreation[0]}`;
  } else {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    return formattedDate;
  }
}



