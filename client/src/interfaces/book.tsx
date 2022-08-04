import { Author } from "../context/AuthorContext"

export interface Book {
    _id: string,
    title: string,
    description: string,
    publishDate: Date,
    pageCount: number,
    fileEncodeDataURL: string
    author: Author 
}