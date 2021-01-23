import { Category } from "./category";

export interface Photo {
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;

    categories: Category;
}
