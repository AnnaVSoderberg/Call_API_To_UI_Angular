import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:7138/api';

  constructor(private http: HttpClient) {}

  // Get all books - ensure return type is always Book[]
  getAllBooks(): Observable<Book[]> {
    return this.http.get<{ result: Book[] }>(`${this.baseUrl}/books`)
      .pipe(
        map(response => response.result),  // Extract the `result` field and return Book[]
        catchError(() => of([]))  // In case of error, return an empty array of Book[]
      );
  }

  addBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Book>(`${this.baseUrl}/book`, book, { headers }).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook(book: Book): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/book`, book, { headers }) // Remove the ID from the URL
      .pipe(
        catchError(this.handleError<any>('updateBook'))
      );
}

  deleteBook(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/book/${id}`)
    .pipe(
      catchError(this.handleError<any>('deleteBook'))
    );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
}


