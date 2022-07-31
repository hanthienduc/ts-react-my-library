export interface book {
    id: string,
    title: string,
    description: string,
    publishDate: string,
    pageCount: number,
    coverImage: {
        data: []
    },
    coverImageType: string,
}