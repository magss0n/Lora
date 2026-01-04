// src/app/core/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { 
  DashboardStats, 
  QuickAction, 
  Activity, 
  Alert, 
  ProductionTrend,
  CropDistribution,
  RegionalPerformance 
} from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() {}

  getDashboardStats(): Observable<DashboardStats> {
    // Mock data - replace with actual API call when backend is ready
    return of({
      totalFarmers: 1247,
      activeFarmers: 234,
      totalProduction: 45678,
      stockLevel: 12340,
      outstandingCredits: 42800000,
      recentTransactions: 42
    });
  }

  getQuickActions(): Observable<QuickAction[]> {
    return of([
      { id: 1, title: 'Register New Farmer', icon: 'users-icon', route: '/farmer-management/new', color: 'primary' },
      { id: 2, title: 'Record Production', icon: 'pallet-icon', route: '/production-stock/new', color: 'success' },
      { id: 3, title: 'Create Announcement', icon: 'communication-icon', route: '/communication/new', color: 'warning' },
      { id: 4, title: 'Process Payment', icon: 'sales-icon', route: '/sales-payment/new', color: 'danger' },
      { id: 5, title: 'Issue Credit', icon: 'credit-icon', route: '/credit-management/new', color: 'info' },
      { id: 6, title: 'Health Report', icon: 'plant-icon', route: '/plant-health/new', color: 'accent' }
    ]);
  }

  getRecentActivities(): Observable<Activity[]> {
    return of([
      { 
        id: 1, 
        type: 'registration', 
        title: 'New Member Registered', 
        description: 'Adebayo Farms joined the cooperative',
        time: '2h ago',
        farmerName: 'Adebayo Farms'
      },
      { 
        id: 2, 
        type: 'delivery', 
        title: 'Stock Delivery', 
        description: '5.2t maize delivered',
        time: '4h ago',
        farmerName: 'Okoro Farms',
        product: 'Maize',
        amount: 5200
      },
      { 
        id: 3, 
        type: 'payment', 
        title: 'Payment Processed', 
        description: '₦1.25M paid to farmers',
        time: '6h ago',
        amount: 1250000
      },
      { 
        id: 4, 
        type: 'alert', 
        title: 'Plant Health Alert', 
        description: 'Cassava mosaic disease detected',
        time: '1d ago'
      },
      { 
        id: 5, 
        type: 'credit', 
        title: 'Credit Approved', 
        description: '₦500,000 loan approved',
        time: '2d ago',
        farmerName: 'Chinedu Farms',
        amount: 500000
      }
    ]);
  }

  getAlerts(): Observable<Alert[]> {
    return of([
      { 
        id: 1, 
        type: 'health_issue', 
        title: 'Disease Outbreak Detected', 
        message: 'Cassava mosaic disease in Northern region',
        severity: 'high',
        time: '2h ago',
        product: 'Cassava'
      },
      { 
        id: 2, 
        type: 'low_stock', 
        title: 'Low Stock Warning', 
        message: 'Fertilizer inventory below 20%',
        severity: 'medium',
        time: '6h ago',
        product: 'Fertilizer'
      },
      { 
        id: 3, 
        type: 'payment_due', 
        title: 'Payment Reminder', 
        message: '23 farmers pending payment approval',
        severity: 'medium',
        time: '1d ago'
      },
      { 
        id: 4, 
        type: 'pending_approval', 
        title: 'Pending Approvals', 
        message: '5 credit applications awaiting review',
        severity: 'low',
        time: '2d ago'
      }
    ]);
  }

  getProductionTrends(): Observable<ProductionTrend[]> {
    return of([
      { month: 'Jan', maize: 1200, cassava: 800, rice: 600, yam: 400 },
      { month: 'Feb', maize: 1900, cassava: 1200, rice: 800, yam: 600 },
      { month: 'Mar', maize: 1500, cassava: 1000, rice: 700, yam: 500 },
      { month: 'Apr', maize: 2200, cassava: 1400, rice: 900, yam: 700 },
      { month: 'May', maize: 1800, cassava: 1600, rice: 1000, yam: 800 },
      { month: 'Jun', maize: 2500, cassava: 1900, rice: 1200, yam: 1000 }
    ]);
  }

  getCropDistribution(): Observable<CropDistribution[]> {
    return of([
      { crop: 'Maize', percentage: 35, amount: 15960 },
      { crop: 'Cassava', percentage: 25, amount: 11400 },
      { crop: 'Rice', percentage: 20, amount: 9120 },
      { crop: 'Yam', percentage: 15, amount: 6840 },
      { crop: 'Others', percentage: 5, amount: 2280 }
    ]);
  }

  getRegionalPerformance(): Observable<RegionalPerformance[]> {
    return of([
      { region: 'North', production: 3200, farmers: 450, performance: 85 },
      { region: 'South', production: 2800, farmers: 380, performance: 78 },
      { region: 'East', production: 2100, farmers: 320, performance: 72 },
      { region: 'West', production: 1900, farmers: 280, performance: 68 },
      { region: 'Central', production: 2500, farmers: 350, performance: 82 }
    ]);
  }
}