import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthRequest, LoginResponse, User } from 'src/app/entities/user.model';
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: This will have to come from environ
  private apiUrl = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { };

  private platformId = inject(PLATFORM_ID);

  login(params: AuthRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, params)
      .pipe(
        tap(response => this.storeToken(response))
      );
  };

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
  };

  getAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }

    return null;
  };

  storeToken(response: LoginResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      localStorage.setItem('access_token', response.access_token)
    }
  };

  signup(params: AuthRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, params);
  };

  loginFromToken(): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/tokenlogin`, null);
  };
};

