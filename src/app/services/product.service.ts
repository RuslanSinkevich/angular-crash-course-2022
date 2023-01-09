import { Injectable } from '@angular/core';
import { catchError, delay, Observable, pipe, retry, tap, throwError } from 'rxjs'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IProduct } from '../models/product';
import { LiteralPrimitive, ThisReceiver } from '@angular/compiler';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })

export class ProductService {

  constructor(
    private http: HttpClient,
    private errorServices: ErrorService
    ) { }

    products: IProduct[]= []

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: { limit: 5 }
      })
    }).pipe(
      delay(20),
      retry(2),
      tap(products => this.products = products),
      catchError(this.errorHandler.bind(this))
      )
  }

  create(product: IProduct): Observable<IProduct>{
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
    .pipe(
      tap(prod =>  this.products.push(prod))
    )
  }

  private errorHandler(error: HttpErrorResponse){
    this.errorServices.handle(error.message)

    return throwError( ()=> error.message)

  }
}
