import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Job {
  id?: number;
  title: string;
  description: string;
  requirements: string;
  status: 'OPEN' | 'CLOSED';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  requirements: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private http: HttpClient) {}

  createJob(job: CreateJobRequest): Observable<Job> {
    return this.http.post<Job>(`${environment.apiUrl}/jobs`, job);
  }

  updateJob(id: number, job: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${environment.apiUrl}/jobs/${id}`, job);
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.apiUrl}/jobs`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${environment.apiUrl}/jobs/${id}`);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/jobs/${id}`);
  }

  getJobsByRecruiter(recruiterId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.apiUrl}/jobs/recruiter/${recruiterId}`);
  }
} 