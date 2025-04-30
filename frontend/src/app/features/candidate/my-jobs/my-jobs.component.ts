import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MyJobsComponent {
  jobs = [
    { id: 1, title: 'Desenvolvedor Frontend', company: 'Empresa A', status: 'Em Análise', appliedAt: '2024-03-20' },
    { id: 2, title: 'Desenvolvedor Backend', company: 'Empresa B', status: 'Aprovado', appliedAt: '2024-03-19' },
    { id: 3, title: 'UX Designer', company: 'Empresa C', status: 'Reprovado', appliedAt: '2024-03-18' }
  ];
} 