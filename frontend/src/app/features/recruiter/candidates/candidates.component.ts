import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CandidatesComponent {
  candidates = [
    { id: 1, name: 'João Silva', position: 'Desenvolvedor Frontend', status: 'Em Análise', appliedAt: '2024-03-20' },
    { id: 2, name: 'Maria Santos', position: 'Desenvolvedor Backend', status: 'Aprovado', appliedAt: '2024-03-19' },
    { id: 3, name: 'Pedro Oliveira', position: 'UX Designer', status: 'Reprovado', appliedAt: '2024-03-18' }
  ];
} 