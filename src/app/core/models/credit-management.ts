export interface Credit {
  id: string;
  loanId: string;
  farmerId: string;
  farmerName: string;
  principalAmount: number;
  outstandingBalance: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment?: number;
  disbursementDate: Date | string;
  dueDate: Date | string;
  status: 'active' | 'paid' | 'overdue' | 'defaulted' | 'cancelled';
  loanType: 'regular' | 'emergency' | 'equipment' | 'seasonal';
  purpose?: string;
  collateralType?: string;
  collateralValue?: number;
  repaymentRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface LoanApplication {
  id: string;
  applicationNumber: string;
  farmerId: string;
  applicantName: string;
  requestedAmount: number;
  approvedAmount?: number;
  purpose: string;
  termMonths: number;
  repaymentPlan: string;
  collateralType?: string;
  collateralValue?: number;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submissionDate: Date | string;
  reviewDate?: Date | string;
  reviewerId?: string;
  reviewerNotes?: string;
  monthlyPayment?: number;
  interestRate?: number;
  documents?: string[];
}

export interface Payment {
  id: string;
  creditId: string;
  loanId: string;
  farmerId: string;
  farmerName: string;
  amount: number;
  paymentDate: Date | string;
  paymentMethod: 'cash' | 'bank' | 'mobile' | 'cheque';
  paymentType: 'regular' | 'partial' | 'full' | 'late';
  referenceNumber?: string;
  lateFee?: number;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  notes?: string;
  processedBy?: string;
}

export interface CreditFilters {
  search?: string;
  status?: string;
  loanType?: string;
  riskLevel?: string;
  farmerId?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date | string;
  endDate?: Date | string;
}

export interface CreditStats {
  totalIssued: number;
  outstandingBalance: number;
  repaymentRate: number;
  defaultersCount: number;
  pendingApplications: number;
  approvedThisMonth: number;
  overdueAmount: number;
  avgInterestRate: number;
}

export interface BulkPaymentResult {
  success: number;
  failed: number;
  errors: Array<{
    creditId: string;
    error: string;
  }>;
}