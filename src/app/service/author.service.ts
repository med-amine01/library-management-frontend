import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Author} from "../common/author";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private BASE_AUTHOR_API = 'http://localhost:8090/api/v1/authors';
  constructor(private httpClient : HttpClient) { }

  getAllAuthorsWithoutPagination(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.BASE_AUTHOR_API);
  }
  getAllAuthors(pageNumber: number, pageSize: number): Observable<Author[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<Author[]>(this.BASE_AUTHOR_API, { params });
  }
  getAuthor(id : number) : Observable<Author> {
    return this.httpClient.get<Author>(this.BASE_AUTHOR_API +"/"+ id);
  }
  createAuthor(author : Author): Observable<Author> {
    return this.httpClient.post<Author>(this.BASE_AUTHOR_API, author);
  }
  updateAuthor(author : Author, id : number): Observable<Author> {
    return this.httpClient.put<Author>(this.BASE_AUTHOR_API +"/"+ id, author);
  }
  deleteAuthor(id : number) {
    return this.httpClient.delete(this.BASE_AUTHOR_API +"/"+ id);
  }
  generateBooksAndAuthors() : Observable<any> {
    return this.httpClient.get(this.BASE_AUTHOR_API + '/generate/10/2');
  }
}

