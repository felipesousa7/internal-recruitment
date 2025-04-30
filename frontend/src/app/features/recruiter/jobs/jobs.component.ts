import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService, Job, CreateJobRequest } from '../../../core/services/jobs.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule
  ]
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  jobForm: FormGroup;
  isLoading = false;
  showForm = false;

  constructor(
    private jobsService: JobsService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobsService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar vagas:', error);
        this.snackBar.open('Erro ao carregar vagas', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.isLoading = true;
      const jobData: CreateJobRequest = this.jobForm.value;

      this.jobsService.createJob(jobData).subscribe({
        next: () => {
          this.snackBar.open('Vaga criada com sucesso!', 'Fechar', { duration: 3000 });
          this.jobForm.reset();
          this.loadJobs();
          this.showForm = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao criar vaga:', error);
          this.snackBar.open('Erro ao criar vaga', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  deleteJob(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      this.isLoading = true;
      this.jobsService.deleteJob(id).subscribe({
        next: () => {
          this.snackBar.open('Vaga excluída com sucesso!', 'Fechar', { duration: 3000 });
          this.loadJobs();
        },
        error: (error) => {
          console.error('Erro ao excluir vaga:', error);
          this.snackBar.open('Erro ao excluir vaga', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.jobForm.reset();
    }
  }
} 