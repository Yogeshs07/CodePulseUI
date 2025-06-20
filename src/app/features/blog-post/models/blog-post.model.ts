import { Category } from "../../category/models/category.model";

export interface BlogPost {
    id: string;
    title: string;
    shortDiscription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    auther: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: Category[];
}