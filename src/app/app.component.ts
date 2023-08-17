import { Component, HostListener, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // this code for creating chart START
  barChartType: ChartType = 'pie';
  barChartType2: ChartType = 'bar';
  barChartLegend = false;
  barChartLabels: Label[] = ['2020-02-20', '2020-02-22', '2020-02-23', '2020-02-24'];
  barChartData: ChartDataSets[] = [
    {
      label: 'X',
      data: [2, 1, 2, 1],
      backgroundColor: ['green', 'red', 'green', 'red'],
      hoverBackgroundColor: ['green', 'red', 'green', 'red']
    }
  ];
  barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: tooltipItem => tooltipItem.yLabel == 1 ? 'No' : 'Yes',
        labelColor: tooltipItem => {
          let color = tooltipItem.yLabel == 1 ? 'red' : 'green';
          return { borderColor: color, backgroundColor: color };
        }
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
        offset: true,
        time: {
          unit: 'day'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          callback: value => {
            if (value == 0) {
              return '';
            }
            return value == 1 ? 'No' : 'Yes';
          }
        }
      }]
    }
  };
  // this code for creating chart ENDS

  constructor(
    private readonly modalService: NgbModal,
    private readonly ngxService: NgxUiLoaderService
  ) {
  }
  ngOnInit(): void {
  }

  downloadjsPDF(): void {
    let data: any = document.getElementById('htmlToCanvasData');
    if(this.isMobile() && data){
      const viewportMetaTag = document.querySelector('meta[name="viewport"]');
      viewportMetaTag.setAttribute('content', '');
      setTimeout(() => {
        this.ngxService.start();
        this.downloadPDF(true, viewportMetaTag, data);
      }, 0);
    }else{
      this.downloadPDF(false,null, data);
    }
  }

  // this code for creating PDF START
  downloadPDF(isMobile = false, viewportMetaTag = null, canvasData =null): void {
    html2canvas(canvasData).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'px', 'a4', true);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
      if(isMobile){
          setTimeout(() => {
            viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=1');
            this.ngxService.stop();
          }, 0);
        }
    });
  }
  // this code for creating PDF ENDS

  isMobile(): boolean {
    return window.innerWidth < 768;
  }
  
}
