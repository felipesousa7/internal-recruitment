import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.apiUrl}/jobs`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${environment.apiUrl}/jobs/${id}`);
  }

  createJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Observable<Job> {
    return this.http.post<Job>(`${environment.apiUrl}/jobs`, job);
  }

  updateJob(id: number, job: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${environment.apiUrl}/jobs/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/jobs/${id}`);
  }

  applyToJob(jobId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/jobs/${jobId}/apply`, {});
  }
} 