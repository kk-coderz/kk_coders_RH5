import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BarComponent } from '../bar/bar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, BarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
