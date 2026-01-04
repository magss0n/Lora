import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  Sale, 
  SaleItem, 
  Payment, 
  FarmerPayment, 
  SalesFilters, 
  PaymentFilters,
  SalesSummary,
  StockItem
} from '../models/sales-payment'; 

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private mockSales: Sale[] = [
    {
      id: '1',
      transactionId: 'SALE-2024-001',
      saleDate: new Date('2024-01-20'),
      customerName: 'Chinedu Okoro',
      customerPhone: '+2348012345678',
      customerType: 'farmer',
      customerId: '1',
      items: [
        {
          id: 'item-1',
          productId: 'PROD-001',
          productName: 'Maize (Grade A)',
          productType: 'fresh_produce',
          unit: 'kg',
          quantity: 500,
          unitPrice: 150,
          totalPrice: 75000,
          stockDeducted: true,
          warehouseLocation: 'WH-01',
          batchNumber: 'BATCH-2024-001',
          qualityGrade: 'A'
        }
      ],
      paymentMethod: 'cash',
      totalAmount: 75000,
      amountPaid: 75000,
      outstandingBalance: 0,
      status: 'fully_paid',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      transactionId: 'SALE-2024-002',
      saleDate: new Date('2024-01-21'),
      customerName: 'Fresh Market Ltd',
      customerPhone: '+2348023456789',
      customerEmail: 'orders@freshmarket.com',
      customerType: 'wholesaler',
      items: [
        {
          id: 'item-2',
          productId: 'PROD-002',
          productName: 'Rice (Processed)',
          productType: 'processed',
          unit: 'bags',
          quantity: 100,
          unitPrice: 25000,
          totalPrice: 2500000,
          stockDeducted: true,
          warehouseLocation: 'WH-02'
        },
        {
          id: 'item-3',
          productId: 'PROD-003',
          productName: 'Cassava Flour',
          productType: 'processed',
          unit: 'kg',
          quantity: 200,
          unitPrice: 300,
          totalPrice: 60000,
          stockDeducted: true,
          warehouseLocation: 'WH-02'
        }
      ],
      paymentMethod: 'bank_transfer',
      bankTransferDetails: {
        bankName: 'First Bank',
        accountNumber: '1234567890',
        reference: 'BANK-REF-001'
      },
      totalAmount: 2560000,
      amountPaid: 1500000,
      outstandingBalance: 1060000,
      status: 'partially_paid',
      notes: 'Balance to be paid in 30 days',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-21'),
      updatedAt: new Date('2024-01-21')
    },
    {
      id: '3',
      transactionId: 'SALE-2024-003',
      saleDate: new Date('2024-01-22'),
      customerName: 'Amina Bello',
      customerPhone: '+2348034567890',
      customerType: 'farmer',
      customerId: '2',
      items: [
        {
          id: 'item-4',
          productId: 'PROD-004',
          productName: 'Yam Tubers',
          productType: 'fresh_produce',
          unit: 'kg',
          quantity: 300,
          unitPrice: 200,
          totalPrice: 60000,
          stockDeducted: true,
          warehouseLocation: 'WH-03',
          qualityGrade: 'B'
        }
      ],
      paymentMethod: 'mobile_money',
      mobileMoneyDetails: {
        provider: 'mtn',
        reference: 'MM-REF-001',
        phoneNumber: '+2348034567890'
      },
      totalAmount: 60000,
      amountPaid: 60000,
      outstandingBalance: 0,
      status: 'fully_paid',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    },
    {
      id: '4',
      transactionId: 'SALE-2024-004',
      saleDate: new Date('2024-01-23'),
      customerName: 'Green Grocers Ltd',
      customerPhone: '+2348045678901',
      customerEmail: 'info@greengrocers.com',
      customerType: 'retailer',
      items: [
        {
          id: 'item-5',
          productId: 'PROD-005',
          productName: 'Vegetables (Mixed)',
          productType: 'fresh_produce',
          unit: 'crates',
          quantity: 50,
          unitPrice: 5000,
          totalPrice: 250000,
          stockDeducted: false,
          warehouseLocation: 'WH-04'
        }
      ],
      paymentMethod: 'credit',
      totalAmount: 250000,
      amountPaid: 0,
      outstandingBalance: 250000,
      status: 'pending',
      notes: 'Credit arrangement - 60 days',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-23'),
      updatedAt: new Date('2024-01-23')
    },
    {
      id: '5',
      transactionId: 'SALE-2024-005',
      saleDate: new Date('2024-01-24'),
      customerName: 'Local Restaurant',
      customerPhone: '+2348056789012',
      customerType: 'other',
      items: [
        {
          id: 'item-6',
          productId: 'PROD-001',
          productName: 'Maize (Grade A)',
          productType: 'fresh_produce',
          unit: 'kg',
          quantity: 100,
          unitPrice: 150,
          totalPrice: 15000,
          stockDeducted: true,
          warehouseLocation: 'WH-01'
        },
        {
          id: 'item-7',
          productId: 'PROD-006',
          productName: 'Beans',
          productType: 'fresh_produce',
          unit: 'kg',
          quantity: 50,
          unitPrice: 400,
          totalPrice: 20000,
          stockDeducted: true,
          warehouseLocation: 'WH-05'
        }
      ],
      paymentMethod: 'split',
      splitPayment: {
        cashAmount: 20000,
        mobileAmount: 10000,
        bankAmount: 5000
      },
      totalAmount: 35000,
      amountPaid: 35000,
      outstandingBalance: 0,
      status: 'fully_paid',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-24'),
      updatedAt: new Date('2024-01-24')
    }
  ];

  private mockPayments: Payment[] = [
    {
      id: '1',
      paymentId: 'PAY-2024-001',
      saleId: '1',
      paymentType: 'sale_payment',
      amount: 75000,
      paymentMethod: 'cash',
      paymentDate: new Date('2024-01-20'),
      status: 'completed',
      referenceNumber: 'CASH-001',
      processedBy: 'Admin User',
      validated: true,
      validationDate: new Date('2024-01-20'),
      validatedBy: 'Supervisor',
      receiptGenerated: true,
      receiptNumber: 'RCPT-001',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      paymentId: 'PAY-2024-002',
      saleId: '2',
      farmerId: '2',
      paymentType: 'sale_payment',
      amount: 1500000,
      paymentMethod: 'bank_transfer',
      bankTransferDetails: {
        bankName: 'First Bank',
        accountNumber: '1234567890',
        reference: 'BANK-TFR-001'
      },
      paymentDate: new Date('2024-01-21'),
      status: 'completed',
      referenceNumber: 'BANK-REF-002',
      processedBy: 'Admin User',
      validated: true,
      validationDate: new Date('2024-01-21'),
      validatedBy: 'Supervisor',
      receiptGenerated: true,
      receiptNumber: 'RCPT-002',
      createdAt: new Date('2024-01-21'),
      updatedAt: new Date('2024-01-21')
    },
    {
      id: '3',
      paymentId: 'PAY-2024-003',
      saleId: '3',
      paymentType: 'sale_payment',
      amount: 60000,
      paymentMethod: 'mobile_money',
      mobileMoneyDetails: {
        provider: 'mtn',
        reference: 'MM-REF-001',
        phoneNumber: '+2348034567890'
      },
      paymentDate: new Date('2024-01-22'),
      status: 'completed',
      referenceNumber: 'MM-REF-001',
      processedBy: 'Admin User',
      validated: true,
      validationDate: new Date('2024-01-22'),
      validatedBy: 'Supervisor',
      receiptGenerated: true,
      receiptNumber: 'RCPT-003',
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    }
  ];

  private mockFarmerPayments: FarmerPayment[] = [
  {
    id: '1',
    paymentId: 'FPAY-2024-001',
    farmerId: '1',
    farmerName: 'Chinedu Okoro',
    periodStart: new Date('2024-01-01'),
    periodEnd: new Date('2024-01-20'),
    totalDeliveries: 5,
    totalWeight: 2500,
    basePrice: 375000,
    qualityBonus: 25000,
    deductions: {
      microcreditRepayment: 50000,
      cooperativeDues: 5000,
      otherCharges: 0
    },
    totalAmount: 345000,
    paymentStatus: 'paid',
    paymentMethod: 'mobile_money',
    paymentDate: new Date('2024-01-25'),
    receiptNumber: 'FARMER-RCPT-001',
    validated: true,  // Add this
    validatedBy: 'Admin',
    validationDate: new Date('2024-01-25'),
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '2',
    paymentId: 'FPAY-2024-002',
    farmerId: '2',
    farmerName: 'Amina Bello',
    periodStart: new Date('2024-01-01'),
    periodEnd: new Date('2024-01-20'),
    totalDeliveries: 8,
    totalWeight: 4200,
    basePrice: 630000,
    qualityBonus: 42000,
    deductions: {
      microcreditRepayment: 75000,
      cooperativeDues: 5000,
      otherCharges: 0
    },
    totalAmount: 592000,
    paymentStatus: 'processing',
    validated: false,  // Add this
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

  private mockStockItems: StockItem[] = [
    {
      id: '1',
      productId: 'PROD-001',
      productName: 'Maize (Grade A)',
      productType: 'fresh_produce',
      category: 'fresh_produce',
      unit: 'kg',
      currentStock: 1500,
      minStockLevel: 500,
      maxStockLevel: 5000,
      unitPrice: 150,
      lastUpdated: new Date('2024-01-24'),
      location: 'WH-01',
      batchNumber: 'BATCH-2024-001',
      status: 'available'
    },
    {
      id: '2',
      productId: 'PROD-002',
      productName: 'Rice (Processed)',
      productType: 'processed',
      category: 'processed',
      unit: 'bags',
      currentStock: 300,
      minStockLevel: 100,
      maxStockLevel: 1000,
      unitPrice: 25000,
      lastUpdated: new Date('2024-01-24'),
      location: 'WH-02',
      status: 'available'
    },
    {
      id: '3',
      productId: 'PROD-003',
      productName: 'Cassava Flour',
      productType: 'processed',
      category: 'processed',
      unit: 'kg',
      currentStock: 800,
      minStockLevel: 200,
      maxStockLevel: 2000,
      unitPrice: 300,
      lastUpdated: new Date('2024-01-24'),
      location: 'WH-02',
      status: 'available'
    }
  ];

  constructor() {}

  // Sales Methods
  getSales(filters?: SalesFilters): Observable<Sale[]> {
    let filteredSales = [...this.mockSales];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredSales = filteredSales.filter(sale =>
          sale.transactionId.toLowerCase().includes(searchLower) ||
          sale.customerName.toLowerCase().includes(searchLower) ||
          sale.customerPhone?.includes(filters.search!) ||
          sale.customerEmail?.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status) {
        filteredSales = filteredSales.filter(sale => sale.status === filters.status);
      }

      if (filters.paymentMethod) {
        filteredSales = filteredSales.filter(sale => sale.paymentMethod === filters.paymentMethod);
      }

      if (filters.customerType) {
        filteredSales = filteredSales.filter(sale => sale.customerType === filters.customerType);
      }

      if (filters.startDate) {
        filteredSales = filteredSales.filter(sale => sale.saleDate >= filters.startDate!);
      }

      if (filters.endDate) {
        filteredSales = filteredSales.filter(sale => sale.saleDate <= filters.endDate!);
      }

      if (filters.minAmount) {
        filteredSales = filteredSales.filter(sale => sale.totalAmount >= filters.minAmount!);
      }

      if (filters.maxAmount) {
        filteredSales = filteredSales.filter(sale => sale.totalAmount <= filters.maxAmount!);
      }
    }

    return of(filteredSales).pipe(delay(500));
  }

  getSaleById(id: string): Observable<Sale> {
    const sale = this.mockSales.find(s => s.id === id);
    if (sale) {
      return of(sale).pipe(delay(300));
    }
    return throwError(() => new Error('Sale not found'));
  }

  createSale(sale: Omit<Sale, 'id' | 'transactionId' | 'createdAt' | 'updatedAt'>): Observable<Sale> {
    const newSale: Sale = {
      ...sale,
      id: Math.random().toString(36).substr(2, 9),
      transactionId: `SALE-${new Date().getFullYear()}-${String(this.mockSales.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockSales.push(newSale);
    return of(newSale).pipe(delay(800));
  }

  updateSale(id: string, updates: Partial<Sale>): Observable<Sale> {
    const index = this.mockSales.findIndex(s => s.id === id);
    if (index === -1) {
      return throwError(() => new Error('Sale not found'));
    }

    this.mockSales[index] = {
      ...this.mockSales[index],
      ...updates,
      updatedAt: new Date()
    };

    return of(this.mockSales[index]).pipe(delay(600));
  }

  deleteSale(id: string): Observable<boolean> {
    const index = this.mockSales.findIndex(s => s.id === id);
    if (index === -1) {
      return throwError(() => new Error('Sale not found'));
    }

    this.mockSales[index].status = 'cancelled';
    this.mockSales[index].updatedAt = new Date();
    
    return of(true).pipe(delay(400));
  }

  // Payment Methods
  getPayments(filters?: PaymentFilters): Observable<Payment[]> {
    let filteredPayments = [...this.mockPayments];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredPayments = filteredPayments.filter(payment =>
          payment.paymentId.toLowerCase().includes(searchLower) ||
          payment.referenceNumber.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status) {
        filteredPayments = filteredPayments.filter(payment => payment.status === filters.status);
      }

      if (filters.paymentType) {
        filteredPayments = filteredPayments.filter(payment => payment.paymentType === filters.paymentType);
      }

      if (filters.paymentMethod) {
        filteredPayments = filteredPayments.filter(payment => payment.paymentMethod === filters.paymentMethod);
      }

      if (filters.startDate) {
        filteredPayments = filteredPayments.filter(payment => payment.paymentDate >= filters.startDate!);
      }

      if (filters.endDate) {
        filteredPayments = filteredPayments.filter(payment => payment.paymentDate <= filters.endDate!);
      }

      if (filters.minAmount) {
        filteredPayments = filteredPayments.filter(payment => payment.amount >= filters.minAmount!);
      }

      if (filters.maxAmount) {
        filteredPayments = filteredPayments.filter(payment => payment.amount <= filters.maxAmount!);
      }
    }

    return of(filteredPayments).pipe(delay(500));
  }

  createPayment(payment: Omit<Payment, 'id' | 'paymentId' | 'createdAt' | 'updatedAt'>): Observable<Payment> {
    const newPayment: Payment = {
      ...payment,
      id: Math.random().toString(36).substr(2, 9),
      paymentId: `PAY-${new Date().getFullYear()}-${String(this.mockPayments.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockPayments.push(newPayment);
    return of(newPayment).pipe(delay(800));
  }

  validatePayment(paymentId: string, validatedBy: string): Observable<Payment> {
    const payment = this.mockPayments.find(p => p.id === paymentId);
    if (!payment) {
      return throwError(() => new Error('Payment not found'));
    }

    payment.validated = true;
    payment.validatedBy = validatedBy;
    payment.validationDate = new Date();
    payment.updatedAt = new Date();

    return of(payment).pipe(delay(400));
  }

  // Farmer Payments Methods
  getFarmerPayments(): Observable<FarmerPayment[]> {
    return of(this.mockFarmerPayments).pipe(delay(500));
  }

calculateFarmerPayment(farmerId: string, periodStart: Date, periodEnd: Date): Observable<FarmerPayment> {
  const newPayment: FarmerPayment = {
    id: Math.random().toString(36).substr(2, 9),
    paymentId: `FPAY-${new Date().getFullYear()}-${String(this.mockFarmerPayments.length + 1).padStart(3, '0')}`,
    farmerId,
    farmerName: 'Mock Farmer',
    periodStart,
    periodEnd,
    totalDeliveries: 5,
    totalWeight: 2500,
    basePrice: 375000,
    qualityBonus: 25000,
    deductions: {
      microcreditRepayment: 50000,
      cooperativeDues: 5000,
      otherCharges: 0
    },
    totalAmount: 345000,
    paymentStatus: 'pending',
    validated: false,  // Add this
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return of(newPayment).pipe(delay(800));
}

  processFarmerPayment(paymentId: string, paymentMethod: 'cash' | 'mobile_money' | 'bank_transfer'): Observable<FarmerPayment> {
    const payment = this.mockFarmerPayments.find(p => p.paymentId === paymentId);
    if (!payment) {
      return throwError(() => new Error('Payment not found'));
    }

    payment.paymentStatus = 'paid';
    payment.paymentMethod = paymentMethod;
    payment.paymentDate = new Date();
    payment.receiptNumber = `FARMER-RCPT-${String(this.mockFarmerPayments.length + 1).padStart(3, '0')}`;
    payment.validated = true;
    payment.validatedBy = 'Admin';
    payment.validationDate = new Date();
    payment.updatedAt = new Date();

    return of(payment).pipe(delay(600));
  }

  // Stock Methods
  getStockItems(): Observable<StockItem[]> {
    return of(this.mockStockItems).pipe(delay(500));
  }

  // Sales Summary
  getSalesSummary(): Observable<SalesSummary> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    const summary: SalesSummary = {
      totalSales: this.mockSales.length,
      totalRevenue: this.mockSales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      totalTransactions: this.mockPayments.length,
      pendingPayments: this.mockSales.filter(s => s.outstandingBalance > 0).reduce((sum, s) => sum + s.outstandingBalance, 0),
      averageSaleValue: this.mockSales.reduce((sum, sale) => sum + sale.totalAmount, 0) / this.mockSales.length,
      todaySales: this.mockSales.filter(s => s.saleDate >= today).reduce((sum, s) => sum + s.totalAmount, 0),
      thisWeekSales: this.mockSales.filter(s => s.saleDate >= weekAgo).reduce((sum, s) => sum + s.totalAmount, 0),
      thisMonthSales: this.mockSales.filter(s => s.saleDate >= monthAgo).reduce((sum, s) => sum + s.totalAmount, 0),
      paymentMethodBreakdown: {
        cash: this.mockSales.filter(s => s.paymentMethod === 'cash').reduce((sum, s) => sum + s.totalAmount, 0),
        mobile_money: this.mockSales.filter(s => s.paymentMethod === 'mobile_money').reduce((sum, s) => sum + s.totalAmount, 0),
        bank_transfer: this.mockSales.filter(s => s.paymentMethod === 'bank_transfer').reduce((sum, s) => sum + s.totalAmount, 0),
        credit: this.mockSales.filter(s => s.paymentMethod === 'credit').reduce((sum, s) => sum + s.totalAmount, 0)
      },
      statusBreakdown: {
        pending: this.mockSales.filter(s => s.status === 'pending').length,
        confirmed: this.mockSales.filter(s => s.status === 'confirmed').length,
        partially_paid: this.mockSales.filter(s => s.status === 'partially_paid').length,
        fully_paid: this.mockSales.filter(s => s.status === 'fully_paid').length,
        cancelled: this.mockSales.filter(s => s.status === 'cancelled').length
      }
    };

    return of(summary).pipe(delay(300));
  }

  // Reports
  generateSalesReport(format: 'excel' | 'pdf' | 'csv', filters?: SalesFilters): Observable<Blob> {
    // Mock implementation
    const blob = new Blob(['Mock sales report data'], {
      type: format === 'excel' ? 'application/vnd.ms-excel' :
             format === 'pdf' ? 'application/pdf' :
             'text/csv'
    });
    
    return of(blob).pipe(delay(1000));
  }

  generateReceipt(saleId: string): Observable<Blob> {
    // Mock implementation
    const receiptContent = `
      RECEIPT
      =======
      Sale ID: ${saleId}
      Date: ${new Date().toLocaleDateString()}
      Amount: ${this.mockSales.find(s => s.id === saleId)?.totalAmount}
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    return of(blob).pipe(delay(500));
  }
}