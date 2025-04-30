import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class InterviewsComponent {
  interviews = [
    { id: 1, position: 'Desenvolvedor Frontend', company: 'Empresa A', date: '2024-03-25', time: '14:00', status: 'Agendada' },
    { id: 2, position: 'Desenvolvedor Backend', company: 'Empresa B', date: '2024-03-26', time: '10:00', status: 'Confirmada' },
    { id: 3, position: 'UX Designer', company: 'Empresa C', date: '2024-03-27', time: '15:30', status: 'Cancelada' }
  ];
} 