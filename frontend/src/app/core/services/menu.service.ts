import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
  title: string;
  icon: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private candidateMenuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/candidate/dashboard'
    },
    {
      title: 'Vagas',
      icon: 'work',
      route: '/candidate/jobs'
    },
    {
      title: 'Minhas Candidaturas',
      icon: 'how_to_reg',
      route: '/candidate/applications'
    },
  ];

  private recruiterMenuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/recruiter/dashboard'
    },
    {
      title: 'Vagas',
      icon: 'work',
      route: '/recruiter/jobs'
    },
    {
      title: 'Candidatos',
      icon: 'people',
      route: '/recruiter/candidates'
    },
  ];

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>(this.candidateMenuItems);
  menuItems$ = this.menuItemsSubject.asObservable();

  constructor() {}

  setRole(role: 'CANDIDATE' | 'RECRUITER') {
    if (role === 'CANDIDATE') {
      this.menuItemsSubject.next(this.candidateMenuItems);
    } else {
      this.menuItemsSubject.next(this.recruiterMenuItems);
    }
  }
} 