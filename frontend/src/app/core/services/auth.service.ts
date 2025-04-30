import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
        } else {
          this.clearStorage();
        }
      } catch (error) {
        console.error('Erro ao parsear usuário do localStorage:', error);
        this.clearStorage();
      }
    } else {
      this.clearStorage();
    }
  }

  private clearStorage(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.token = null;
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data)
      .pipe(
        tap(response => {
          this.currentUserSubject.next(response.user);
          this.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          this.currentUserSubject.next(response.user);
          this.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout(): void {
    this.clearStorage();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!this.token;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.token;
  }
} 