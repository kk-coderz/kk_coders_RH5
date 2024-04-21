import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { routerAnimationState } from '../../animations/animations';
import { ApiService, DataInterface } from '../../services/api.service';

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
  apiService = inject(ApiService)

  formData : FormGroup = new FormGroup({
    name : new FormControl(""),
    age : new FormControl(""),
    medicalCondition : new FormControl(""),
    area : new FormControl(""),
    gender : new FormControl(""),
    date : new FormControl("")
  })

  handleClick() {
    let data : DataInterface = {
      name : this.formData.controls["name"].value,
      age : this.formData.controls["age"].value,
      gender : this.formData.controls["gender"].value,
      dateOfAdmission : this.formData.controls["name"].value,
      medicalCondition : this.formData.controls["name"].value,
      area : this.formData.controls["name"].value
    }

    this.apiService.sendData(data)
  }
}

