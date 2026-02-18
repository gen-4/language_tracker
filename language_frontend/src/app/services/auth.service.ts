import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthRequest, LoginResponse, User } from 'src/app/entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: This will have to come from environ
  private apiUrl = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { };

  login(params: AuthRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, params)
      .pipe(
        tap(response => this.storeToken(response))
      );
  };

  logout(): void {
    localStorage.removeItem('access_token');
  };

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  };

  storeToken(response: LoginResponse): void {
    localStorage.clear();
    localStorage.setItem('access_token', response.access_token)
  };

  signup(params: AuthRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, params);
  };


};

