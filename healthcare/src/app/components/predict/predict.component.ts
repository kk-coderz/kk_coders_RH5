import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-predict',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.css'
})
export class PredictComponent {
   constructor (private http:HttpClient) {}

  formData : FormGroup = new FormGroup({
    name : new FormControl(""),
    age : new FormControl(""),
    gender : new FormControl(""),
    area : new FormControl("")
  })

   handleClick() {
    return true
   }
}
