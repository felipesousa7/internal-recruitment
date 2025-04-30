import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-candidate-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  loading = true;
  error: string | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.error = null;
    
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar as vagas. Tente novamente mais tarde.';
        this.loading = false;
        console.error('Erro ao carregar vagas:', err);
      }
    });
  }

  applyToJob(jobId: number) {
    this.jobService.applyToJob(jobId).subscribe({
      next: () => {
        // Atualiza o status da vaga localmente
        const job = this.jobs.find(j => j.id === jobId);
        if (job) {
          job.status = 'Aplicado';
        }
      },
      error: (err) => {
        console.error('Erro ao se candidatar:', err);
        alert('Erro ao se candidatar à vaga. Tente novamente mais tarde.');
      }
    });
  }
} 