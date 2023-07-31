import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

import { Product } from './product';

@Injectable()
export class ProductService {

    selectedProducts: any = [];
    products: any = [];
    producttype='vegetables';
    username: string = '';


    constructor(private http: HttpClient) {
        if (sessionStorage.getItem('selectedProducts')) {
            this.selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts') + '');
        }
    }

    getProducts(): Observable<Product[]> {
        if (this.producttype === 'vegetables') {
            return this.http.get<Product[]>('./assets/products/vegetables.json').pipe(
                tap((products) => this.products = products),
                catchError(this.handleError));
        } else if (this.producttype === 'fruits') {
            return this.http.get<Product[]>('./assets/products/fruits.json').pipe(
                tap((products) => this.products = products),
                catchError(this.handleError));
        }
        else
         throw new Error();
    }

    getProduct(id: number): Observable<Product> {
        return this.getProducts().pipe(
            map(products => products.filter(product => product.productId === id)[0]));
    }

    private handleError(err: HttpErrorResponse) {
        return throwError(() => err.error() || 'Server error');
    }
}
