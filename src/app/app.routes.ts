import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/cooperative/layout/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },

  {
    path: 'landing',
    loadComponent: () => import('./features/landing/landing').then(m => m.LandingComponent)
  },

  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login)
  },

  // Government Routes
  {
    path: 'government',
    loadComponent: () => import('./features/government/dashboard-layout/dashboard-layout').then(m => m.DashboardLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/government/home/home').then(m => m.Dashboard)
      },
      {
        path: 'alerts',
        loadComponent: () => import('./features/government/alerts/alerts').then(m => m.Alerts)
      },
      {
        path: 'cooperatives',
        loadComponent: () => import('./features/government/cooperatives/cooperatives').then(m => m.Cooperatives)
      },
      {
        path: 'statistics',
        loadComponent: () => import('./features/government/statistics/statistics').then(m => m.Statistics)
      },
      {
        path: 'announcements',
        loadComponent: () => import('./features/government/announcements/announcements').then(m => m.Announcements)
      }
    ]
  },

  // Cooperative Routes
  {
    path: 'cooperative',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/cooperative/dashboard/dashboard-module').then(m => m.DashboardModule)
      },
     {
        path: 'farmer-management',
        loadChildren: () => import('./features/cooperative/farmer-management/farmer-management-module').then(m => m.FarmerManagementModule)
      },
      {
        path: 'production-stock',
        loadChildren: () => import('./features/cooperative/production-stock/production-stock-module').then(m => m.ProductionStockModule)
      },
      {
        path: 'plant-health',
        loadChildren: () => import('./features/cooperative/plant-health/plant-health-module').then(m => m.PlantHealthModule)
      },
      {
        path: 'credit-management',
        loadChildren: () => import('./features/cooperative/credit-management/credit-management-module').then(m => m.CreditManagementModule)
      },
      {
        path: 'sales-payment',
        loadChildren: () => import('./features/cooperative/sales-payment/sales-payment-module').then(m => m.SalesPaymentModule)
      },
      {
        path: 'communication',
        loadChildren: () => import('./features/cooperative/communication/communication-module').then(m => m.CommunicationModule)
      },
      {
        path: 'contracts',
        loadChildren: () => import('./features/cooperative/contracts/contracts-module').then(m => m.ContractsModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./features/cooperative/reports/reports-module').then(m => m.ReportsModule)
      }
    ]
  },

  // Wildcard route
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
];
