import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token : string = ""
  constructor() { }

  getToken() {
    return this.token
  }

  setToke(token : string) {
    this.token = token
  }
}
