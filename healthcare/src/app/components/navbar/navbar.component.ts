import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router : Router) {}
  authService = inject(AuthService)
  logout() {
    console.log("called logout")
    this.authService.logout()
  }

  isLoginPage() {
    return this.router.url === "/" || this.router.url === "/register"
  }
}
