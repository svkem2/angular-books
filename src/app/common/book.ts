import { BookImage } from "./book-image";

export class Book {

    constructor(
        public id: number,
        public title: string,
        public author: string,
        public description: string,
        public price: number,
        public quantityInStock: number,
        public imageUrl: string,
        public images: BookImage[],
        public category: string,
        public publicationYear: Date,
        public isbn: string,
        public language: string,
        public publisher: string,
        public tags: string
         ){

         }
}
