import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Stock {
  id: string;
  productName: string;
  quantity: number;
  unit: string;
  lastUpdated: Date;
  status: 'high' | 'medium' | 'low';
}

interface Production {
  id: string;
  farmerName: string;
  productName: string;
  quantity: number;
  deliveryDate: Date;
  quality: string;
}

@Component({
  selector: 'app-production-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './production-stock.html',
  styleUrls: ['./production-stock.scss']
})
export class ProductionStockComponent implements OnInit {
  stocks: Stock[] = [];
  recentProductions: Production[] = [];
  activeTab: 'production' | 'stock' = 'production';

  constructor() {}

  ngOnInit(): void {
    this.loadStockData();
    this.loadProductionData();
  }

  loadStockData(): void {
    // TODO: Load from service
  }

  loadProductionData(): void {
    // TODO: Load from service
  }

  switchTab(tab: 'production' | 'stock'): void {
    this.activeTab = tab;
  }

  recordNewProduction(): void {
    console.log('Record new production');
  }
}