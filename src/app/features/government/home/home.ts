import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Dashboard implements AfterViewInit {

  @ViewChild('productionChart') productionChart!: ElementRef;
  @ViewChild('alertsChart') alertsChart!: ElementRef;
  @ViewChild('regionsChart') regionsChart!: ElementRef;

  stats = [
    { title: 'Cooperatives', value: 108, icon: '👥' },
    { title: 'Farmers', value: 108, icon: '👨‍🌾' },
    { title: 'Alerts', value: 108, icon: '🔔' },
    { title: 'Notifications', value: 108, icon: '🟣' }
  ];

  ngAfterViewInit(): void {
    this.loadProductionChart();
    this.loadAlertsChart();
    this.loadRegionsChart();
  }

  loadProductionChart() {
    new Chart(this.productionChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Production',
            data: [20, 25, 22, 30, 35, 32, 28],
            borderColor: '#16a34a',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  loadAlertsChart() {
    new Chart(this.alertsChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Week 1', '2', '3', '4'],
        datasets: [
          {
            data: [5, 10, 7, 14],
            borderColor: '#ef4444',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  loadRegionsChart() {
    new Chart(this.regionsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Centre', 'SW', 'NW', 'West', 'Littoral'],
        datasets: [
          {
            data: [60, 45, 30, 50, 40],
            backgroundColor: '#22c55e'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }
}
