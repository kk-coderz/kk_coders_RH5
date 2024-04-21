import { Component, inject } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts';  // added
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Color, colorSets } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
import { ApiService } from '../../services/api.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // added

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [NgxChartsModule, FormsModule ],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  areas = [
    { id: 'Area1', name: 'Area 1' },
    { id: 'Area2', name: 'Area 2' },
    { id: 'Area3', name: 'Area 3' }
  ];
  selectedArea: string = "Area1";
  chartData: any[] = [ ];
  area_number = 0;
  view: [number, number] = [700, 400];

  // Chart data

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#2196F3', '#1E88E5']
  };
  schemeType = "ordinal"

  // Options
  gradient: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  yAxisLabel: string = 'Population';
  
  areaData: any = {};
  constructor(private apiService: ApiService) {} // Inject ApiService

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getStats().subscribe((data: any) => {
      this.areaData = data;
      this.selectedArea = this.areas[0].id;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.chartData = Object.keys(this.areaData[this.selectedArea]).map((key: string) => ({
      name: key,
      value: this.areaData[this.selectedArea][key],
    }));
    console.log(this.chartData);
  }

  onAreaChange(): void {
    this.updateChartData();
  }
}
