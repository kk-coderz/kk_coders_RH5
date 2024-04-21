import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { routerAnimationState } from '../../animations/animations';
import { ApiService, DataInterface } from '../../services/api.service';
import { FormBuilder, Validator } from '@angular/forms';

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
  constructor(private http : HttpClient, private formBuilder: FormBuilder) {}
  apiService = inject(ApiService)

  formData : FormGroup = this.formBuilder.group({
    name: ["", [Validators.required]],
    age: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
    medicalCondition: new FormControl("", [Validators.required]),
    area: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required])
  });

  handleClick() {
    if (this.formData.valid) {
      let data : DataInterface = {
        name : this.formData.controls["name"].value,
        age : this.formData.controls["age"].value,
        gender : this.formData.controls["gender"].value,
        dateOfAdmission : this.formData.controls["date"].value,
        medicalCondition : this.formData.controls["medicalCondition"].value,
        area : this.formData.controls["area"].value
      }
      this.apiService.sendData(data)
    } else {
      console.log("invalid")
    }
  }
}

