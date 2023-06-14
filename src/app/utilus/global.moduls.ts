export interface Course {
    id: string;
    title: string;
    topRated: boolean;
    creationDate: string;
    duration: string;
    description: string;
    authors?: string;
}

export interface User {
  id: number;
  token: string,
  name: NameModel;
  login: string;
  password: string;
}

interface NameModel {
  first: string;
  last: string;
}

export interface UserLogin {
  token: string;
  login: string;
  password: string;
}
