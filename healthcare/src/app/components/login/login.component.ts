// declare var google : any;
import { CredentialResponse } from 'google-one-tap';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private token : string;
  constructor (@Inject(PLATFORM_ID) private platformId : Object,private http:HttpClient, private router : Router, private ngZone:NgZone, private authService : AuthService) {
    this.token = authService.getToken()
  }

  ngOnInit() {
    console.log(this.authService.getToken())
    if (this.token == "" && isPlatformBrowser(this.platformId)) {
      // @ts-ignore
      window.onGoogleLibraryLoad = () => {
        console.log('Google\'s One-tap sign in script loaded!');

        // @ts-ignore
        google.accounts.id.initialize({
          // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
          client_id: "638151064556-6o7bc48rmsqr6f4hhlek80ocdvfpia55.apps.googleusercontent.com",
          callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
          auto_select: true,
          cancel_on_tap_outside: false
        });

        // OPTIONAL: In my case I want to redirect the user to an specific path.
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {
          console.log('Google prompt event triggered...');

          if (notification.getDismissedReason() === 'credential_returned') {
            this.ngZone.run(() => {
              this.router.navigate(['/dashboard'], { replaceUrl: true });
              console.log('Welcome back!');
            });
          }
        });
      };
    }

  }

  handleCredentialResponse(response: CredentialResponse) {
    // Decoding  JWT token...
      let decodedToken: any | null = null;
      try {
        this.token = response?.credential.split('.')[1]
        decodedToken = JSON.parse(atob(this.token));
      } catch (e) {
        console.error('Error while trying to decode token', e);
      } finally {
        this.authService.setToke(this.token)
      }
      console.log('decodedToken', decodedToken);
    }

  handleClick() {
    console.log("clicked")
    const data = {
      "inputs" : [1,2,3,4]
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:secret')
    })
    const res = this.http.post("http://127.0.0.1:5000/predict",data, {
      headers : headers
    })
    res.subscribe((x)=>{
      console.log(x)
    })
  }
}
