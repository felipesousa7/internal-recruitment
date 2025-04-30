import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Job } from '../models/job.model';
import { AuthService } from './auth.service';

export interface RecruiterDashboardStats {
  openJobs: number;
  totalCandidates: number;
  todayInterviews: number;
  newApplications: number;
  recentJobs: number;
}

export interface Application {
  id: number;
  candidate: {
    id: number;
    name: string;
    email: string;
  };
  job: {
    id: number;
    title: string;
  };
  status: string;
  appliedAt: string;
  feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.apiUrl}/jobs`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${environment.apiUrl}/jobs/${id}`);
  }

  createJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Observable<Job> {
    return this.http.post<Job>(`${environment.apiUrl}/jobs`, job, { headers: this.getHeaders() });
  }

  updateJob(id: number, job: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${environment.apiUrl}/jobs/${id}`, job, { headers: this.getHeaders() });
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/jobs/${id}`, { headers: this.getHeaders() });
  }

  applyToJob(jobId: number): Observable<void> {
    const headers = this.getHeaders();
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.post<void>(
      `${environment.apiUrl}/applications`, 
      null,
      { 
        headers,
        params: {
          candidateId: currentUser.id.toString(),
          jobId: jobId.toString()
        },
        withCredentials: true
      }
    );
  }

  getCandidateApplications(): Observable<Job[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.get<Job[]>(`${environment.apiUrl}/applications/candidate/${currentUser.id}`, { 
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  getDashboardStats(): Observable<any> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.get<any>(`${environment.apiUrl}/candidates/${currentUser.id}/dashboard/stats`, { 
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  getUpcomingInterviews(): Observable<any[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.get<any[]>(`${environment.apiUrl}/candidates/${currentUser.id}/interviews/upcoming`, { 
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  getRecruiterDashboardStats(): Observable<RecruiterDashboardStats> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.get<RecruiterDashboardStats>(`${environment.apiUrl}/recruiters/${currentUser.id}/dashboard/stats`, { 
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  getRecruiterRecentJobs(): Observable<Job[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.get<Job[]>(`${environment.apiUrl}/recruiters/${currentUser.id}/jobs/recent`, { 
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  getRecruiterRecentApplications(): Observable<any[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.get<any[]>(`${environment.apiUrl}/recruiters/${currentUser.id}/applications/recent`, { 
      headers: this.getHeaders(),
      withCredentials: true
    });
  }
} 