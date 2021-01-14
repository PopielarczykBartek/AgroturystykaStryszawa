import { Photo } from "./photo";

export interface User {
    id: number;
    username: string;
    email: string;
    gender: string;

    photos: Photo[];
    //photoUrl: string;
}
