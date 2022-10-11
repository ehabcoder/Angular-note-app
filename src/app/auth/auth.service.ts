import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface emailAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

interface signingResponse {
  user: {
    createdAt: string,
    email: string,
    id: number,
    name: string,
    token: string,
    updatedAt: string,
  }
}

interface SigninCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/users';
  signedIn$ = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) { }
  
  emailAvailable(email: string) {
    return this.http.post<emailAvailableResponse>(`${this.url}/email`, {email});
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<signingResponse>(`${this.url}/register`, credentials)
    .pipe(
      tap((data) => {
        localStorage.setItem('token', data.user.token);
        this.signedIn$.next(true)
      })
    )
  }

  signout() {
    return this.http.post(`${this.url}/logout`, {}, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.signedIn$.next(false)
      })
    )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<signingResponse>(`${this.url}/login`, credentials)
    .pipe(
      tap((data) => {
        localStorage.setItem('token', data.user.token);
        this.signedIn$.next(true);
      }) 
    )
  }

  checkAuth() {
    return this.http.get(`${this.url}/signedin`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .pipe(
      tap(() => {
        this.signedIn$.next(true)
      }),
      catchError((err) => {
        console.log('this is error ' + err)
       return this.router.navigateByUrl('/')
      })
    )
  }
  
}
