import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './features/candidate/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'recruiter',
    canActivate: [AuthGuard, RoleGuard],
    data: { userRole: 'RECRUITER' },
    loadChildren: () => import('./features/recruiter/recruiter.routes').then(m => m.recruiterRoutes)
  },
  {
    path: 'candidate',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/candidate/candidate.routes').then(m => m.candidateRoutes)
  },
  {
    path: '',
    redirectTo: 'candidate',
    pathMatch: 'full'
  }
];
