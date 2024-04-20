// declare var google : any;
import { CredentialResponse } from 'google-one-tap';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
