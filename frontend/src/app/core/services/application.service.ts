import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  job: {
    title: string;
    description: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${environment.apiUrl}/applications/my`);
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${environment.apiUrl}/applications/${id}`);
  }

  updateApplicationStatus(id: number, status: 'APPROVED' | 'REJECTED'): Observable<Application> {
    return this.http.put<Application>(`${environment.apiUrl}/applications/${id}/status`, { status });
  }

  getApplicationsByJob(jobId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${environment.apiUrl}/jobs/${jobId}/applications`);
  }
} 