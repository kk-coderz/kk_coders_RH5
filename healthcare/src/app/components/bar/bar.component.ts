import { Component } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts';  // added
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // added

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [NgxChartsModule ],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  chartData: any[] = [
    { name: "X", value: 1 },
    { name: "Y", value: 2 }
  ];
  area_number = 0;
    view: [number, number] = [700, 400];

  // Chart data

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };

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
    "Diabetes": {  "Area1": 10, "Area2": 8, "Area3": 8 },
    "Asthma": { "Area2": 8, "Area1": 13, "Area3": 9 },
    "Obesity": { "Area2": 8, "Area1": 11, "Area3": 8 },
    "Arthritis": { "Area2": 8, "Area1": 11, "Area3": 8 },
    "Hypertension": { "Area2": 8, "Area1": 10, "Area3": 8 },
    "Cancer": { "Area2": 9, "Area1": 11, "Area3": 8 }
  };



  areaData: any = {};

  constructor() {
    console.log(this.chartData);
    this.areaData = this.organizeDataByArea(this.rawData);
    this.chartData = this.areaData['Area1'];
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
}
