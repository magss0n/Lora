import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics  implements AfterViewInit{
@ViewChild('alertsTrendChart') alertsTrendChart!: ElementRef;
  @ViewChild('alertTypesChart') alertTypesChart!: ElementRef;
  @ViewChild('productionChart') productionChart!: ElementRef;
  @ViewChild('regionChart') regionChart!: ElementRef;

  ngAfterViewInit(): void {
    this.loadAlertsTrend();
    this.loadAlertTypes();
    this.loadProduction();
    this.loadRegions();
  }

  loadAlertsTrend() {
    new Chart(this.alertsTrendChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Alerts',
          data: [30, 45, 40, 60, 55, 70],
          borderColor: '#dc2626',
          tension: 0.4
        }]
      },
      options: { responsive: true }
    });
  }

  loadAlertTypes() {
    new Chart(this.alertTypesChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Flood', 'Fire', 'Pests', 'Disease'],
        datasets: [{
          data: [35, 25, 20, 20],
          backgroundColor: ['#2563eb', '#dc2626', '#eab308', '#9333ea']
        }]
      }
    });
  }

  loadProduction() {
    new Chart(this.productionChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Maize', 'Cassava', 'Rice', 'Cocoa', 'Coffee'],
        datasets: [{
          label: 'Production (tons)',
          data: [120, 150, 90, 110, 80],
          backgroundColor: '#16a34a'
        }]
      },
      options: { responsive: true }
    });
  }

  loadRegions() {
    new Chart(this.regionChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Centre', 'West', 'SW', 'NW', 'Littoral'],
        datasets: [{
          label: 'Alerts per Region',
          data: [60, 45, 50, 40, 35],
          backgroundColor: '#ea580c'
        }]
      },
      options: { responsive: true }
    });
  }
}
