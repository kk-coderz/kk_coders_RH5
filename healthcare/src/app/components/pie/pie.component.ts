import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgxChartsModule, ScaleType }from '@swimlane/ngx-charts';  // added
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Color, colorSets } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [NgxChartsModule, FormsModule ],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent{
  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;
  areas = [
    { id: 'Area1', name: 'Area 1' },
    { id: 'Area2', name: 'Area 2' },
    { id: 'Area3', name: 'Area 3' }
  ];
  selectedArea: string = "Area1";
  chartData: any = {
    "Diabetes": [
      {
        "name": "Male",
        "value": 8940000
      },
      {
        "name": "Female",
        "value": 5000000
      }
    ],
    "Heart Disease": [
      {
        "name": "Male",
        "value": 7500000
      },
      {
        "name": "Female",
        "value": 6700000
      }
    ],
    "Cancer": [
      {
        "name": "Male",
        "value": 8700000
      },
      {
        "name": "Female",
        "value": 8200000
      }
    ],
    "Alzheimers Disease": [
      {
        "name": "Male",
        "value": 3500000
      },
      {
        "name": "Female",
        "value": 5100000
      }
    ],
    "Stroke": [
      {
        "name": "Male",
        "value": 3200000
      },
      {
        "name": "Female",
        "value": 4300000
      }
    ],
    "Respiratory Diseases": [
      {
        "name": "Male",
        "value": 4600000
      },
      {
        "name": "Female",
        "value": 3900000
      }
    ]
  };
  area_number = 0;
  view: [number, number] = [700, 400];
  areaData: any = {
    "Diabetes": [
      {
        "name": "Male",
        "value": 8940000
      },
      {
        "name": "Female",
        "value": 5000000
      }
    ],
    "Heart Disease": [
      {
        "name": "Male",
        "value": 7500000
      },
      {
        "name": "Female",
        "value": 6700000
      }
    ],
    "Cancer": [
      {
        "name": "Male",
        "value": 8700000
      },
      {
        "name": "Female",
        "value": 8200000
      }
    ],
    "Alzheimer's Disease": [
      {
        "name": "Male",
        "value": 3500000
      },
      {
        "name": "Female",
        "value": 5100000
      }
    ],
    "Stroke": [
      {
        "name": "Male",
        "value": 3200000
      },
      {
        "name": "Female",
        "value": 4300000
      }
    ],
    "Respiratory Diseases": [
      {
        "name": "Male",
        "value": 4600000
      },
      {
        "name": "Female",
        "value": 3900000
      }
    ]
  }
  ;
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
  constructor() {} // Inject ApiService

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
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
