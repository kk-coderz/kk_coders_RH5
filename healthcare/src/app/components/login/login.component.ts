// declare var google : any;
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { routerAnimationState } from '../../animations/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations : [routerAnimationState]
})
export class LoginComponent {
  @HostBinding("@routeAnimationTrigger") routeAnimation = true

  errorMsg : string  | null = "";
  authService = inject(AuthService)
  constructor (/*@Inject(PLATFORM_ID) private platformId : Object,*/private http:HttpClient, private router : Router, private ngZone:NgZone) {}
  formData : FormGroup = new FormGroup({
    email : new FormControl(""),
    password : new FormControl("")
  })

  handleClick() {
    this.authService.login(
      this.formData.controls["email"].value,
      this.formData.controls["password"].value
    ).subscribe({
      next : () => {
        this.router.navigate(["/dashboard"])
      },
      error : (e) => {
        this.errorMsg = e.code;
        setTimeout(() => {
          this.errorMsg = null;
        }, 5000);
      }
    })
  }
}
