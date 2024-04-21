import { HttpClient } from '@angular/common/http';
import { Component, inject, HostBinding } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { predictionInterface } from '../../services/api.service';
import { routerAnimationState } from '../../animations/animations';

@Component({
  selector: 'app-predict',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.css',
  animations : [routerAnimationState]
})
export class PredictComponent {
  @HostBinding("@routeAnimationTrigger") routeAnimation = true

  constructor (private http:HttpClient) {}
  apiService = inject(ApiService)

  formData : FormGroup = new FormGroup({
    name : new FormControl(""),
    age : new FormControl(""),
    gender : new FormControl(""),
    area : new FormControl("")
  })

  handleClick() {
    let name : string = this.formData.controls["name"].value
    let age : string = this.formData.controls["age"].value
    let gender : string = this.formData.controls["gender"].value
    let area : "Area1" | "Area2" | "Area3" = this.formData.controls["area"].value

    const req = this.apiService.predictionData({
      name : name,
      age : age,
      gender : gender,
      area : area
    })
    req.subscribe()
  }
}
