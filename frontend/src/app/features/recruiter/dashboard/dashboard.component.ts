import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent {
  stats = [
    { title: 'Vagas Abertas', value: '12', icon: 'work', color: '#3498db' },
    { title: 'Candidatos', value: '45', icon: 'people', color: '#2ecc71' },
    { title: 'Entrevistas Hoje', value: '5', icon: 'event', color: '#e74c3c' },
    { title: 'Novas Inscrições', value: '8', icon: 'person_add', color: '#f1c40f' }
  ];
} 