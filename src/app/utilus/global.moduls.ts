export interface COURSE_MODEL {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: Authors[];
  isTopRated: boolean;
}

export interface Authors {
  id: number;
  name: string
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


