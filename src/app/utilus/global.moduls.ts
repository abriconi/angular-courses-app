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
    id: string;
    firstName: string;
    lastName: string;
}
