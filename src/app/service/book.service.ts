import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../common/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_BOOK_API = 'http://localhost:8090/api/v1/books';
  constructor(private httpClient : HttpClient) { }

  getAllBooks() : Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.BASE_BOOK_API);
  }
  getBook(id : number) : Observable<Book> {
    return this.httpClient.get<Book>(this.BASE_BOOK_API +"/"+ id);
  }
  createBook(book : Book): Observable<Book> {
    return this.httpClient.post<Book>(this.BASE_BOOK_API, book);
  }
  updateBook(book : Book, id : number): Observable<Book> {
    return this.httpClient.put<Book>(this.BASE_BOOK_API +"/"+ id, book);
  }
  deleteBook(id : number) {
    return this.httpClient.delete(this.BASE_BOOK_API +"/"+ id);
  }
}
