import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Credit, CreditFilters, LoanApplication, Payment, CreditStats, BulkPaymentResult } from '../models/credit-management';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private mockCredits: Credit[] = [
    {
      id: '1',
      loanId: 'LOAN-2024-001',
      farmerId: 'FARM-2024-001',
      farmerName: 'Chinedu Okoro',
      principalAmount: 500000,
      outstandingBalance: 250000,
      interestRate: 12,
      termMonths: 12,
      monthlyPayment: 45000,
      disbursementDate: '2024-01-15',
      dueDate: '2024-12-15',
      status: 'active',
      loanType: 'regular',
      purpose: 'Seeds and Fertilizer Purchase',
      collateralType: 'Land Title',
      collateralValue: 800000,
      repaymentRate: 85,
      riskLevel: 'low',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      loanId: 'LOAN-2024-002',
      farmerId: 'FARM-2024-002',
      farmerName: 'Amina Bello',
      principalAmount: 300000,
      outstandingBalance: 300000,
      interestRate: 15,
      termMonths: 6,
      monthlyPayment: 55000,
      disbursementDate: '2024-02-01',
      dueDate: '2024-08-01',
      status: 'active',
      loanType: 'emergency',
      purpose: 'Equipment Repair',
      collateralType: 'Farm Equipment',
      collateralValue: 500000,
      repaymentRate: 100,
      riskLevel: 'medium',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01'
    },
    {
      id: '3',
      loanId: 'LOAN-2024-003',
      farmerId: 'FARM-2024-003',
      farmerName: 'Emeka Nwankwo',
      principalAmount: 750000,
      outstandingBalance: 150000,
      interestRate: 10,
      termMonths: 18,
      monthlyPayment: 45000,
      disbursementDate: '2023-11-10',
      dueDate: '2025-05-10',
      status: 'active',
      loanType: 'equipment',
      purpose: 'Irrigation System',
      collateralType: 'Land Title',
      collateralValue: 1200000,
      repaymentRate: 92,
      riskLevel: 'low',
      createdAt: '2023-11-10',
      updatedAt: '2024-01-20'
    },
    {
      id: '4',
      loanId: 'LOAN-2023-015',
      farmerId: 'FARM-2023-045',
      farmerName: 'Sunday Okafor',
      principalAmount: 400000,
      outstandingBalance: 0,
      interestRate: 12,
      termMonths: 12,
      monthlyPayment: 37000,
      disbursementDate: '2023-06-15',
      dueDate: '2024-06-15',
      status: 'paid',
      loanType: 'regular',
      purpose: 'Seasonal Inputs',
      collateralType: 'None',
      collateralValue: 0,
      repaymentRate: 100,
      riskLevel: 'low',
      createdAt: '2023-06-15',
      updatedAt: '2024-06-15'
    },
    {
      id: '5',
      loanId: 'LOAN-2023-028',
      farmerId: 'FARM-2023-012',
      farmerName: 'Fatima Ibrahim',
      principalAmount: 600000,
      outstandingBalance: 200000,
      interestRate: 18,
      termMonths: 12,
      monthlyPayment: 60000,
      disbursementDate: '2023-12-01',
      dueDate: '2024-12-01',
      status: 'overdue',
      loanType: 'emergency',
      purpose: 'Crop Protection',
      collateralType: 'Vehicle',
      collateralValue: 800000,
      repaymentRate: 65,
      riskLevel: 'high',
      createdAt: '2023-12-01',
      updatedAt: '2024-01-25'
    }
  ];

  private mockApplications: LoanApplication[] = [
    {
      id: 'app-1',
      applicationNumber: 'APP-2024-001',
      farmerId: 'FARM-2024-025',
      applicantName: 'John Adebayo',
      requestedAmount: 250000,
      purpose: 'Seed Purchase',
      termMonths: 6,
      repaymentPlan: 'monthly',
      collateralType: 'Land Title',
      collateralValue: 500000,
      status: 'pending',
      submissionDate: '2024-01-20',
      documents: ['id_card.pdf', 'land_title.pdf']
    },
    {
      id: 'app-2',
      applicationNumber: 'APP-2024-002',
      farmerId: 'FARM-2024-018',
      applicantName: 'Mary Johnson',
      requestedAmount: 450000,
      purpose: 'Greenhouse Construction',
      termMonths: 12,
      repaymentPlan: 'quarterly',
      collateralType: 'Building',
      collateralValue: 900000,
      status: 'under_review',
      submissionDate: '2024-01-18',
      documents: ['business_plan.pdf', 'property_deed.pdf']
    },
    {
      id: 'app-3',
      applicationNumber: 'APP-2024-003',
      farmerId: 'FARM-2024-032',
      applicantName: 'Peter Chukwu',
      requestedAmount: 150000,
      purpose: 'Fertilizer',
      termMonths: 3,
      repaymentPlan: 'bulk',
      collateralType: 'None',
      collateralValue: 0,
      status: 'pending',
      submissionDate: '2024-01-22',
      documents: ['id_card.pdf']
    }
  ];

  private mockPayments: Payment[] = [
    {
      id: 'pay-1',
      creditId: '1',
      loanId: 'LOAN-2024-001',
      farmerId: 'FARM-2024-001',
      farmerName: 'Chinedu Okoro',
      amount: 45000,
      paymentDate: '2024-01-30',
      paymentMethod: 'bank',
      paymentType: 'regular',
      referenceNumber: 'BNK-2024-001',
      status: 'completed'
    },
    {
      id: 'pay-2',
      creditId: '2',
      loanId: 'LOAN-2024-002',
      farmerId: 'FARM-2024-002',
      farmerName: 'Amina Bello',
      amount: 55000,
      paymentDate: '2024-02-05',
      paymentMethod: 'mobile',
      paymentType: 'regular',
      referenceNumber: 'MM-2024-001',
      status: 'completed'
    },
    {
      id: 'pay-3',
      creditId: '3',
      loanId: 'LOAN-2024-003',
      farmerId: 'FARM-2024-003',
      farmerName: 'Emeka Nwankwo',
      amount: 45000,
      paymentDate: '2024-01-25',
      paymentMethod: 'cash',
      paymentType: 'regular',
      status: 'completed'
    }
  ];

  constructor() {}

  // Get credits with optional filters
  getCredits(filters?: CreditFilters): Observable<Credit[]> {
    let filteredCredits = [...this.mockCredits];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCredits = filteredCredits.filter(credit =>
          credit.loanId.toLowerCase().includes(searchLower) ||
          credit.farmerName.toLowerCase().includes(searchLower) ||
          credit.farmerId.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status) {
        filteredCredits = filteredCredits.filter(
          credit => credit.status === filters.status
        );
      }

      if (filters.loanType) {
        filteredCredits = filteredCredits.filter(
          credit => credit.loanType === filters.loanType
        );
      }

      if (filters.riskLevel) {
        filteredCredits = filteredCredits.filter(
          credit => credit.riskLevel === filters.riskLevel
        );
      }

      if (filters.farmerId) {
        filteredCredits = filteredCredits.filter(
          credit => credit.farmerId === filters.farmerId
        );
      }

      if (filters.minAmount) {
        filteredCredits = filteredCredits.filter(
          credit => credit.principalAmount >= filters.minAmount!
        );
      }

      if (filters.maxAmount) {
        filteredCredits = filteredCredits.filter(
          credit => credit.principalAmount <= filters.maxAmount!
        );
      }
    }

    return of(filteredCredits).pipe(delay(500));
  }

  // Get credit by ID
  getCreditById(id: string): Observable<Credit> {
    const credit = this.mockCredits.find(c => c.id === id);
    if (credit) {
      return of(credit).pipe(delay(300));
    }
    return throwError(() => new Error('Credit not found'));
  }

  // Get loan applications
  getLoanApplications(): Observable<LoanApplication[]> {
    return of(this.mockApplications).pipe(delay(400));
  }

  // Get recent payments
  getRecentPayments(): Observable<Payment[]> {
    return of(this.mockPayments).pipe(delay(300));
  }

  // Create loan application
  createLoanApplication(application: Omit<LoanApplication, 'id' | 'applicationNumber' | 'submissionDate'>): Observable<LoanApplication> {
    const newApplication: LoanApplication = {
      ...application,
      id: `app-${Date.now()}`,
      applicationNumber: `APP-${new Date().getFullYear()}-${String(this.mockApplications.length + 1).padStart(3, '0')}`,
      submissionDate: new Date().toISOString()
    };

    this.mockApplications.push(newApplication);
    return of(newApplication).pipe(delay(800));
  }

  // Approve loan application
  approveLoanApplication(applicationId: string): Observable<Credit> {
    const application = this.mockApplications.find(app => app.id === applicationId);
    if (!application) {
      return throwError(() => new Error('Application not found'));
    }

    // Create new credit from application
    const newCredit: Credit = {
      id: `credit-${Date.now()}`,
      loanId: `LOAN-${new Date().getFullYear()}-${String(this.mockCredits.length + 1).padStart(3, '0')}`,
      farmerId: application.farmerId,
      farmerName: application.applicantName,
      principalAmount: application.requestedAmount,
      outstandingBalance: application.requestedAmount,
      interestRate: 12, // Default interest rate
      termMonths: application.termMonths,
      monthlyPayment: this.calculateMonthlyPayment(application.requestedAmount, 12, application.termMonths),
      disbursementDate: new Date().toISOString(),
      dueDate: this.calculateDueDate(new Date(), application.termMonths),
      status: 'active',
      loanType: 'regular',
      purpose: application.purpose,
      collateralType: application.collateralType,
      collateralValue: application.collateralValue,
      repaymentRate: 0,
      riskLevel: this.assessRisk(application),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.mockCredits.push(newCredit);
    
    // Update application status
    application.status = 'approved';
    application.reviewDate = new Date().toISOString();
    application.approvedAmount = application.requestedAmount;
    application.interestRate = 12;

    return of(newCredit).pipe(delay(600));
  }

  // Reject loan application
  rejectLoanApplication(applicationId: string): Observable<void> {
    const application = this.mockApplications.find(app => app.id === applicationId);
    if (!application) {
      return throwError(() => new Error('Application not found'));
    }

    application.status = 'rejected';
    application.reviewDate = new Date().toISOString();
    
    return of(void 0).pipe(delay(400));
  }

  // Process payment
  processPayment(paymentData: Omit<Payment, 'id'>): Observable<Payment> {
    const credit = this.mockCredits.find(c => c.id === paymentData.creditId);
    if (!credit) {
      return throwError(() => new Error('Credit not found'));
    }

    // Update credit balance
    credit.outstandingBalance = Math.max(0, credit.outstandingBalance - paymentData.amount);
    
    if (credit.outstandingBalance === 0) {
      credit.status = 'paid';
    }

    credit.updatedAt = new Date().toISOString();

    // Create payment record
    const newPayment: Payment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      status: 'completed'
    };

    this.mockPayments.unshift(newPayment);
    return of(newPayment).pipe(delay(500));
  }

  // Process bulk payments
  processBulkPayments(bulkData: any): Observable<BulkPaymentResult> {
    const result: BulkPaymentResult = {
      success: 0,
      failed: 0,
      errors: []
    };

    // Mock implementation
    const selectedCredits = bulkData.selectedCredits || [];
    
    selectedCredits.forEach((creditId: string) => {
      const credit = this.mockCredits.find(c => c.id === creditId);
      if (credit) {
        // Process payment
        const paymentAmount = credit.monthlyPayment || 10000;
        credit.outstandingBalance = Math.max(0, credit.outstandingBalance - paymentAmount);
        
        if (credit.outstandingBalance === 0) {
          credit.status = 'paid';
        }

        credit.updatedAt = new Date().toISOString();
        result.success++;
      } else {
        result.failed++;
        result.errors.push({
          creditId,
          error: 'Credit not found'
        });
      }
    });

    return of(result).pipe(delay(1500));
  }

  // Get credit statistics
  getCreditStats(): Observable<CreditStats> {
    const totalIssued = this.mockCredits.reduce((sum, credit) => sum + credit.principalAmount, 0);
    const outstandingBalance = this.mockCredits
      .filter(c => c.status === 'active' || c.status === 'overdue')
      .reduce((sum, credit) => sum + credit.outstandingBalance, 0);
    
    const activeCredits = this.mockCredits.filter(c => c.status === 'active');
    const repaymentRate = activeCredits.length > 0 
      ? activeCredits.reduce((sum, credit) => sum + credit.repaymentRate, 0) / activeCredits.length
      : 0;
    
    const defaultersCount = this.mockCredits.filter(c => c.status === 'overdue' || c.status === 'defaulted').length;
    const pendingApplications = this.mockApplications.filter(app => app.status === 'pending').length;
    
    const approvedThisMonth = this.mockCredits.filter(c => {
      const disbursementDate = new Date(c.disbursementDate);
      const now = new Date();
      return disbursementDate.getMonth() === now.getMonth() && 
             disbursementDate.getFullYear() === now.getFullYear();
    }).length;
    
    const overdueAmount = this.mockCredits
      .filter(c => c.status === 'overdue')
      .reduce((sum, credit) => sum + credit.outstandingBalance, 0);
    
    const avgInterestRate = this.mockCredits.length > 0
      ? this.mockCredits.reduce((sum, credit) => sum + credit.interestRate, 0) / this.mockCredits.length
      : 0;

    const stats: CreditStats = {
      totalIssued,
      outstandingBalance,
      repaymentRate,
      defaultersCount,
      pendingApplications,
      approvedThisMonth,
      overdueAmount,
      avgInterestRate
    };

    return of(stats).pipe(delay(300));
  }

  // Send payment reminder
  sendPaymentReminder(creditId: string): Observable<void> {
    const credit = this.mockCredits.find(c => c.id === creditId);
    if (!credit) {
      return throwError(() => new Error('Credit not found'));
    }

    // In real app, this would send an actual reminder (email, SMS, etc.)
    console.log(`Payment reminder sent for ${credit.loanId}`);
    
    return of(void 0).pipe(delay(400));
  }

  // Generate credit report
  generateCreditReport(): Observable<Blob> {
    const reportData = `
      Credit Report - ${new Date().toLocaleDateString()}
      =============================================
      
      Total Credits Issued: ${this.formatCurrency(this.mockCredits.reduce((sum, c) => sum + c.principalAmount, 0))}
      Outstanding Balance: ${this.formatCurrency(this.mockCredits.reduce((sum, c) => sum + c.outstandingBalance, 0))}
      Active Loans: ${this.mockCredits.filter(c => c.status === 'active').length}
      Overdue Loans: ${this.mockCredits.filter(c => c.status === 'overdue').length}
      
      Loan Portfolio by Type:
      ${this.getLoanTypeDistribution()}
      
      Top 5 Outstanding Loans:
      ${this.getTopOutstandingLoans()}
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    return of(blob).pipe(delay(1000));
  }

  // Get repayment chart data
  getRepaymentChartData(): Observable<any> {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Repayment Rate',
        data: [85, 88, 90, 87, 92, 94],
        borderColor: '#2d5016',
        backgroundColor: 'rgba(45, 80, 22, 0.1)'
      }]
    };

    return of(data).pipe(delay(300));
  }

  // Get interest chart data
  getInterestChartData(): Observable<any> {
    const data = {
      labels: ['Low Risk', 'Medium Risk', 'High Risk'],
      datasets: [{
        label: 'Average Interest Rate',
        data: [10, 14, 18],
        backgroundColor: ['#3a7d34', '#e6a700', '#c44536']
      }]
    };

    return of(data).pipe(delay(300));
  }

  // Delete credit
  deleteCredit(creditId: string): Observable<void> {
    const index = this.mockCredits.findIndex(c => c.id === creditId);
    if (index === -1) {
      return throwError(() => new Error('Credit not found'));
    }

    this.mockCredits.splice(index, 1);
    return of(void 0).pipe(delay(400));
  }

  // Helper methods
  private calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
    const monthlyRate = annualRate / 12 / 100;
    return principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  }

  private calculateDueDate(startDate: Date, months: number): string {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + months);
    return dueDate.toISOString();
  }

  private assessRisk(application: LoanApplication): 'low' | 'medium' | 'high' {
    if (application.collateralValue && application.collateralValue >= application.requestedAmount * 2) {
      return 'low';
    } else if (application.collateralValue && application.collateralValue >= application.requestedAmount) {
      return 'medium';
    } else {
      return 'high';
    }
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  private getLoanTypeDistribution(): string {
    const types = this.mockCredits.reduce((acc, credit) => {
      acc[credit.loanType] = (acc[credit.loanType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(types)
      .map(([type, count]) => `  ${type}: ${count} loans`)
      .join('\n');
  }

  private getTopOutstandingLoans(): string {
    const topLoans = [...this.mockCredits]
      .filter(c => c.outstandingBalance > 0)
      .sort((a, b) => b.outstandingBalance - a.outstandingBalance)
      .slice(0, 5);

    return topLoans
      .map((credit, index) => 
        `  ${index + 1}. ${credit.loanId} - ${credit.farmerName}: ${this.formatCurrency(credit.outstandingBalance)}`
      )
      .join('\n');
  }
}