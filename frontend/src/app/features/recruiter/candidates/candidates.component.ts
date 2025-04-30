import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService, Application } from '../../../core/services/job.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CandidatesComponent implements OnInit {
  candidates: Application[] = [];
  loading = true;
  error: string | null = null;
  selectedStatus: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.loading = true;
    this.error = null;

    this.jobService.getRecruiterRecentApplications().subscribe({
      next: (applications: Application[]) => {
        this.candidates = applications;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Erro ao carregar candidatos. Tente novamente mais tarde.';
        this.loading = false;
        console.error('Erro ao carregar candidatos:', err);
      }
    });
  }

  getFilteredCandidates() {
    if (!this.selectedStatus) {
      return this.candidates;
    }
    return this.candidates.filter(candidate => candidate.status === this.selectedStatus);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'analysis';
      case 'APPROVED':
        return 'approved';
      case 'REJECTED':
        return 'rejected';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Em Análise';
      case 'APPROVED':
        return 'Aprovado';
      case 'REJECTED':
        return 'Reprovado';
      default:
        return status;
    }
  }
} 