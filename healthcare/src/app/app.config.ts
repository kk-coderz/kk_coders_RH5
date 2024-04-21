import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: "AIzaSyDNXcUAJgVyEctqyk_y9MkJefev2E9AYpw",
  authDomain: "comunity-health-app.firebaseapp.com",
  projectId: "comunity-health-app",
  storageBucket: "comunity-health-app.appspot.com",
  messagingSenderId: "765396562156",
  appId: "1:765396562156:web:f0e07e93ec5e48b2fff5c9",
  measurementId: "G-BQM0BS1S3E"
};


export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()),
    importProvidersFrom([
      provideFirebaseApp(()=>initializeApp(firebaseConfig)),
      provideAuth(()=>getAuth())
    ])
  ]
};
