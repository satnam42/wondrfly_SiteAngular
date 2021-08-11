import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/services/api.service.service';
import { Router } from '@angular/router';
import { Label, MultiDataSet } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNo: number = 1;
  pageSize: number;
  forums: any;
  forumRole = 'all';
  userData: any = {};
  activeProgramCount: number = 0
  viewCount: number = 0
  isGraphData: Boolean = true
  sharedChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  chartColors: Array<any> = [{

    borderColor: ' #777CEA;',
    pointBackgroundColor: ' #777CEA;',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#F15C20',
    borderColor: '#F15C20',
    pointBackgroundColor: '#F15C20',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: ' #FFB206',
    borderColor: ' #FFB206',
    pointBackgroundColor: ' #FFB206',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  /*
  * Bar Chart
  */
  barChartLabels: string[] = ["program1", "program2", "program3", "program4"]  //program name
  barChartType = 'bar';
  barChartLegend = true;
  // barChartData: any[] = []
  barChartData: any[] = [{}]
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  // doughnutChart
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    [50, 25, 40, 20, 25]
  ];
  doughnutChartType: ChartType = 'doughnut';
  ChartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(93, 173, 226)',
        'rgba(31, 97, 141)',
        'rgba(243, 156, 18)',
        'rgba(220, 118, 51)',
        '#FF6347'
      ]
    }
  ];


  // bubbleChart
  bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }],
    },
    legend: {
      display: false,
    }

  };
  bubbleChartLabels: Label[] = [];
  bubbleChartType: ChartType = 'bubble';

  bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 100, y: 70, r: 22.22 },
        { x: 30, y: 80, r: 33.00 },
        { x: 70, y: 90, r: 15.22 },
        { x: 20, y: 20, r: 21.50 },
        { x: 80, y: 50, r: 35.67 },
      ]

    },
  ];


  constructor(private apiservice: ApiService, private ngxLoader: NgxUiLoaderService,
    private router: Router) {
    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);
  }
  programCount() {
    this.ngxLoader.start();
    this.apiservice.getProgramCount(this.userData.id).subscribe((res: any) => {
      this.activeProgramCount = res
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }

  getViewCount() {
    this.ngxLoader.start();
    this.apiservice.getView(this.userData.id).subscribe((res: any) => {
      this.viewCount = res.count
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }

  getGraphData() {
    this.ngxLoader.start();
    this.apiservice.graphData(this.userData.id).subscribe((res: any) => {
      if (res.barChartLabels.length) {
        this.isGraphData = true
        this.barChartLabels = res.barChartLabels
        this.barChartData = res.barChartData

      }
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }
  forum() {
    this.router.navigate(['forum/forum-list', this.forumRole]);
  }
  
  forumListByRole() {
    this.ngxLoader.start();
    this.apiservice.forumListByRole(this.forumRole).subscribe((res: any) => {
      if(res){
      this.forums = res;
      }
      console.log('resssssssforum', this.forums);
      this.ngxLoader.stop();
      });
      this.ngxLoader.stop();
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.forumListByRole()
    this.programCount()
    this.getViewCount()
    this.getGraphData()
    }

}
