import { Component } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts';  // added
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Color, colorSets } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // added

@Component({
  selector: 'app-bar1',
  standalone: true,
  imports: [NgxChartsModule, FormsModule ],
  templateUrl: './bar1.component.html',
  styleUrl: './bar1.component.css'
})
export class Bar1Component {
  areas = [
    { id: 'Area1', name: 'Area 1' },
    { id: 'Area2', name: 'Area 2' },
    { id: 'Area3', name: 'Area 3' }
  ];
  selectedArea: string;
  chartData: any[] = [
    { name: "X", value: 1 },
    { name: "Y", value: 2 }
  ];
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

  rawData = {
    "Diabetes": {  "Area1": 9, "Area2": 7, "Area3": 10 },
    "Asthma": { "Area2": 5, "Area1": 10, "Area3": 9 },
    "Obesity": { "Area2": 8, "Area1": 11, "Area3": 8 },
    "Arthritis": { "Area2": 11, "Area1": 11, "Area3": 9 },
    "Hypertension": { "Area2": 8, "Area1": 10, "Area3": 8 },
    "Cancer": { "Area2": 9, "Area1": 8, "Area3": 8 }
  };



  areaData: any = {};

  constructor() {
    console.log(this.chartData);
    this.areaData = this.organizeDataByArea(this.rawData);
    this.chartData = this.areaData['Area1'];
    this.selectedArea = this.areas[0].id;
    console.log(this.chartData);
  }

  organizeDataByArea(data: any): any {
    const areaData: any = {};

    Object.keys(data).forEach(disease => {
      Object.keys(data[disease]).forEach(area => {
        if (!areaData[area]) {
          areaData[area] = [];
        }
        areaData[area].push({
          name: disease,
          value: data[disease][area]
        });
      });
    });
    console.log(areaData)
    return areaData;
  }

  onAreaChange(): void {
    this.chartData = this.areaData[this.selectedArea]
    console.log('Selected Area:', this.selectedArea);
    // Perform actions based on the new selection
  }
}
