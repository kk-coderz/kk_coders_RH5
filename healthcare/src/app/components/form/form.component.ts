import { HttpClient } from '@angular/common/http';
import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { routerAnimationState } from '../../animations/animations';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  animations : [routerAnimationState]
})
export class FormComponent {
  @HostBinding("@routeAnimationTrigger") routeAnimation = true
  constructor(private http : HttpClient) {}

  formData : FormGroup = new FormGroup({
    name : new FormControl(""),
    age : new FormControl(""),
    medicalCondition : new FormControl(""),
    area : new FormControl(""),
    gender : new FormControl(""),
    date : new FormControl("")
  })

  handleClick() {
    let req = this.http.post("http://127.0.0.1:5000/data",{
      "Name": this.formData.controls["name"].value,
      "Age": this.formData.controls["age"].value,
      "Gender": this.formData.controls["gender"].value,
      "Date of Admission": this.formData.controls["name"].value,
      "Medical Condition": this.formData.controls["name"].value,
      "Area": this.formData.controls["name"].value
  })
    req.subscribe((x)=>{
      console.log(x)
    })
  }

}

