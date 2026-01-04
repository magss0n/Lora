// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

// Services
import { DashboardService } from '../../core/services/dashboard';

// Models
import { 
  DashboardStats, 
  QuickAction, 
  Activity, 
  Alert, 
  ProductionTrend,
  CropDistribution,
  RegionalPerformance 
} from '../../core/models/dashboard';

// SVG Icons
import { 
  UsersIcon, 
  PalletIcon, 
  CreditIcon, 
  SalesIcon, 
  PlantIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  PackageIcon,
  CommunicationIcon
} from '../../shared/components/svg-icons/svg-icons';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // SVG Icons
    UsersIcon,
    PalletIcon,
    CreditIcon,
    SalesIcon,
    PlantIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    AlertIcon,
    CheckCircleIcon,
    ClockIcon,
    PlusIcon,
    PackageIcon,
    CommunicationIcon
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Data properties
  dashboardStats: DashboardStats = {
    totalFarmers: 0,
    activeFarmers: 0,
    totalProduction: 0,
    stockLevel: 0,
    outstandingCredits: 0,
    recentTransactions: 0
  };
  
  quickActions: QuickAction[] = [];
  recentActivities: Activity[] = [];
  alerts: Alert[] = [];
  productionTrends: ProductionTrend[] = [];
  cropDistribution: CropDistribution[] = [];
  regionalPerformance: RegionalPerformance[] = [];
  
  // Chart instances
  productionChart: Chart | null = null;
  cropChart: Chart | null = null;
  regionalChart: Chart | null = null;
  
  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  
  // Loading states
  isLoading = {
    stats: true,
    activities: true,
    alerts: true,
    charts: true,
    quickActions: true
  };
  
  // Error states
  hasError = {
    stats: false,
    activities: false,
    alerts: false,
    charts: false,
    quickActions: false
  };
  
  constructor(
    private dashboardService: DashboardService
  ) {}
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.destroyCharts();
  }

  private destroyCharts(): void {
    if (this.productionChart) {
      this.productionChart.destroy();
      this.productionChart = null;
    }
    if (this.cropChart) {
      this.cropChart.destroy();
      this.cropChart = null;
    }
    if (this.regionalChart) {
      this.regionalChart.destroy();
      this.regionalChart = null;
    }
  }
  
  loadDashboardData(): void {
    // Reset loading states
    this.isLoading = {
      stats: true,
      activities: true,
      alerts: true,
      charts: true,
      quickActions: true
    };
    
    // Load dashboard stats
    this.subscriptions.add(
      this.dashboardService.getDashboardStats().subscribe({
        next: (stats) => {
          this.dashboardStats = stats;
          this.isLoading.stats = false;
        },
        error: (error) => {
          console.error('Error loading dashboard stats:', error);
          this.isLoading.stats = false;
          this.hasError.stats = true;
        }
      })
    );
    
    // Load quick actions
    this.subscriptions.add(
      this.dashboardService.getQuickActions().subscribe({
        next: (actions) => {
          this.quickActions = actions;
          this.isLoading.quickActions = false;
        },
        error: (error) => {
          console.error('Error loading quick actions:', error);
          this.isLoading.quickActions = false;
          this.hasError.quickActions = true;
        }
      })
    );
    
    // Load recent activities
    this.subscriptions.add(
      this.dashboardService.getRecentActivities().subscribe({
        next: (activities) => {
          this.recentActivities = activities;
          this.isLoading.activities = false;
        },
        error: (error) => {
          console.error('Error loading activities:', error);
          this.isLoading.activities = false;
          this.hasError.activities = true;
        }
      })
    );
    
    // Load alerts
    this.subscriptions.add(
      this.dashboardService.getAlerts().subscribe({
        next: (alerts) => {
          this.alerts = alerts;
          this.isLoading.alerts = false;
        },
        error: (error) => {
          console.error('Error loading alerts:', error);
          this.isLoading.alerts = false;
          this.hasError.alerts = true;
        }
      })
    );
    
    // Load all chart data
    this.loadChartData();
  }
  
  loadChartData(): void {
    // Load production trends
    this.subscriptions.add(
      this.dashboardService.getProductionTrends().subscribe({
        next: (trends) => {
          this.productionTrends = trends;
          setTimeout(() => this.initProductionChart(), 50);
        },
        error: (error) => {
          console.error('Error loading production trends:', error);
          this.hasError.charts = true;
        }
      })
    );
    
    // Load crop distribution
    this.subscriptions.add(
      this.dashboardService.getCropDistribution().subscribe({
        next: (distribution) => {
          this.cropDistribution = distribution;
          setTimeout(() => this.initCropChart(), 100);
        },
        error: (error) => {
          console.error('Error loading crop distribution:', error);
          this.hasError.charts = true;
        }
      })
    );
    
    // Load regional performance
    this.subscriptions.add(
      this.dashboardService.getRegionalPerformance().subscribe({
        next: (performance) => {
          this.regionalPerformance = performance;
          setTimeout(() => this.initRegionalChart(), 150);
          this.isLoading.charts = false;
        },
        error: (error) => {
          console.error('Error loading regional performance:', error);
          this.isLoading.charts = false;
          this.hasError.charts = true;
        }
      })
    );
  }
  
  initProductionChart(): void {
    const canvas = document.getElementById('productionChart') as HTMLCanvasElement;
    if (!canvas) {
      console.warn('Production chart canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Could not get 2D context for production chart');
      return;
    }
    
    // Destroy existing chart
    if (this.productionChart) {
      this.productionChart.destroy();
    }
    
    try {
      this.productionChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.productionTrends.map(t => t.month),
          datasets: [
            {
              label: 'Maize',
              data: this.productionTrends.map(t => t.maize),
              borderColor: '#2d5016',
              backgroundColor: 'rgba(45, 80, 22, 0.1)',
              tension: 0.4,
              fill: true,
              borderWidth: 2
            },
            {
              label: 'Cassava',
              data: this.productionTrends.map(t => t.cassava),
              borderColor: '#4a7c2a',
              backgroundColor: 'rgba(74, 124, 42, 0.1)',
              tension: 0.4,
              fill: true,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#1a1f16',
                font: { size: 12 }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: { color: '#5a6c5d' }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#5a6c5d' }
            }
          },
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          }
        }
      });
    } catch (error) {
      console.error('Error creating production chart:', error);
    }
  }
  
  initCropChart(): void {
    const canvas = document.getElementById('cropChart') as HTMLCanvasElement;
    if (!canvas) {
      console.warn('Crop chart canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Could not get 2D context for crop chart');
      return;
    }
    
    // Destroy existing chart
    if (this.cropChart) {
      this.cropChart.destroy();
    }
    
    try {
      this.cropChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.cropDistribution.map(c => c.crop),
          datasets: [{
            data: this.cropDistribution.map(c => c.percentage),
            backgroundColor: [
              '#2d5016',
              '#4a7c2a',
              '#8db596',
              '#e9b949',
              '#c44536'
            ],
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.8)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#1a1f16',
                font: { size: 11 },
                padding: 15
              }
            }
          },
          cutout: '60%',
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    } catch (error) {
      console.error('Error creating crop chart:', error);
    }
  }
  
  initRegionalChart(): void {
    const canvas = document.getElementById('regionalChart') as HTMLCanvasElement;
    if (!canvas) {
      console.warn('Regional chart canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Could not get 2D context for regional chart');
      return;
    }
    
    // Destroy existing chart
    if (this.regionalChart) {
      this.regionalChart.destroy();
    }
    
    try {
      this.regionalChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.regionalPerformance.map(r => r.region),
          datasets: [{
            label: 'Production (kg)',
            data: this.regionalPerformance.map(r => r.production),
            backgroundColor: 'rgba(141, 181, 150, 0.7)',
            borderColor: '#6a9977',
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: { color: '#5a6c5d' }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#5a6c5d' }
            }
          },
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          }
        }
      });
    } catch (error) {
      console.error('Error creating regional chart:', error);
    }
  }
  
  getActivityIcon(type: string): string {
    switch(type) {
      case 'registration': return 'users-icon';
      case 'delivery': return 'pallet-icon';
      case 'payment': return 'sales-icon';
      case 'alert': return 'alert-icon';
      case 'credit': return 'credit-icon';
      default: return 'clock-icon';
    }
  }
  
  getAlertIcon(type: string): string {
    switch(type) {
      case 'low_stock': return 'alert-icon';
      case 'payment_due': return 'clock-icon';
      case 'health_issue': return 'plant-icon';
      case 'pending_approval': return 'check-circle-icon';
      default: return 'alert-icon';
    }
  }
  
  getSeverityColor(severity: string): string {
    switch(severity) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'info';
    }
  }
  
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return `₦${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `₦${(num / 1000).toFixed(1)}K`;
    }
    return `₦${num}`;
  }
  
  // Add retry method
  retryLoadData(type: 'stats' | 'activities' | 'alerts' | 'charts' | 'quickActions'): void {
    this.hasError[type] = false;
    this.isLoading[type] = true;
    
    switch(type) {
      case 'stats':
        this.subscriptions.add(
          this.dashboardService.getDashboardStats().subscribe(stats => {
            this.dashboardStats = stats;
            this.isLoading.stats = false;
          })
        );
        break;
      case 'quickActions':
        this.subscriptions.add(
          this.dashboardService.getQuickActions().subscribe(actions => {
            this.quickActions = actions;
            this.isLoading.quickActions = false;
          })
        );
        break;
      case 'activities':
        this.subscriptions.add(
          this.dashboardService.getRecentActivities().subscribe(activities => {
            this.recentActivities = activities;
            this.isLoading.activities = false;
          })
        );
        break;
      case 'alerts':
        this.subscriptions.add(
          this.dashboardService.getAlerts().subscribe(alerts => {
            this.alerts = alerts;
            this.isLoading.alerts = false;
          })
        );
        break;
      case 'charts':
        this.loadChartData();
        break;
    }
  }
}   