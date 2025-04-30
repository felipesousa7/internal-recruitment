import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JobsComponent {
  jobs = [
    {
      id: 1,
      title: 'Desenvolvedor Frontend',
      company: 'Empresa A',
      location: 'São Paulo, SP',
      type: 'Tempo Integral',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Estamos buscando um desenvolvedor Frontend com experiência em Angular e React.',
      requirements: [
        'Experiência com Angular e React',
        'Conhecimento em TypeScript',
        'Experiência com Git',
        'Boa comunicação'
      ],
      status: 'Aplicado'
    },
    {
      id: 2,
      title: 'Desenvolvedor Backend',
      company: 'Empresa B',
      location: 'Remoto',
      type: 'Tempo Integral',
      salary: 'R$ 10.000 - R$ 15.000',
      description: 'Vaga para desenvolvedor Backend com experiência em Java e Spring Boot.',
      requirements: [
        'Experiência com Java e Spring Boot',
        'Conhecimento em SQL',
        'Experiência com APIs REST',
        'Boa comunicação'
      ],
      status: 'Em Análise'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Empresa C',
      location: 'Rio de Janeiro, RJ',
      type: 'Tempo Integral',
      salary: 'R$ 7.000 - R$ 10.000',
      description: 'Procuramos um UX Designer com experiência em design de interfaces.',
      requirements: [
        'Experiência com Figma',
        'Conhecimento em UX/UI',
        'Portfólio de projetos',
        'Boa comunicação'
      ],
      status: 'Rejeitado'
    }
  ];
} 