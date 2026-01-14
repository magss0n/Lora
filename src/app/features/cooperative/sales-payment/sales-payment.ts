import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SalesService } from '../../../core/services/sales-payment';
import { Sale, Payment, FarmerPayment, SalesSummary, StockItem } from '../../../core/models/sales-payment';

// Import SVG Icons
import { 
  SalesIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  ExportIcon,
  ImportIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
  DownloadIcon,
  UploadIcon,
  FileIcon,
  XCircleIcon,
  AlertIcon,
  CheckCircleIcon,
  CreditCardIcon,
  PackageIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  UsersIcon,
  CreditIcon,
  PalletIcon
} from '../../../shared/components/svg-icons/svg-icons';

@Component({
  selector: 'app-sales-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // SVG Icons
    SalesIcon,
    SearchIcon,
    FilterIcon,
    PlusIcon,
    ExportIcon,
    ImportIcon,
    EditIcon,
    EyeIcon,
    TrashIcon,
    DownloadIcon,
    UploadIcon,
    FileIcon,
    XCircleIcon,
    AlertIcon,
    CheckCircleIcon,
    CreditCardIcon,
    PackageIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    ClockIcon,
    UsersIcon,
    CreditIcon,
    PalletIcon
  ],
  templateUrl: './sales-payment.html',
  styleUrls: ['./sales-payment.scss']
})
export class SalesPaymentComponent implements OnInit {
  // Data
  sales: Sale[] = [];
  payments: Payment[] = [];
  farmerPayments: FarmerPayment[] = [];
  stockItems: StockItem[] = [];
  filteredSales: Sale[] = [];
  selectedSale: Sale | null = null;
  selectedPayment: Payment | null = null;
  selectedFarmerPayment: FarmerPayment | null = null;
  
  // Active Tab
  activeTab: 'sales' | 'payments' | 'farmer-payments' = 'sales';
  
  // Filters
  filters: any = {};
  searchQuery: string = '';
  dateFilter: 'today' | 'week' | 'month' | 'all' = 'all';
  statusFilter: string = 'all';
  paymentMethodFilter: string = 'all';
  
  // Modals
  showSaleModal: boolean = false;
  showViewSaleModal: boolean = false;
  showEditSaleModal: boolean = false;
  showDeleteSaleModal: boolean = false;
  showPaymentModal: boolean = false;
  showValidatePaymentModal: boolean = false;
  showFarmerPaymentModal: boolean = false;
  showProcessPaymentModal: boolean = false;
  showExportModal: boolean = false;
  showImportModal: boolean = false;
  showFiltersModal: boolean = false;
  showReceiptModal: boolean = false;
  
  // Forms
  saleForm: FormGroup;
  paymentForm: FormGroup;
  farmerPaymentForm: FormGroup;
  
  // Loading states
  isLoading: boolean = false;
  isExporting: boolean = false;
  isImporting: boolean = false;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;
  
  // Export options
  exportFormat: 'excel' | 'pdf' | 'csv' = 'excel';
  
  // Import
  importFile: File | null = null;
  importProgress: number = 0;
  importResult: any = null;
  isDragover: boolean = false;
  
  // Statistics
  stats: SalesSummary = {
    totalSales: 0,
    totalRevenue: 0,
    totalTransactions: 0,
    pendingPayments: 0,
    averageSaleValue: 0,
    todaySales: 0,
    thisWeekSales: 0,
    thisMonthSales: 0,
    paymentMethodBreakdown: {
      cash: 0,
      mobile_money: 0,
      bank_transfer: 0,
      credit: 0
    },
    statusBreakdown: {
      pending: 0,
      confirmed: 0,
      partially_paid: 0,
      fully_paid: 0,
      cancelled: 0
    }
  };

  // Available products for sale items
  availableProducts: StockItem[] = [];
  selectedProduct: StockItem | null = null;

  constructor(
    private salesService: SalesService,
    private fb: FormBuilder
  ) {
    this.saleForm = this.fb.group({
      customerName: ['', Validators.required],
      customerPhone: [''],
      customerEmail: ['', Validators.email],
      customerType: ['farmer', Validators.required],
      customerId: [''],
      items: this.fb.array([]),
      paymentMethod: ['cash', Validators.required],
      mobileMoneyDetails: this.fb.group({
        provider: ['mtn'],
        reference: [''],
        phoneNumber: ['']
      }),
      bankTransferDetails: this.fb.group({
        bankName: [''],
        accountNumber: [''],
        reference: ['']
      }),
      splitPayment: this.fb.group({
        cashAmount: [0],
        mobileAmount: [0],
        bankAmount: [0]
      }),
      notes: [''],
      amountPaid: [0, [Validators.required, Validators.min(0)]]
    });

    this.paymentForm = this.fb.group({
      saleId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      paymentMethod: ['cash', Validators.required],
      mobileMoneyDetails: this.fb.group({
        provider: ['mtn'],
        reference: [''],
        phoneNumber: ['']
      }),
      bankTransferDetails: this.fb.group({
        bankName: [''],
        accountNumber: [''],
        reference: ['']
      }),
      notes: ['']
    });

    this.farmerPaymentForm = this.fb.group({
      farmerId: ['', Validators.required],
      farmerName: [''],
      periodStart: [new Date().toISOString().split('T')[0], Validators.required],
      periodEnd: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeWithEmptyData();
    this.loadData();
  }

  initializeWithEmptyData(): void {
    // Initialize with empty data
    this.sales = this.createEmptySales(5);
    this.filteredSales = [...this.sales];
    this.totalItems = this.sales.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePagination();
  }

  createEmptySales(count: number): Sale[] {
    const emptySales: Sale[] = [];
    for (let i = 0; i < count; i++) {
      emptySales.push({
        id: `temp-${i}`,
        transactionId: 'Loading...',
        saleDate: new Date(),
        customerName: 'Loading...',
        customerType: 'farmer',
        items: [],
        paymentMethod: 'cash',
        totalAmount: 0,
        amountPaid: 0,
        outstandingBalance: 0,
        status: 'pending',
        createdBy: 'Loading...',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return emptySales;
  }

  loadData(): void {
    this.isLoading = true;
    
    this.salesService.getSalesSummary().subscribe({
      next: (summary) => {
        this.stats = summary;
      },
      error: (error) => {
        console.error('Error loading sales summary:', error);
      }
    });

    this.loadSales();
    this.loadPayments();
    this.loadFarmerPayments();
    this.loadStockItems();
  }

  loadSales(): void {
    const filters: any = {};
    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.statusFilter !== 'all') filters.status = this.statusFilter;
    if (this.paymentMethodFilter !== 'all') filters.paymentMethod = this.paymentMethodFilter;

    this.salesService.getSales(filters).subscribe({
      next: (sales) => {
        this.sales = sales;
        this.filteredSales = [...sales];
        this.totalItems = sales.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading sales:', error);
        this.isLoading = false;
      }
    });
  }

  loadPayments(): void {
    this.salesService.getPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
      }
    });
  }

  loadFarmerPayments(): void {
    this.salesService.getFarmerPayments().subscribe({
      next: (payments) => {
        this.farmerPayments = payments;
      },
      error: (error) => {
        console.error('Error loading farmer payments:', error);
      }
    });
  }

  loadStockItems(): void {
    this.salesService.getStockItems().subscribe({
      next: (items) => {
        this.stockItems = items;
        this.availableProducts = items;
      },
      error: (error) => {
        console.error('Error loading stock items:', error);
      }
    });
  }

  // Form array methods for sale items
  get items(): FormArray {
    return this.saleForm.get('items') as FormArray;
  }

  addSaleItem(): void {
    const itemForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      productType: ['fresh_produce', Validators.required],
      unit: ['kg', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      discount: [0],
      tax: [0],
      stockDeducted: [false]
    });

    this.items.push(itemForm);
  }

  removeSaleItem(index: number): void {
    this.items.removeAt(index);
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredSales = this.sales.slice(startIndex, endIndex);
  }

  // Search and Filter methods
  onSearch(): void {
    this.currentPage = 1;
    this.loadSales();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadSales();
    this.showFiltersModal = false;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.statusFilter = 'all';
    this.paymentMethodFilter = 'all';
    this.filters = {};
    this.applyFilters();
  }

  // Modal methods
  openSaleModal(): void {
    this.saleForm.reset({
      customerType: 'farmer',
      paymentMethod: 'cash',
      amountPaid: 0
    });
    // Clear items array
    while (this.items.length !== 0) {
      this.items.removeAt(0);
    }
    this.addSaleItem(); // Add one initial item
    this.showSaleModal = true;
  }

  openViewSaleModal(sale: Sale): void {
    this.selectedSale = sale;
    this.showViewSaleModal = true;
  }

  openEditSaleModal(sale: Sale): void {
    this.selectedSale = sale;
    this.saleForm.patchValue({
      ...sale,
      amountPaid: sale.amountPaid
    });
    // TODO: Set form array items
    this.showEditSaleModal = true;
  }

  openDeleteSaleModal(sale: Sale): void {
    this.selectedSale = sale;
    this.showDeleteSaleModal = true;
  }

  openPaymentModal(sale: Sale): void {
    this.selectedSale = sale;
    this.paymentForm.patchValue({
      saleId: sale.id,
      amount: sale.outstandingBalance > 0 ? sale.outstandingBalance : sale.totalAmount
    });
    this.showPaymentModal = true;
  }

  openValidatePaymentModal(payment: Payment): void {
    this.selectedPayment = payment;
    this.showValidatePaymentModal = true;
  }

  openFarmerPaymentModal(): void {
    this.farmerPaymentForm.reset({
      periodStart: new Date().toISOString().split('T')[0],
      periodEnd: new Date().toISOString().split('T')[0]
    });
    this.showFarmerPaymentModal = true;
  }

  openProcessPaymentModal(payment: FarmerPayment): void {
    this.selectedFarmerPayment = payment;
    this.showProcessPaymentModal = true;
  }

  openExportModal(): void {
    this.showExportModal = true;
  }

  openImportModal(): void {
    this.showImportModal = true;
  }

  openReceiptModal(sale: Sale): void {
    this.selectedSale = sale;
    this.showReceiptModal = true;
  }

  // Form submission methods
  createSale(): void {
    if (this.saleForm.invalid) return;

    const saleData = this.saleForm.value;
    saleData.saleDate = new Date();
    saleData.totalAmount = this.calculateTotalAmount(saleData.items);
    saleData.outstandingBalance = saleData.totalAmount - (saleData.amountPaid || 0);
    saleData.status = saleData.outstandingBalance === 0 ? 'fully_paid' : 
                     saleData.amountPaid > 0 ? 'partially_paid' : 'pending';
    saleData.createdBy = 'Current User';

    this.isLoading = true;
    this.salesService.createSale(saleData).subscribe({
      next: (newSale) => {
        this.loadData();
        this.showSaleModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating sale:', error);
        this.isLoading = false;
      }
    });
  }

  createPayment(): void {
  if (this.paymentForm.invalid || !this.selectedSale) return;

  const paymentData = this.paymentForm.value;
  paymentData.paymentType = 'sale_payment';
  paymentData.paymentDate = new Date();
  paymentData.status = 'completed';
  paymentData.referenceNumber = `REF-${Date.now()}`;
  paymentData.processedBy = 'Current User';
  paymentData.validated = false;
  paymentData.receiptGenerated = false;

  this.isLoading = true;
  this.salesService.createPayment(paymentData).subscribe({
    next: (newPayment) => {
      // Update sale payment status
      const outstandingBalance = Math.max(0, this.selectedSale!.outstandingBalance - paymentData.amount);
      const status: Sale['status'] = outstandingBalance <= 0 ? 'fully_paid' : 'partially_paid';
      
      const saleUpdate: Partial<Sale> = {
        amountPaid: this.selectedSale!.amountPaid + paymentData.amount,
        outstandingBalance: outstandingBalance,
        status: status
      };
      
      this.salesService.updateSale(this.selectedSale!.id, saleUpdate).subscribe({
        next: () => {
          this.loadData();
          this.showPaymentModal = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating sale:', error);
          this.isLoading = false;
        }
      });
    },
    error: (error) => {
      console.error('Error creating payment:', error);
      this.isLoading = false;
    }
  });
}

  validatePayment(): void {
    if (!this.selectedPayment) return;

    this.isLoading = true;
    this.salesService.validatePayment(this.selectedPayment.id, 'Current User').subscribe({
      next: (validatedPayment) => {
        this.loadPayments();
        this.showValidatePaymentModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error validating payment:', error);
        this.isLoading = false;
      }
    });
  }

  calculateFarmerPayment(): void {
    if (this.farmerPaymentForm.invalid) return;

    const formData = this.farmerPaymentForm.value;
    this.isLoading = true;

    this.salesService.calculateFarmerPayment(
      formData.farmerId,
      new Date(formData.periodStart),
      new Date(formData.periodEnd)
    ).subscribe({
      next: (payment) => {
        // In real app, you would add this to farmer payments list
        this.loadFarmerPayments();
        this.showFarmerPaymentModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error calculating farmer payment:', error);
        this.isLoading = false;
      }
    });
  }

  processFarmerPayment(paymentMethod: 'cash' | 'mobile_money' | 'bank_transfer'): void {
    if (!this.selectedFarmerPayment) return;

    this.isLoading = true;
    this.salesService.processFarmerPayment(this.selectedFarmerPayment.paymentId, paymentMethod).subscribe({
      next: (processedPayment) => {
        this.loadFarmerPayments();
        this.showProcessPaymentModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error processing farmer payment:', error);
        this.isLoading = false;
      }
    });
  }

  deleteSale(): void {
    if (!this.selectedSale) return;

    this.isLoading = true;
    this.salesService.deleteSale(this.selectedSale.id).subscribe({
      next: () => {
        this.loadData();
        this.showDeleteSaleModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting sale:', error);
        this.isLoading = false;
      }
    });
  }

  // Helper methods
  calculateTotalAmount(items: any[]): number {
    return items.reduce((total, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      const discount = (item.discount || 0) / 100 * itemTotal;
      const tax = (item.tax || 0) / 100 * (itemTotal - discount);
      return total + (itemTotal - discount + tax);
    }, 0);
  }

  onProductSelect(product: StockItem): void {
    this.selectedProduct = product;
    const lastItemIndex = this.items.length - 1;
    if (lastItemIndex >= 0) {
      this.items.at(lastItemIndex).patchValue({
        productId: product.productId,
        productName: product.productName,
        productType: product.category,
        unitPrice: product.unitPrice
      });
    }
  }

  getPaymentMethodDisplay(method: string): string {
    const methods: {[key: string]: string} = {
      'cash': 'Cash',
      'mobile_money': 'Mobile Money',
      'bank_transfer': 'Bank Transfer',
      'credit': 'Credit',
      'split': 'Split Payment'
    };
    return methods[method] || method;
  }

  getStatusClass(status: string): string {
    const classes: {[key: string]: string} = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'partially_paid': 'status-partial',
      'fully_paid': 'status-completed',
      'cancelled': 'status-cancelled',
      'processing': 'status-processing',
      'paid': 'status-completed',
      'failed': 'status-failed'
    };
    return classes[status] || 'status-pending';
  }

  getStatusDisplay(status: string): string {
    const displays: {[key: string]: string} = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'partially_paid': 'Partially Paid',
      'fully_paid': 'Fully Paid',
      'cancelled': 'Cancelled',
      'processing': 'Processing',
      'paid': 'Paid',
      'failed': 'Failed'
    };
    return displays[status] || status;
  }

  getCustomerTypeDisplay(type: string): string {
    const types: {[key: string]: string} = {
      'farmer': 'Farmer',
      'wholesaler': 'Wholesaler',
      'retailer': 'Retailer',
      'other': 'Other'
    };
    return types[type] || type;
  }

  getItemsPreview(items: any[]): string {
  if (!items || items.length === 0) return 'No items';
  const previewItems = items.slice(0, 2);
  return previewItems.map(item => item.productName).join(', ');
}

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatDateTime(date: Date | string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  downloadReceipt(): void {
    if (!this.selectedSale) return;

    this.isLoading = true;
    this.salesService.generateReceipt(this.selectedSale.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt-${this.selectedSale!.transactionId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating receipt:', error);
        this.isLoading = false;
      }
    });
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
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

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return Math.min(end, this.totalItems);
  }

  // Drag and drop for import
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = false;
    
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.importFile = file;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importFile = file;
    }
  }

  // Export methods
  exportData(): void {
    this.isExporting = true;
    
    this.salesService.generateSalesReport(this.exportFormat, this.filters).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales-report-${new Date().toISOString().split('T')[0]}.${
          this.exportFormat === 'excel' ? 'xlsx' :
          this.exportFormat === 'pdf' ? 'pdf' : 'csv'
        }`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.isExporting = false;
        this.showExportModal = false;
      },
      error: (error) => {
        console.error('Error exporting data:', error);
        this.isExporting = false;
      }
    });
  }

  // Close all modals
  closeModal(): void {
    this.showSaleModal = false;
    this.showViewSaleModal = false;
    this.showEditSaleModal = false;
    this.showDeleteSaleModal = false;
    this.showPaymentModal = false;
    this.showValidatePaymentModal = false;
    this.showFarmerPaymentModal = false;
    this.showProcessPaymentModal = false;
    this.showExportModal = false;
    this.showImportModal = false;
    this.showFiltersModal = false;
    this.showReceiptModal = false;
    this.selectedSale = null;
    this.selectedPayment = null;
    this.selectedFarmerPayment = null;
    this.isDragover = false;
  }
}