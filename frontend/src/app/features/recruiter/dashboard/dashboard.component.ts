import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService, RecruiterDashboardStats } from '../../../core/services/job.service';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  loading = false;
  error: string | null = null;
  
  stats = [
    { title: 'Vagas Abertas', value: '0', icon: 'work', color: '#3498db' },
    { title: 'Candidatos', value: '0', icon: 'people', color: '#2ecc71' }
  ];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.error = null;

    this.jobService.getRecruiterDashboardStats().subscribe({
      next: (data: RecruiterDashboardStats) => {
        this.stats = [
          { title: 'Vagas Abertas', value: data.openJobs.toString(), icon: 'work', color: '#3498db' },
          { title: 'Candidatos', value: data.totalCandidates.toString(), icon: 'people', color: '#2ecc71' }
        ];
      },
      error: (err: Error) => {
        this.error = 'Erro ao carregar estatísticas';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
} 