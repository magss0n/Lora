import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CooperativeApiService } from '../../../core/services/cooperative-api';
import { UserApiService } from '../../../core/services/user-api';
import { NotificationApiService } from '../../../core/services/notification-api';
import { AnnouncementApiService } from '../../../core/services/announcement-api';
import { NotificationDto } from '../../../core/interfaces/notification-api';
import { CooperativeDto } from '../../../core/interfaces/cooperative-api';
import { AnnouncementDto } from '../../../core/interfaces/announcement-api';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {

  private readonly cooperativeApi = inject(CooperativeApiService);
  private readonly userApi = inject(UserApiService);
  private readonly notificationApi = inject(NotificationApiService);
  private readonly announcementApi = inject(AnnouncementApiService);

  @ViewChild('productionChart') productionChart!: ElementRef;
  @ViewChild('alertsChart') alertsChart!: ElementRef;
  @ViewChild('regionsChart') regionsChart!: ElementRef;

  loading = true;
  errorMessage: string | null = null;

  dashboardMetrics = {
    totalAlertsYtd: 0,
    criticalAlerts: 0,
    registeredCooperatives: 0,
    activeFarmers: 0,
  };

  stats = [
    { title: 'Cooperatives', value: 0, icon: '👥' },
    { title: 'Farmers', value: 0, icon: '👨‍🌾' },
    { title: 'Alerts', value: 0, icon: '🔔' },
    { title: 'Notifications', value: 0, icon: '🟣' },
  ];

  private productionChartInstance: Chart | null = null;
  private alertsChartInstance: Chart | null = null;
  private regionsChartInstance: Chart | null = null;

  private latestAnnouncements: AnnouncementDto[] = [];
  private latestNotifications: NotificationDto[] = [];
  private latestCooperatives: CooperativeDto[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    this.initCharts();
    this.renderCharts();
  }

  ngOnDestroy(): void {
    this.productionChartInstance?.destroy();
    this.alertsChartInstance?.destroy();
    this.regionsChartInstance?.destroy();
  }

  private loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = null;

    forkJoin({
      cooperatives: this.cooperativeApi.getAll().pipe(
        catchError(() => of([] as CooperativeDto[]))
      ),
      users: this.userApi.getAllUsers().pipe(
        catchError(() => of([] as any[]))
      ),
      notificationSummary: this.notificationApi.getSummary().pipe(
        catchError(() => of(null))
      ),
      notifications: this.notificationApi.getAll().pipe(
        catchError(() => of([] as NotificationDto[]))
      ),
      announcements: this.announcementApi.getAnnouncements().pipe(
        catchError(() => of([] as AnnouncementDto[]))
      ),
      publishedAnnouncementsCount: this.announcementApi.countByStatus('PUBLISHED').pipe(
        catchError(() => of(0))
      ),
    }).subscribe({
      next: (res) => {
        this.latestCooperatives = res.cooperatives;
        this.latestNotifications = res.notifications;
        this.latestAnnouncements = res.announcements;

        const farmersCount = (res.users ?? []).filter((u: any) => u?.role === 'FARMER').length;
        const cooperativesCount = res.cooperatives.length;

        const totalAlertsYtd = res.notificationSummary?.totalYtd ?? 0;
        const criticalAlerts = res.notificationSummary?.criticalYtd ?? 0;

        this.dashboardMetrics = {
          totalAlertsYtd,
          criticalAlerts,
          registeredCooperatives: cooperativesCount,
          activeFarmers: farmersCount,
        };

        this.stats = [
          { title: 'Cooperatives', value: cooperativesCount, icon: '👥' },
          { title: 'Farmers', value: farmersCount, icon: '👨‍🌾' },
          { title: 'Alerts', value: res.notificationSummary?.newCount ?? totalAlertsYtd, icon: '🔔' },
          { title: 'Notifications', value: res.publishedAnnouncementsCount ?? 0, icon: '🟣' },
        ];

        this.loading = false;
        this.renderCharts();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to load dashboard data.';
        this.renderCharts();
      },
    });
  }

  private initCharts(): void {
    if (this.productionChartInstance || this.alertsChartInstance || this.regionsChartInstance) {
      return;
    }

    this.productionChartInstance = new Chart(this.productionChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Announcements',
            data: [],
            borderColor: '#16a34a',
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });

    this.alertsChartInstance = new Chart(this.alertsChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Alerts',
            data: [],
            borderColor: '#ef4444',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });

    this.regionsChartInstance = new Chart(this.regionsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Cooperatives',
            data: [],
            backgroundColor: '#22c55e',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });
  }

  private renderCharts(): void {
    // Can run before view init.
    if (!this.productionChartInstance || !this.alertsChartInstance || !this.regionsChartInstance) {
      return;
    }

    this.applyAnnouncementsChart(this.latestAnnouncements);
    this.applyAlertsChart(this.latestNotifications);
    this.applyRegionsChart(this.latestCooperatives);
  }

  private applyAnnouncementsChart(announcements: AnnouncementDto[]): void {
    const chart = this.productionChartInstance;
    if (!chart) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const counts = new Array(12).fill(0);
    for (const a of announcements) {
      const dateStr = a.publishedAt ?? a.createdAt;
      if (!dateStr) continue;
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) continue;
      counts[d.getMonth()] += 1;
    }

    chart.data.labels = months;
    chart.data.datasets[0].data = counts;
    chart.update();
  }

  private applyAlertsChart(notifications: NotificationDto[]): void {
    const chart = this.alertsChartInstance;
    if (!chart) return;

    const now = new Date();
    const weekStarts: Date[] = [];

    // last 4 weeks including current week
    for (let i = 3; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i * 7);
      // normalize to midnight
      d.setHours(0, 0, 0, 0);
      weekStarts.push(d);
    }

    const labels = ['-3w', '-2w', '-1w', 'This week'];
    const counts = [0, 0, 0, 0];

    for (const n of notifications) {
      const createdAt = n.createdAt ? new Date(n.createdAt) : null;
      if (!createdAt || Number.isNaN(createdAt.getTime())) continue;

      for (let idx = 0; idx < weekStarts.length; idx++) {
        const start = weekStarts[idx];
        const end = idx === weekStarts.length - 1 ? now : weekStarts[idx + 1];
        if (createdAt >= start && createdAt < end) {
          counts[idx] += 1;
          break;
        }
      }
    }

    chart.data.labels = labels;
    chart.data.datasets[0].data = counts;
    chart.update();
  }

  private applyRegionsChart(cooperatives: CooperativeDto[]): void {
    const chart = this.regionsChartInstance;
    if (!chart) return;

    const regionCounts = new Map<string, number>();

    for (const c of cooperatives) {
      const region = this.extractRegion(c.location);
      regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
    }

    const entries = Array.from(regionCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const labels = entries.map(([r]) => r);
    const data = entries.map(([, v]) => v);

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }

  private extractRegion(location: string): string {
    if (!location) return 'Unknown';
    const parts = location.split('·');
    const region = (parts[0] ?? '').trim();
    if (region) return region;
    const dash = location.split('-')[0]?.trim();
    return dash || 'Unknown';
  }
}
