import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Credit {
  id: string;
  farmerName: string;
  amount: number;
  purpose: string;
  issueDate: Date;
  dueDate: Date;
  repaidAmount: number;
  status: 'active' | 'completed' | 'overdue';
}

@Component({
  selector: 'app-credit-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-management.html',
  styleUrls: ['./credit-management.scss']
})
export class CreditManagementComponent implements OnInit {
  credits: Credit[] = [];
  filteredCredits: Credit[] = [];
  totalIssued: number = 0;
  totalOutstanding: number = 0;
  activeTab: 'overview' | 'applications' | 'repayments' = 'overview';

  constructor() {}

  ngOnInit(): void {
    this.loadCredits();
    this.calculateTotals();
  }

  loadCredits(): void {
    // TODO: Load from service
  }

  calculateTotals(): void {
    // TODO: Calculate totals
  }

  switchTab(tab: 'overview' | 'applications' | 'repayments'): void {
    this.activeTab = tab;
  }

  approveCredit(creditId: string): void {
    console.log('Approve credit:', creditId);
  }

  recordPayment(creditId: string): void {
    console.log('Record payment:', creditId);
  }
}