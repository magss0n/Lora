import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout';

export const routes: Routes = [
  // Auth routes (no layout)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },

  // Main app routes (with layout)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule)
      },
      {
        path: 'farmer-management',
        loadChildren: () => import('./features/farmer-management/farmer-management-module').then(m => m.FarmerManagementModule)
      },
      {
        path: 'production-stock',
        loadChildren: () => import('./features/production-stock/production-stock-module').then(m => m.ProductionStockModule)
      },
      {
        path: 'plant-health',
        loadChildren: () => import('./features/plant-health/plant-health-module').then(m => m.PlantHealthModule)
      },
      {
        path: 'credit-management',
        loadChildren: () => import('./features/credit-management/credit-management-module').then(m => m.CreditManagementModule)
      },
      {
        path: 'sales-payment',
        loadChildren: () => import('./features/sales-payment/sales-payment-module').then(m => m.SalesPaymentModule)
      },
      {
        path: 'communication',
        loadChildren: () => import('./features/communication/communication-module').then(m => m.CommunicationModule)
      },
      {
        path: 'contracts',
        loadChildren: () => import('./features/contracts/contracts-module').then(m => m.ContractsModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./features/reports/reports-module').then(m => m.ReportsModule)
      }
    ]
  },

  // Wildcard route
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }