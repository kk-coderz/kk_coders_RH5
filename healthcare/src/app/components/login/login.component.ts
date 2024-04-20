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
  // ngOnInit() {
  //   console.log(this.authService.getToken())
  //   if (this.token == "" && isPlatformBrowser(this.platformId)) {
  //     // @ts-ignore
  //     window.onGoogleLibraryLoad = () => {
  //       console.log('Google\'s One-tap sign in script loaded!');

  //       // @ts-ignore
  //       google.accounts.id.initialize({
  //         // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
  //         client_id: "638151064556-6o7bc48rmsqr6f4hhlek80ocdvfpia55.apps.googleusercontent.com",
  //         callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
  //         auto_select: true,
  //         cancel_on_tap_outside: false
  //       });

  //       // OPTIONAL: In my case I want to redirect the user to an specific path.
  //       // @ts-ignore
  //       google.accounts.id.prompt((notification: PromptMomentNotification) => {
  //         console.log('Google prompt event triggered...');

  //         if (notification.getDismissedReason() === 'credential_returned') {
  //           this.ngZone.run(() => {
  //             this.router.navigate(['/dashboard'], { replaceUrl: true });
  //             console.log('Welcome back!');
  //           });
  //         }
  //       });
  //     };
  //   }

  // }

  // handleCredentialResponse(response: CredentialResponse) {
  //   // Decoding  JWT token...
  //     let decodedToken: any | null = null;
  //     try {
  //       this.token = response?.credential.split('.')[1]
  //       decodedToken = JSON.parse(atob(this.token));
  //     } catch (e) {
  //       console.error('Error while trying to decode token', e);
  //     } finally {
  //       this.authService.setToke(this.token)
  //     }
  //     console.log('decodedToken', decodedToken);
  //   }
  handleClick() {
    this.authService.login(
      this.formData.controls["email"].value,
      this.formData.controls["password"].value
    ).subscribe({
      next : () => {
        this.router.navigate(["/dashboard"])
        this.authService.user$.subscribe((user)=>{
          if (user) {
            this.authService.currentStatus = true
          } else {
            this.authService.currentStatus = false
          }
        })
      },
      error : (e) => this.errorMsg = e.code
    })
  }
}
