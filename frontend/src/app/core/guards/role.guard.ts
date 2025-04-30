import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard = (requiredRole: 'RECRUITER' | 'CANDIDATE') => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.getCurrentUser();

    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    if (user.role === requiredRole) {
      return true;
    }

    // Se o usuário tentar acessar uma rota que não corresponde ao seu papel,
    // redireciona para a rota correta baseada no papel do usuário
    router.navigate([user.role.toLowerCase()]);
    return false;
  };
}; 