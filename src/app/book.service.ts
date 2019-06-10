import { Injectable } from '@angular/core';
import { Book } from './book';
import { books } from './mock-books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getBook(id: number): Promise<Book> {
    return this.getBooks()
      .then(books => books.find(book => book.id === id));
  }

  getBooks(): Promise<Book[]> {
    return Promise.resolve(books);
  }

}
