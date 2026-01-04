export interface Sale {
  id: string;
  transactionId: string;
  saleDate: Date;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  customerType: 'farmer' | 'wholesaler' | 'retailer' | 'other';
  customerId?: string; // If linked to a farmer
  items: SaleItem[];
  paymentMethod: 'cash' | 'mobile_money' | 'bank_transfer' | 'credit' | 'split';
  mobileMoneyDetails?: {
    provider: 'mtn' | 'airtel' | 'glo' | '9mobile' | 'vodafone' | 'other';
    reference: string;
    phoneNumber: string;
  };
  bankTransferDetails?: {
    bankName: string;
    accountNumber: string;
    reference: string;
  };
  splitPayment?: {
    cashAmount: number;
    mobileAmount: number;
    bankAmount: number;
  };
  totalAmount: number;
  amountPaid: number;
  outstandingBalance: number;
  status: 'pending' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'cancelled';
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  productType: 'fresh_produce' | 'processed' | 'seedlings' | 'other';
  unit: 'kg' | 'g' | 'tonnes' | 'bags' | 'crates' | 'pieces';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
  tax?: number;
  stockDeducted: boolean;
  warehouseLocation?: string;
  batchNumber?: string;
  qualityGrade?: 'A' | 'B' | 'C' | 'D';
}

export interface Payment {
  id: string;
  paymentId: string;
  saleId: string;
  farmerId?: string;
  paymentType: 'sale_payment' | 'farmer_payment' | 'credit_repayment' | 'other';
  amount: number;
  paymentMethod: 'cash' | 'mobile_money' | 'bank_transfer';
  mobileMoneyDetails?: {
    provider: string;
    reference: string;
    phoneNumber: string;
  };
  bankTransferDetails?: {
    bankName: string;
    accountNumber: string;
    reference: string;
  };
  paymentDate: Date;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  referenceNumber: string;
  notes?: string;
  processedBy: string;
  validated: boolean;
  validationDate?: Date;
  validatedBy?: string;
  receiptGenerated: boolean;
  receiptNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FarmerPayment {
  id: string;
  paymentId: string;
  farmerId: string;
  farmerName: string;
  periodStart: Date;
  periodEnd: Date;
  totalDeliveries: number;
  totalWeight: number;
  basePrice: number;
  qualityBonus: number;
  deductions: {
    microcreditRepayment: number;
    cooperativeDues: number;
    otherCharges: number;
  };
  totalAmount: number;
  paymentStatus: 'pending' | 'processing' | 'paid' | 'failed';
  paymentMethod?: 'cash' | 'mobile_money' | 'bank_transfer';
  paymentDate?: Date;
  receiptNumber?: string;
  validated?: boolean;  // Make this optional
  validatedBy?: string;
  validationDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SalesFilters {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  paymentMethod?: string;
  customerType?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface PaymentFilters {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  paymentType?: string;
  paymentMethod?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface SalesSummary {
  totalSales: number;
  totalRevenue: number;
  totalTransactions: number;
  pendingPayments: number;
  averageSaleValue: number;
  todaySales: number;
  thisWeekSales: number;
  thisMonthSales: number;
  paymentMethodBreakdown: {
    cash: number;
    mobile_money: number;
    bank_transfer: number;
    credit: number;
  };
  statusBreakdown: {
    pending: number;
    confirmed: number;
    partially_paid: number;
    fully_paid: number;
    cancelled: number;
  };
}

export interface StockItem {
  id: string;
  productId: string;
  productName: string;
  productType: string;
  category: 'fresh_produce' | 'processed' | 'seedlings' | 'fertilizer' | 'tools' | 'other';
  unit: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  unitPrice: number;
  lastUpdated: Date;
  location: string;
  batchNumber?: string;
  expiryDate?: Date;
  qualityGrade?: string;
  farmerId?: string;
  purchaseDate?: Date;
  status: 'available' | 'reserved' | 'sold' | 'expired' | 'damaged';
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  movementType: 'in' | 'out' | 'adjustment' | 'transfer' | 'wastage';
  quantity: number;
  previousStock: number;
  newStock: number;
  referenceId?: string; // saleId, purchaseId, etc.
  referenceType?: string;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}