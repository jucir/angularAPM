import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
  ){}

  private productsUrl = 'api/products';

  // All products
  // Instead of defining the http.get in a method in the service,
  // set the observable directly
  products$ = this.httpClient.get<Product[]>(this.productsUrl)
    .pipe(
      tap(console.table),
      catchError(this.handleError)
    );

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (typeof (err) === 'string') {
      errorMessage = err;
    } else {
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
      }
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }

}
