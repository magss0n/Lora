import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Sale {
  id: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  saleDate: Date;
  buyer: string;
  paymentStatus: 'paid' | 'pending' | 'partial';
}

interface Payment {
  id: string;
  farmerName: string;
  amount: number;
  paymentDate: Date;
  method: string;
  status: 'completed' | 'pending';
}

@Component({
  selector: 'app-sales-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-payment.html',
  styleUrls: ['./sales-payment.scss']
})
export class SalesPaymentComponent implements OnInit {
  sales: Sale[] = [];
  payments: Payment[] = [];
  activeTab: 'sales' | 'payments' = 'sales';
  totalRevenue: number = 0;
  pendingPayments: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadSalesData();
    this.loadPaymentsData();
  }

  loadSalesData(): void {
    // TODO: Load from service
  }

  loadPaymentsData(): void {
    // TODO: Load from service
  }

  switchTab(tab: 'sales' | 'payments'): void {
    this.activeTab = tab;
  }

  recordSale(): void {
    console.log('Record new sale');
  }

  processPayment(farmerId: string): void {
    console.log('Process payment for farmer:', farmerId);
  }
}
