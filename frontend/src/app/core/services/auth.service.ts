import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'CANDIDATE' | 'RECRUITER';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'CANDIDATE' | 'RECRUITER';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private token: string | null = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {
    // Recupera o usuário e o token do localStorage ao inicializar
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser !== null && storedUser !== 'undefined' && storedToken !== null) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          this.currentUserSubject.next(parsedUser);
          this.token = storedToken;
          this.setTokenExpirationTimer();
        } else {
          this.clearStorage();
        }
      } catch (error) {
        console.error('Erro ao parsear usuário do localStorage:', error);
        this.clearStorage();
      }
    }
  }

  private setTokenExpirationTimer() {
    if (this.token) {
      const tokenData = JSON.parse(atob(this.token.split('.')[1]));
      const expirationTime = tokenData.exp * 1000; // Converte para milissegundos
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
      
      // Renova o token 5 minutos antes de expirar
      if (timeUntilExpiration > 0) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.refreshToken().subscribe();
        }, timeUntilExpiration - 300000); // 5 minutos em milissegundos
      } else {
        this.clearStorage();
      }
    }
  }

  private refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {}).pipe(
      tap(response => {
        this.token = response.token;
        localStorage.setItem('token', response.token);
        this.setTokenExpirationTimer();
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.clearStorage();
        }
        return throwError(() => error);
      })
    );
  }

  private clearStorage(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.token = null;
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data).pipe(
      tap(response => {
        this.handleAuthResponse(response);
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        this.handleAuthResponse(response);
      })
    );
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.token = response.token;
    this.currentUserSubject.next(response.user);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
    this.setTokenExpirationTimer();
  }

  logout(): void {
    this.clearStorage();
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.token;
  }
} 