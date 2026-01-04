export interface DashboardStats {
  totalFarmers: number;
  activeFarmers: number;
  totalProduction: number;
  stockLevel: number;
  outstandingCredits: number;
  recentTransactions: number;
}

export interface QuickAction {
  id: number;
  title: string;
  icon: string;
  route: string;
  color: string;
}

export interface Activity {
  id: number;
  type: 'registration' | 'delivery' | 'payment' | 'alert' | 'credit';
  title: string;
  description: string;
  time: string;
  farmerName?: string;
  amount?: number;
  product?: string;
}

export interface Alert {
  id: number;
  type: 'low_stock' | 'payment_due' | 'health_issue' | 'pending_approval';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  time: string;
  farmerId?: number;
  product?: string;
}

export interface ProductionTrend {
  month: string;
  maize: number;
  cassava: number;
  rice: number;
  yam: number;
}

export interface CropDistribution {
  crop: string;
  percentage: number;
  amount: number;
}

export interface RegionalPerformance {
  region: string;
  production: number;
  farmers: number;
  performance: number;
}