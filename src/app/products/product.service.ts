import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
  ){}

  private productsUrl = 'api/products';

  private productSelectedAction = new BehaviorSubject<number>(0);

  // All products
  // Instead of defining the http.get in a method in the service,
  // set the observable directly
  products$ = this.httpClient.get<IProduct[]>(this.productsUrl)
    .pipe(
      tap(console.table),
      catchError(this.handleError)
    );
    

  selectedProduct$ = combineLatest([this.productSelectedAction, this.products$]).pipe(
    map(([selectedProductId, products]: [number, IProduct[]]) => {
      const a = products.find(product => product.id === selectedProductId);
      return a;
    }
      
    ),
    tap(product => console.log('selectedProduct', product)),
    shareReplay(1),
    catchError(this.handleError)
  );

  // Change the selected product
  changeSelectedProduct(selectedProductId: number): void {
    this.productSelectedAction.next(selectedProductId);
  }

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
