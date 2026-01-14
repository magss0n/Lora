import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditService } from '../../../core/services/credit-management';
import { Credit, CreditFilters, LoanApplication, Payment } from '../../../core/models/credit-management';

// SVG Icons
import {
  CreditIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertIcon,
  CheckCircleIcon,
  XCircleIcon,
  DownloadIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  ClockIcon,
  SearchIcon,
  FileIcon,
  UsersIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  DollarIcon,
  PercentIcon,
  CalculatorIcon,
  ReceiptIcon,
  ShieldIcon,
  BarChartIcon
} from '../../../shared/components/svg-icons/svg-icons';

@Component({
  selector: 'app-credit-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SVG Icons
    CreditIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    AlertIcon,
    CheckCircleIcon,
    XCircleIcon,
    DownloadIcon,
    FilterIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    ClockIcon,
    SearchIcon,
    FileIcon,
    UsersIcon,
    PhoneIcon,
    MailIcon,
    MapPinIcon,
    CalendarIcon,
    DollarIcon,
    PercentIcon,
    CalculatorIcon,
    ReceiptIcon,
    ShieldIcon,
    BarChartIcon
  ],
  templateUrl: './credit-management.html',
  styleUrls: ['./credit-management.scss']
})
export class CreditManagementComponent implements OnInit {
  // Data
  credits: Credit[] = [];
  filteredCredits: Credit[] = [];
  loanApplications: LoanApplication[] = [];
  payments: Payment[] = [];
  selectedCredit: Credit | null = null;
  selectedApplication: LoanApplication | null = null;
  selectedPayment: Payment | null = null;

  // Stats
  stats = {
    totalIssued: 0,
    outstandingBalance: 0,
    repaymentRate: 0,
    defaultersCount: 0,
    pendingApplications: 0,
    approvedThisMonth: 0,
    overdueAmount: 0,
    avgInterestRate: 0
  };

  // Filters
  filters: CreditFilters = {};
  searchQuery: string = '';
  statusFilter: string = 'all';
  typeFilter: string = 'all';
  riskFilter: string = 'all';

  // Modals
  showCreditDetailsModal: boolean = false;
  showLoanApplicationModal: boolean = false;
  showPaymentModal: boolean = false;
  showReviewModal: boolean = false;
  showDeleteModal: boolean = false;
  showFiltersModal: boolean = false;
  showRepaymentScheduleModal: boolean = false;
  showBulkPaymentModal: boolean = false;

  // Forms
  creditForm: FormGroup;
  loanApplicationForm: FormGroup;
  paymentForm: FormGroup;
  bulkPaymentForm: FormGroup;

  // Loading states
  isLoading: boolean = false;
  isProcessingPayment: boolean = false;
  isProcessingBulk: boolean = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;

  // View tabs
  activeTab: string = 'loans';
  activeCreditTab: string = 'details';

  // Charts
  repaymentChartData: any;
  interestChartData: any;

  constructor(
    private creditService: CreditService,
    private fb: FormBuilder
  ) {
    // Credit Form
    this.creditForm = this.fb.group({
      loanId: ['', Validators.required],
      farmerId: ['', Validators.required],
      farmerName: ['', Validators.required],
      principalAmount: ['', [Validators.required, Validators.min(1000)]],
      interestRate: ['', [Validators.required, Validators.min(0.1), Validators.max(50)]],
      termMonths: ['', [Validators.required, Validators.min(1), Validators.max(60)]],
      purpose: ['', Validators.required],
      collateralType: [''],
      collateralValue: [''],
      loanType: ['regular', Validators.required],
      status: ['active', Validators.required],
      disbursementDate: [new Date().toISOString().split('T')[0]],
      dueDate: [''],
      notes: ['']
    });

    // Loan Application Form
    this.loanApplicationForm = this.fb.group({
      applicantName: ['', Validators.required],
      farmerId: ['', Validators.required],
      requestedAmount: ['', [Validators.required, Validators.min(1000)]],
      purpose: ['', Validators.required],
      repaymentPlan: ['monthly', Validators.required],
      termMonths: ['', [Validators.required, Validators.min(1), Validators.max(60)]],
      collateralType: [''],
      collateralValue: [''],
      incomeProof: [''],
      businessPlan: [''],
      status: ['pending', Validators.required],
      notes: ['']
    });

    // Payment Form
    this.paymentForm = this.fb.group({
      creditId: ['', Validators.required],
      farmerName: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      paymentDate: [new Date().toISOString().split('T')[0]],
      paymentMethod: ['cash', Validators.required],
      referenceNumber: [''],
      lateFee: [0],
      notes: ['']
    });

    // Bulk Payment Form
    this.bulkPaymentForm = this.fb.group({
      paymentDate: [new Date().toISOString().split('T')[0]],
      paymentMethod: ['cash', Validators.required],
      selectedCredits: [[]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.initializeWithEmptyData();
    this.loadData();
  }

  initializeWithEmptyData(): void {
    // Initialize with empty data for better UX
    this.credits = this.createEmptyCredits(5);
    this.filteredCredits = [...this.credits];
    this.totalItems = this.credits.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePagination();

    // Initialize loan applications
    this.loanApplications = this.createEmptyApplications(3);

    // Initialize stats
    this.stats = {
      totalIssued: 0,
      outstandingBalance: 0,
      repaymentRate: 0,
      defaultersCount: 0,
      pendingApplications: 0,
      approvedThisMonth: 0,
      overdueAmount: 0,
      avgInterestRate: 0
    };
  }

  createEmptyCredits(count: number): any[] {
    const emptyCredits = [];
    for (let i = 0; i < count; i++) {
      emptyCredits.push({
        id: `temp-${i}`,
        loanId: 'Loading...',
        farmerId: '...',
        farmerName: 'Loading...',
        principalAmount: 0,
        outstandingBalance: 0,
        interestRate: 0,
        termMonths: 0,
        disbursementDate: new Date(),
        dueDate: new Date(),
        status: 'active',
        loanType: 'regular',
        repaymentRate: 0,
        riskLevel: 'low'
      });
    }
    return emptyCredits;
  }

  createEmptyApplications(count: number): any[] {
    const emptyApps = [];
    for (let i = 0; i < count; i++) {
      emptyApps.push({
        id: `temp-app-${i}`,
        applicationNumber: 'Loading...',
        applicantName: 'Loading...',
        requestedAmount: 0,
        status: 'pending',
        submissionDate: new Date()
      });
    }
    return emptyApps;
  }

  loadData(): void {
    this.isLoading = true;
    
    // Load credits with filters
    this.creditService.getCredits(this.filters).subscribe({
      next: (credits) => {
        this.credits = credits;
        this.filteredCredits = [...credits];
        this.totalItems = credits.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error loading credits:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });

    // Load loan applications
    this.creditService.getLoanApplications().subscribe({
      next: (applications) => {
        this.loanApplications = applications;
      },
      error: (error) => {
        console.error('Error loading applications:', error);
      }
    });

    // Load stats
    this.creditService.getCreditStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });

    // Load recent payments
    this.creditService.getRecentPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
      }
    });

    // Load charts data
    this.loadChartData();
  }

  loadChartData(): void {
    this.creditService.getRepaymentChartData().subscribe({
      next: (data) => {
        this.repaymentChartData = data;
      }
    });

    this.creditService.getInterestChartData().subscribe({
      next: (data) => {
        this.interestChartData = data;
      }
    });
  }

  // Search and Filter Methods
  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  applyFilters(): void {
    const filters: CreditFilters = {};
    
    if (this.searchQuery) {
      filters.search = this.searchQuery;
    }
    
    if (this.statusFilter !== 'all') {
      filters.status = this.statusFilter;
    }
    
    if (this.typeFilter !== 'all') {
      filters.loanType = this.typeFilter;
    }
    
    if (this.riskFilter !== 'all') {
      filters.riskLevel = this.riskFilter;
    }
    
    this.filters = filters;
    this.loadData();
  }

  clearFilters(): void {
    this.statusFilter = 'all';
    this.typeFilter = 'all';
    this.riskFilter = 'all';
    this.filters = {};
    this.applyFilters();
  }

  // Modal Methods
  openCreditDetailsModal(credit: Credit): void {
    this.selectedCredit = credit;
    this.activeCreditTab = 'details';
    this.showCreditDetailsModal = true;
  }

  openLoanApplicationModal(): void {
    this.loanApplicationForm.reset({
      status: 'pending',
      repaymentPlan: 'monthly'
    });
    this.showLoanApplicationModal = true;
  }

  openPaymentModal(credit?: Credit): void {
    if (credit) {
      this.selectedCredit = credit;
      this.paymentForm.patchValue({
        creditId: credit.id,
        farmerName: credit.farmerName,
        amount: credit.outstandingBalance > 0 ? Math.min(credit.outstandingBalance, credit.monthlyPayment || 0) : 0
      });
    }
    this.showPaymentModal = true;
  }

  openReviewModal(application: LoanApplication): void {
    this.selectedApplication = application;
    this.showReviewModal = true;
  }

  openRepaymentScheduleModal(credit: Credit): void {
    this.selectedCredit = credit;
    this.showRepaymentScheduleModal = true;
  }

  openDeleteModal(credit: Credit): void {
    this.selectedCredit = credit;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showCreditDetailsModal = false;
    this.showLoanApplicationModal = false;
    this.showPaymentModal = false;
    this.showReviewModal = false;
    this.showDeleteModal = false;
    this.showFiltersModal = false;
    this.showRepaymentScheduleModal = false;
    this.showBulkPaymentModal = false;
    this.selectedCredit = null;
    this.selectedApplication = null;
    this.selectedPayment = null;
  }

  // Form Submission Methods
  submitLoanApplication(): void {
    if (this.loanApplicationForm.invalid) return;

    this.isLoading = true;
    const applicationData = this.loanApplicationForm.value;
    
    this.creditService.createLoanApplication(applicationData).subscribe({
      next: (application) => {
        this.loanApplications.unshift(application);
        this.loanApplicationForm.reset();
        this.showLoanApplicationModal = false;
        this.loadData(); // Reload stats
      },
      error: (error) => {
        console.error('Error submitting application:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  processPayment(): void {
    if (this.paymentForm.invalid) return;

    this.isProcessingPayment = true;
    const paymentData = this.paymentForm.value;
    
    this.creditService.processPayment(paymentData).subscribe({
      next: (payment) => {
        this.payments.unshift(payment);
        this.paymentForm.reset();
        this.showPaymentModal = false;
        this.loadData(); // Reload data to update balances
      },
      error: (error) => {
        console.error('Error processing payment:', error);
      },
      complete: () => {
        this.isProcessingPayment = false;
      }
    });
  }

  processBulkPayment(): void {
    if (this.bulkPaymentForm.invalid) return;

    this.isProcessingBulk = true;
    const bulkData = this.bulkPaymentForm.value;
    
    this.creditService.processBulkPayments(bulkData).subscribe({
      next: (result) => {
        alert(`Bulk payment processed successfully: ${result.success} payments, ${result.failed} failed`);
        this.showBulkPaymentModal = false;
        this.loadData();
      },
      error: (error) => {
        console.error('Error processing bulk payments:', error);
      },
      complete: () => {
        this.isProcessingBulk = false;
      }
    });
  }

  approveApplication(): void {
    if (!this.selectedApplication) return;

    this.isLoading = true;
    this.creditService.approveLoanApplication(this.selectedApplication.id).subscribe({
      next: (credit) => {
        // Move application to credits
        this.credits.unshift(credit);
        
        // Remove from applications
        this.loanApplications = this.loanApplications.filter(
          app => app.id !== this.selectedApplication!.id
        );
        
        this.showReviewModal = false;
        this.loadData();
      },
      error: (error) => {
        console.error('Error approving application:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  rejectApplication(): void {
    if (!this.selectedApplication) return;

    this.isLoading = true;
    this.creditService.rejectLoanApplication(this.selectedApplication.id).subscribe({
      next: () => {
        // Update application status
        const index = this.loanApplications.findIndex(
          app => app.id === this.selectedApplication!.id
        );
        if (index !== -1) {
          this.loanApplications[index].status = 'rejected';
        }
        
        this.showReviewModal = false;
        this.loadData();
      },
      error: (error) => {
        console.error('Error rejecting application:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteCredit(): void {
    if (!this.selectedCredit) return;

    this.isLoading = true;
    this.creditService.deleteCredit(this.selectedCredit.id).subscribe({
      next: () => {
        this.credits = this.credits.filter(c => c.id !== this.selectedCredit!.id);
        this.filteredCredits = [...this.credits];
        this.showDeleteModal = false;
        this.loadData();
      },
      error: (error) => {
        console.error('Error deleting credit:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Helper Methods
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredCredits = this.credits.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return Math.min(end, this.totalItems);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Add these properties to your component class (after other properties)
selectedLoans: Set<string> = new Set();

// Add these methods to your component class (add them anywhere in the class, but I suggest adding them after the existing methods)

// Calculate LTV ratio
calculateLTV(credit: Credit): number {
  if (!credit.collateralValue || credit.collateralValue === 0) return 0;
  return Math.round((credit.principalAmount / credit.collateralValue) * 100);
}

// Get defaulters
getDefaulters(): any[] {
  return this.credits
    .filter(credit => credit.status === 'overdue' || credit.status === 'defaulted')
    .map(credit => ({
      name: credit.farmerName,
      amount: credit.outstandingBalance,
      days: this.calculateDaysOverdue(credit.dueDate)
    }))
    .slice(0, 5); // Return top 5 defaulters
}

// Calculate days overdue
calculateDaysOverdue(dueDate: Date | string): number {
  if (!dueDate) return 0;
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = now.getTime() - due.getTime();
  return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
}

// Loan selection methods for bulk payments
toggleLoanSelection(event: Event, loanId: string): void {
  const isChecked = (event.target as HTMLInputElement).checked;
  
  if (isChecked) {
    this.selectedLoans.add(loanId);
  } else {
    this.selectedLoans.delete(loanId);
  }
  
  // Update form value
  this.bulkPaymentForm.patchValue({
    selectedCredits: Array.from(this.selectedLoans)
  });
}

// Add these methods to handle different object types

viewApplicationDetails(application: LoanApplication): void {
  // If application is approved, find the corresponding credit
  if (application.status === 'approved') {
    const credit = this.credits.find(c => 
      c.farmerId === application.farmerId && 
      c.farmerName === application.applicantName
    );
    
    if (credit) {
      this.openCreditDetailsModal(credit);
    } else {
      alert('No loan found for this application yet.');
    }
  } else {
    // For pending applications, just show the review modal
    this.openReviewModal(application);
  }
}

viewPaymentDetails(payment: Payment): void {
  // Find the credit associated with this payment
  const credit = this.credits.find(c => 
    c.id === payment.creditId || c.loanId === payment.loanId
  );
  
  if (credit) {
    this.openCreditDetailsModal(credit);
  } else {
    // Show payment details in a simple modal
    alert(`Payment Details:
      Amount: ${this.formatCurrency(payment.amount)}
      Date: ${this.formatDate(payment.paymentDate)}
      Method: ${payment.paymentMethod}
      Reference: ${payment.referenceNumber || 'N/A'}`);
  }
}

// Also, update the getPaymentHistory method to handle the selectedCredit properly
getPaymentHistory(credit: Credit): any[] {
  if (!credit) return [];
  
  // Get payments for this specific credit
  return this.payments
    .filter(payment => payment.creditId === credit.id || payment.loanId === credit.loanId)
    .map(payment => ({
      date: this.formatDate(payment.paymentDate),
      amount: payment.amount,
      method: payment.paymentMethod,
      status: payment.status,
      reference: payment.referenceNumber
    }));
}

isLoanSelected(loanId: string): boolean {
  return this.selectedLoans.has(loanId);
}

getSelectedLoansCount(): number {
  return this.selectedLoans.size;
}

getSelectedTotal(): number {
  return Array.from(this.selectedLoans).reduce((total, loanId) => {
    const credit = this.credits.find(c => c.id === loanId);
    return total + (credit?.outstandingBalance || 0);
  }, 0);
}

// Generate schedule PDF (mock implementation)
generateSchedulePDF(): void {
  this.isLoading = true;
  
  // Create PDF content (mock)
  const pdfContent = `
    Repayment Schedule - ${this.selectedCredit?.loanId}
    =============================================
    
    Loan Details:
    - Farmer: ${this.selectedCredit?.farmerName}
    - Principal: ${this.formatCurrency(this.selectedCredit?.principalAmount || 0)}
    - Interest Rate: ${this.selectedCredit?.interestRate}%
    - Term: ${this.selectedCredit?.termMonths} months
    
    Repayment Schedule:
    ${this.getRepaymentSchedule(this.selectedCredit!).map(installment => 
      `Month ${installment.installment}: ${this.formatDate(installment.dueDate)} - ${this.formatCurrency(installment.amount)}`
    ).join('\n    ')}
  `;
  
  // Create blob and download
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `repayment-schedule-${this.selectedCredit?.loanId}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  this.isLoading = false;
}

// Initialize loan selection when bulk modal opens
openBulkPaymentModal(): void {
  // Clear previous selections
  this.selectedLoans.clear();
  
  // Auto-select loans with outstanding balance
  this.credits.forEach(credit => {
    if (credit.outstandingBalance > 0) {
      this.selectedLoans.add(credit.id);
    }
  });
  
  // Update form
  this.bulkPaymentForm.patchValue({
    selectedCredits: Array.from(this.selectedLoans),
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash'
  });
  
  this.showBulkPaymentModal = true;
}

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'paid': return 'status-paid';
      case 'overdue': return 'status-overdue';
      case 'defaulted': return 'status-defaulted';
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-unknown';
    }
  }

  getRiskClass(riskLevel: string): string {
    switch (riskLevel) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      default: return 'risk-unknown';
    }
  }

  calculateRemainingMonths(dueDate: Date | string): number {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.ceil(diffDays / 30));
  }
 

  getRepaymentSchedule(credit: Credit): any[] {
    const schedule = [];
    const monthlyPayment = credit.monthlyPayment || credit.principalAmount / credit.termMonths;
    let balance = credit.principalAmount;
    const startDate = new Date(credit.disbursementDate);
    
    for (let i = 0; i < credit.termMonths; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i + 1);
      
      schedule.push({
        installment: i + 1,
        dueDate: dueDate,
        amount: monthlyPayment,
        principal: monthlyPayment * 0.8, // Simplified
        interest: monthlyPayment * 0.2,  // Simplified
        status: i < 3 ? 'paid' : 'pending' // Mock data
      });
    }
    
    return schedule;
  }

  sendPaymentReminder(credit: Credit): void {
    this.isLoading = true;
    this.creditService.sendPaymentReminder(credit.id).subscribe({
      next: () => {
        alert('Payment reminder sent successfully!');
      },
      error: (error) => {
        console.error('Error sending reminder:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  generateCreditReport(): void {
    this.isLoading = true;
    this.creditService.generateCreditReport().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `credit-report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error generating report:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Search farmer for loan application
  searchFarmer(): void {
    const farmerId = this.loanApplicationForm.get('farmerId')?.value;
    if (farmerId) {
      // In real app, fetch farmer details
      this.loanApplicationForm.patchValue({
        applicantName: 'John Doe' // Mock data
      });
    }
  }

  // Calculate loan details
  calculateLoanDetails(): void {
    const principal = this.loanApplicationForm.get('requestedAmount')?.value;
    const term = this.loanApplicationForm.get('termMonths')?.value;
    const interestRate = 12; // Default interest rate
    
    if (principal && term) {
      const monthlyInterest = interestRate / 12 / 100;
      const monthlyPayment = principal * monthlyInterest * Math.pow(1 + monthlyInterest, term) / 
                            (Math.pow(1 + monthlyInterest, term) - 1);
      
      // Update form with calculated values
      this.loanApplicationForm.patchValue({
        monthlyPayment: Math.round(monthlyPayment),
        totalRepayment: Math.round(monthlyPayment * term)
      });
    }
  }
}