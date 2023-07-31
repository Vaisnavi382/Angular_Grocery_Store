import { ElementRef, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Login } from './Login';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    username = '';
    loginElement!: ElementRef;
    welcomeElement!: ElementRef;

    constructor(private http: HttpClient) {}


    getUsers(): Observable<Login[]> {
        return this.http.get<Login[]>('./assets/users/users.json').pipe(
            catchError(this.handleError));
    }

   private handleError(err: HttpErrorResponse) {
        console.error(err);
        return throwError(()=>err.error() || 'Server error');
    }
}
