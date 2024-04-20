import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

interface Iuser {
  email : string,
  username : string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentStatus = false;

  isAuth() {
    return this.currentStatus
  }

  login(email:string,password:string) : Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth,email,password).then(()=>{});
    return from(promise)
  }

  register(email : string,username : string, password : string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(response => updateProfile(response.user, {
      displayName : username
    }))
    return from(promise);
  }

  private token : string = ""
  constructor() { }

  getToken() {
    return this.token
  }

  setToke(token : string) {
    this.token = token
  }
}
