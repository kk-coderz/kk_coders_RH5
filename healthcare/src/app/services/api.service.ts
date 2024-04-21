import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DataInterface {
  name : string,
  age : string,
  gender : "Male" | "Female",
  dateOfAdmission : string,
  medicalCondition : string,
  area : "Area1" | "Area2" | "Area3"
}

export interface predictionInterface {
  name : string,
  age : string,
  gender : string,
  area : "Area1" | "Area2" | "Area3"
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }

  sendData(body : DataInterface) {
    this.http.post("http://127.0.0.1:5000/data",{
        "Name" : body.name,
        "Age" : body.age,
        "Gender" : body.gender,
        "Date of Admission" : body.dateOfAdmission,
        "Medical Condition" : body.medicalCondition,
        "Area" : body.area
    },
  )}

  predictionData(body : predictionInterface) {
    return this.http.post("http://127.0.0.1:5000/predict",{
      "Name" : body.name,
      "Age" : body.age,
      "Gender" : body.gender,
      "Area" : body.area
  },
  {
    headers : new HttpHeaders({
      "Authorization" : "Basic " + btoa("admin:secret")
    })
  })
  }

  getStats() {
    return this.http.get("http://127.0.0.1:5000/stats" , {
      headers : new HttpHeaders({
        "Authorization" : "Basic " + btoa("admin:secret")
      })
    })
  }

  getPast() {
    return this.http.get("http://127.0.0.1:5000/past" , {
      headers : new HttpHeaders({
        "Authorization" : "Basic " + btoa("admin:secret")
      })
    })
  }
}
