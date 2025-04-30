import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  loading = false;
  error: string | null = null;
  
  stats = {
    applications: 0,
    interviews: 0,
    offers: 0,
    rejections: 0
  };

  recentJobs: any[] = [];
  upcomingInterviews: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.error = null;

    // Load stats
    this.jobService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        this.error = 'Erro ao carregar estatísticas';
        console.error(err);
      }
    });

    // Load recent applications
    this.jobService.getCandidateApplications().subscribe({
      next: (applications) => {
        this.recentJobs = applications.slice(0, 3); // Get last 3 applications
      },
      error: (err) => {
        this.error = 'Erro ao carregar candidaturas recentes';
        console.error(err);
      }
    });

    // Load upcoming interviews
    this.jobService.getUpcomingInterviews().subscribe({
      next: (interviews) => {
        this.upcomingInterviews = interviews;
      },
      error: (err) => {
        this.error = 'Erro ao carregar entrevistas';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
} 