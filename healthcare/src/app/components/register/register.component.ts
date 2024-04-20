import { Component, inject } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router : Router) {}
  authService = inject(AuthService)
  errorMsg : string | null = ""


  formData : FormGroup = new FormGroup({
    username : new FormControl(""),
    email : new FormControl(""),
    password : new FormControl("")
  })

  handleClick() {
    this.authService.register(
      this.formData.controls["email"].value,
      this.formData.controls["username"].value,
      this.formData.controls["password"].value
    ).subscribe({
      next : () => this.router.navigate(["/login"]),
      error : (e) => this.errorMsg = e.code
    })
  }
}
