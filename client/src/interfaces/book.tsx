import { Author } from "../context/AuthorContext"

export interface Book {
    _id: string,
    title: string,
    description: string,
    publishDate: string,
    pageCount: number,
    imageUrl: string
    author: Author 
}