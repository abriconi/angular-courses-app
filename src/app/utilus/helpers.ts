export function generateId(): number {
  return Math.floor(Math.random() * 100000);
}

export function transformDate(date: string | null | undefined): string | null {
  if (date) {
    const dateCreation = date.split('/');
    const formattedDate = `${dateCreation[2]}-${dateCreation[1]}-${dateCreation[0]}`;
    return formattedDate;
  }
  return null;
}

export function formatDateToServer(date: string | null | undefined): string {
  if (date) {
    const dateCreation = date.split('-');
    const formattedDate = `${dateCreation[1]}/${dateCreation[2]}/${dateCreation[0]}`;
    console.log('dateCreation', dateCreation);

    return formattedDate;
  } else {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    console.log('formattedDate', formattedDate);

    return formattedDate;
  }
}




