import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BarComponent } from '../bar/bar.component';
import { Bar1Component } from '../bar1/bar1.component';
import { PieComponent } from '../pie/pie.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, BarComponent, Bar1Component, PieComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
