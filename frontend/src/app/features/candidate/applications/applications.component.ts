import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-candidate-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ApplicationsComponent implements OnInit {
  applications: Job[] = [];
  loading = true;
  error: string | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.loading = true;
    this.error = null;
    
    this.jobService.getCandidateApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar suas candidaturas. Tente novamente mais tarde.';
        this.loading = false;
        console.error('Erro ao carregar candidaturas:', err);
      }
    });
  }
} 