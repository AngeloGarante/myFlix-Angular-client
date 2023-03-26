import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(public router: Router) {}
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }
}
