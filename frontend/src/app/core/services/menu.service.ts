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
      title: 'Entrevistas',
      icon: 'event',
      route: '/candidate/interviews'
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

  setRole(role: 'CANDIDATE' | 'RECRUITER') {
    const menuItems = role === 'CANDIDATE' ? this.candidateMenuItems : this.recruiterMenuItems;
    this.menuItemsSubject.next(menuItems);
  }
} 