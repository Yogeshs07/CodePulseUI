export interface AddBlogPost{

    title: string;
    shortDiscription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    auther: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: string[];
}