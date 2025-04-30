import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent {
  stats = {
    applications: 12,
    interviews: 3,
    offers: 1,
    rejections: 2
  };

  recentJobs = [
    {
      id: 1,
      title: 'Desenvolvedor Frontend',
      company: 'Empresa A',
      status: 'Em Análise',
      date: '2024-03-20'
    },
    {
      id: 2,
      title: 'Desenvolvedor Backend',
      company: 'Empresa B',
      status: 'Aplicado',
      date: '2024-03-19'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Empresa C',
      status: 'Rejeitado',
      date: '2024-03-18'
    }
  ];

  upcomingInterviews = [
    {
      id: 1,
      position: 'Desenvolvedor Frontend',
      company: 'Empresa A',
      date: '2024-03-25',
      time: '14:00'
    },
    {
      id: 2,
      position: 'Desenvolvedor Backend',
      company: 'Empresa B',
      date: '2024-03-26',
      time: '10:00'
    }
  ];
} 