import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../../core/services/menu.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardLayoutComponent implements OnInit {
  menuItems$: Observable<MenuItem[]>;
  currentUser$: Observable<any>;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) {
    this.menuItems$ = this.menuService.menuItems$;
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.menuService.setRole(user.role);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 