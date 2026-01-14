// src/app/features/contracts/contracts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContractService } from '../../../core/services/contract';
import { 
  Contract, 
  ContractFilters, 
  ContractTemplate,
  ContractProduct,
  DeliverySchedule,
  Milestone 
} from '../../../core/models/contract';

// SVG Icons
import { 
  ContractIcon,
  AddContractIcon,
  TemplateIcon,
  SignatureIcon,
  DocumentIcon,
  RenewIcon,
  CalendarIcon,
  MoneyIcon,
  TruckIcon,
  CheckCircleContractIcon,
  ExportContractIcon,
  PrintContractIcon,
  ShareContractIcon,
  DownloadContractIcon,
  EditContractIcon,
  DeleteContractIcon,
  ViewContractIcon,
  FilterContractIcon,
  StatusIcon,
  AnalyticsIcon,
  SearchIcon,
  UsersIcon,
  XCircleIcon,
  AlertIcon,
  PlusIcon,
  ExportIcon,
  ImportIcon,
  DownloadIcon,
  UploadIcon,
  FileIcon,
  CheckCircleIcon,
  FilterIcon,
  MoneyIcons
} from '../../../shared/components/svg-icons/svg-icons';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Contract-specific icons
    ContractIcon,
    AddContractIcon,
    TemplateIcon,
    SignatureIcon,
    DocumentIcon,
    RenewIcon,
    CalendarIcon,
    MoneyIcon,
    TruckIcon,
    CheckCircleContractIcon,
    ExportContractIcon,
    PrintContractIcon,
    ShareContractIcon,
    DownloadContractIcon,
    EditContractIcon,
    DeleteContractIcon,
    ViewContractIcon,
    FilterContractIcon,
    StatusIcon,
    AnalyticsIcon,
    // Common icons
    SearchIcon,
    UsersIcon,
    XCircleIcon,
    AlertIcon,
    PlusIcon,
    ExportIcon,
    ImportIcon,
    DownloadIcon,
    UploadIcon,
    FileIcon,
    CheckCircleIcon,
    FilterIcon,
  MoneyIcons
  ],
  templateUrl: './contracts.html',
  styleUrls: ['./contracts.scss']
})
export class ContractsComponent implements OnInit {
  // Data
  contracts: Contract[] = [];
  filteredContracts: Contract[] = [];
  selectedContract: Contract | null = null;
  templates: ContractTemplate[] = [];
  
  // Filters
  filters: ContractFilters = {};
  searchQuery: string = '';
  typeFilter: string = 'all';
  statusFilter: string = 'all';
  
  // Modals
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showViewModal: boolean = false;
  showDeleteModal: boolean = false;
  showTemplateModal: boolean = false;
  showDeliveryModal: boolean = false;
  showMilestoneModal: boolean = false;
  showFiltersModal: boolean = false;
  showExportModal: boolean = false;
  showRenewModal: boolean = false;
  
  // Forms
  contractForm: FormGroup;
  deliveryForm: FormGroup;
  milestoneForm: FormGroup;
  
  // Loading states
  isLoading: boolean = false;
  isExporting: boolean = false;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;
  
  // Statistics
  stats: any = {
    total: 0,
    active: 0,
    expired: 0,
    pending: 0,
    totalValue: 0,
    upcomingRenewals: 0
  };
  
  // Options
  contractTypes = [
    { value: 'farmer-supply', label: 'Farmer Supply' },
    { value: 'buyer-purchase', label: 'Buyer Purchase' },
    { value: 'equipment-lease', label: 'Equipment Lease' },
    { value: 'service', label: 'Service' }
  ];
  
  contractStatuses = [
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending' },
    { value: 'terminated', label: 'Terminated' },
    { value: 'draft', label: 'Draft' }
  ];
  
  units = ['kg', 'ton', 'bag', 'crate', 'liter', 'unit'];
  
  currencies = ['NGN', 'USD', 'EUR', 'GBP'];
  
  // View state
  activeTab: string = 'overview';
  selectedTemplate: ContractTemplate | null = null;

  constructor(
    private contractService: ContractService,
    private fb: FormBuilder
  ) {
    this.contractForm = this.fb.group({
      title: ['', Validators.required],
      type: ['farmer-supply', Validators.required],
      farmerId: [''],
      farmerName: [''],
      buyerId: [''],
      buyerName: [''],
      supplierId: [''],
      supplierName: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalValue: [0, [Validators.required, Validators.min(0)]],
      currency: ['NGN', Validators.required],
      paymentTerms: ['', Validators.required],
      qualityStandards: [''],
      products: this.fb.array([]),
      milestones: this.fb.array([])
    });
    
    this.deliveryForm = this.fb.group({
      scheduledDate: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      notes: ['']
    });
    
    this.milestoneForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      isCritical: [false]
    });
    
    // Add initial product
    this.addProduct();
  }
  
  ngOnInit(): void {
    this.initializeWithEmptyData();
    this.loadContracts();
    this.loadStats();
    this.loadTemplates();
  }
  
  initializeWithEmptyData(): void {
    this.contracts = this.createEmptyContracts(5);
    this.filteredContracts = [...this.contracts];
    this.totalItems = this.contracts.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePagination();
    
    this.stats = {
      total: 0,
      active: 0,
      expired: 0,
      pending: 0,
      totalValue: 0,
      upcomingRenewals: 0
    };
  }
  
  createEmptyContracts(count: number): any[] {
    const emptyContracts = [];
    for (let i = 0; i < count; i++) {
      emptyContracts.push({
        id: `temp-${i}`,
        contractNumber: 'CT-2024-XXX',
        title: 'Loading...',
        type: 'farmer-supply',
        status: 'pending',
        farmerName: 'Loading...',
        buyerName: 'Loading...',
        startDate: new Date(),
        endDate: new Date(),
        totalValue: 0,
        currency: 'NGN',
        fulfillment: {
          completionPercentage: 0,
          deliveredQuantity: 0,
          remainingQuantity: 0,
          totalQuantity: 0
        },
        milestones: []
      });
    }
    return emptyContracts;
  }
  
  loadContracts(): void {
    this.isLoading = true;
    
    const filters: ContractFilters = {};
    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.typeFilter !== 'all') filters.type = this.typeFilter;
    if (this.statusFilter !== 'all') filters.status = this.statusFilter;
    
    this.contractService.getContracts(filters).subscribe({
      next: (contracts) => {
        this.contracts = contracts;
        this.filteredContracts = [...contracts];
        this.totalItems = contracts.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contracts:', error);
        this.isLoading = false;
      }
    });
  }
  
  loadStats(): void {
    this.contractService.getContractStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }
  
  loadTemplates(): void {
    this.contractService.getTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;
      },
      error: (error) => {
        console.error('Error loading templates:', error);
      }
    });
  }
  
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredContracts = this.contracts.slice(startIndex, endIndex);
  }
  
  // Form array methods
  get products(): FormArray {
    return this.contractForm.get('products') as FormArray;
  }
  
  get milestones(): FormArray {
    return this.contractForm.get('milestones') as FormArray;
  }
  
  addProduct(): void {
    const productGroup = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['kg', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      qualityGrade: [''],
      deliveryPeriod: ['']
    });
    this.products.push(productGroup);
  }
  
  removeProduct(index: number): void {
    this.products.removeAt(index);
  }
  
  addMilestone(): void {
    const milestoneGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      isCritical: [false]
    });
    this.milestones.push(milestoneGroup);
  }
  
  removeMilestone(index: number): void {
    this.milestones.removeAt(index);
  }
  
  // Search and filters
  onSearch(): void {
    this.currentPage = 1;
    this.loadContracts();
  }
  
  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }
  
  applyFilters(): void {
    this.currentPage = 1;
    this.loadContracts();
    this.showFiltersModal = false;
  }
  
  clearFilters(): void {
    this.typeFilter = 'all';
    this.statusFilter = 'all';
    this.filters = {};
    this.applyFilters();
  }
  
  // Modal methods
  openAddModal(): void {
    this.contractForm.reset({
      type: 'farmer-supply',
      currency: 'NGN',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalValue: 0
    });
    
    // Clear arrays
    while (this.products.length) this.products.removeAt(0);
    while (this.milestones.length) this.milestones.removeAt(0);
    
    this.addProduct();
    this.showAddModal = true;
  }
  
  openEditModal(contract: Contract): void {
    this.selectedContract = contract;
    
    this.contractForm.patchValue({
      ...contract,
      startDate: this.formatDateForInput(contract.startDate),
      endDate: this.formatDateForInput(contract.endDate)
    });
    
    // Clear and repopulate products
    while (this.products.length) this.products.removeAt(0);
    contract.products.forEach(product => {
      const productGroup = this.fb.group({
        productName: [product.productName, Validators.required],
        quantity: [product.quantity, [Validators.required, Validators.min(0)]],
        unit: [product.unit, Validators.required],
        unitPrice: [product.unitPrice, [Validators.required, Validators.min(0)]],
        qualityGrade: [product.qualityGrade],
        deliveryPeriod: [product.deliveryPeriod]
      });
      this.products.push(productGroup);
    });
    
    // Clear and repopulate milestones
    while (this.milestones.length) this.milestones.removeAt(0);
    contract.milestones.forEach(milestone => {
      const milestoneGroup = this.fb.group({
        name: [milestone.name, Validators.required],
        description: [milestone.description],
        dueDate: [this.formatDateForInput(milestone.dueDate), Validators.required],
        isCritical: [milestone.isCritical]
      });
      this.milestones.push(milestoneGroup);
    });
    
    this.showEditModal = true;
  }
  
  openViewModal(contract: Contract): void {
    this.selectedContract = contract;
    this.activeTab = 'overview';
    this.showViewModal = true;
  }
  
  openDeleteModal(contract: Contract): void {
    this.selectedContract = contract;
    this.showDeleteModal = true;
  }
  
  openTemplateModal(): void {
    this.showTemplateModal = true;
  }
  
  openDeliveryModal(contract: Contract): void {
    this.selectedContract = contract;
    this.deliveryForm.reset({
      scheduledDate: new Date().toISOString().split('T')[0],
      quantity: 0
    });
    this.showDeliveryModal = true;
  }
  
  openMilestoneModal(contract: Contract): void {
    this.selectedContract = contract;
    this.milestoneForm.reset({
      dueDate: new Date().toISOString().split('T')[0],
      isCritical: false
    });
    this.showMilestoneModal = true;
  }
  
  openRenewModal(contract: Contract): void {
    this.selectedContract = contract;
    this.showRenewModal = true;
  }
  
  // Form submissions
  addContract(): void {
    if (this.contractForm.invalid) return;
    
    const contractData = this.contractForm.value;
    contractData.startDate = new Date(contractData.startDate);
    contractData.endDate = new Date(contractData.endDate);
    
    // Calculate total value from products if not set
    if (!contractData.totalValue || contractData.totalValue === 0) {
      contractData.totalValue = contractData.products.reduce(
        (sum: number, product: any) => sum + (product.quantity * product.unitPrice), 0
      );
    }
    
    this.isLoading = true;
    this.contractService.createContract(contractData).subscribe({
      next: (newContract) => {
        this.loadContracts();
        this.loadStats();
        this.showAddModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding contract:', error);
        this.isLoading = false;
      }
    });
  }
  
  updateContract(): void {
    if (this.contractForm.invalid || !this.selectedContract) return;
    
    const updates = this.contractForm.value;
    updates.startDate = new Date(updates.startDate);
    updates.endDate = new Date(updates.endDate);
    
    this.isLoading = true;
    this.contractService.updateContract(this.selectedContract.id, updates).subscribe({
      next: (updatedContract) => {
        this.loadContracts();
        this.loadStats();
        this.showEditModal = false;
        this.selectedContract = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating contract:', error);
        this.isLoading = false;
      }
    });
  }
  
  deleteContract(): void {
    if (!this.selectedContract) return;
    
    this.isLoading = true;
    this.contractService.deleteContract(this.selectedContract.id).subscribe({
      next: () => {
        this.loadContracts();
        this.loadStats();
        this.showDeleteModal = false;
        this.selectedContract = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting contract:', error);
        this.isLoading = false;
      }
    });
  }
  
  recordDelivery(): void {
    if (this.deliveryForm.invalid || !this.selectedContract) return;
    
    const deliveryData = this.deliveryForm.value;
    deliveryData.scheduledDate = new Date(deliveryData.scheduledDate);
    
    this.isLoading = true;
    this.contractService.recordDelivery(this.selectedContract.id, deliveryData).subscribe({
      next: (updatedContract) => {
        this.selectedContract = updatedContract;
        this.loadContracts();
        this.loadStats();
        this.showDeliveryModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error recording delivery:', error);
        this.isLoading = false;
      }
    });
  }
  
  addMilestoneToContract(): void {
    if (this.milestoneForm.invalid || !this.selectedContract) return;
    
    const milestoneData = this.milestoneForm.value;
    milestoneData.dueDate = new Date(milestoneData.dueDate);
    
    // In a real app, this would call a service method
    // For now, we'll update locally
    const newMilestone: Milestone = {
      id: `M${Date.now()}`,
      name: milestoneData.name,
      description: milestoneData.description,
      dueDate: milestoneData.dueDate,
      status: 'pending',
      isCritical: milestoneData.isCritical
    };
    
    if (!this.selectedContract.milestones) {
      this.selectedContract.milestones = [];
    }
    
    this.selectedContract.milestones.push(newMilestone);
    this.showMilestoneModal = false;
    this.milestoneForm.reset();
  }
  
  // Template methods
  useTemplate(template: ContractTemplate): void {
    this.selectedTemplate = template;
    // Pre-fill form with template variables
    // Implementation would depend on template structure
    this.showTemplateModal = false;
    this.showAddModal = true;
  }
  
  // Helper methods
  formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
  
  formatCurrency(amount: number, currency: string = 'NGN'): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'expired': return 'status-expired';
      case 'pending': return 'status-pending';
      case 'terminated': return 'status-terminated';
      case 'draft': return 'status-draft';
      default: return 'status-unknown';
    }
  }
  
  // Add to the ContractsComponent class
getTypeLabel(type: string): string {
  const typeMap: { [key: string]: string } = {
    'farmer-supply': 'Farmer Supply',
    'buyer-purchase': 'Buyer Purchase',
    'equipment-lease': 'Equipment Lease',
    'service': 'Service'
  };
  return typeMap[type] || type;
}

getDuration(startDate: Date | string, endDate: Date | string): string {
  if (!startDate || !endDate) return 'N/A';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths > 0) {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
}

calculateOnTimeDelivery(contract: Contract): number {
  if (!contract.deliverySchedule || contract.deliverySchedule.length === 0) return 0;
  
  const deliveredDeliveries = contract.deliverySchedule.filter(d => d.status === 'delivered');
  if (deliveredDeliveries.length === 0) return 0;
  
  const onTimeDeliveries = deliveredDeliveries.filter(d => {
    if (!d.actualDate) return false;
    const actual = new Date(d.actualDate);
    const scheduled = new Date(d.scheduledDate);
    return actual <= scheduled || (actual.getTime() - scheduled.getTime()) < 24 * 60 * 60 * 1000;
  });
  
  return Math.round((onTimeDeliveries.length / deliveredDeliveries.length) * 100);
}

calculateMilestoneCompletion(contract: Contract): number {
  if (!contract.milestones || contract.milestones.length === 0) return 0;
  
  const completedMilestones = contract.milestones.filter(m => m.status === 'completed');
  return Math.round((completedMilestones.length / contract.milestones.length) * 100);
}

  getTypeClass(type: string): string {
    switch (type) {
      case 'farmer-supply': return 'type-supply';
      case 'buyer-purchase': return 'type-purchase';
      case 'equipment-lease': return 'type-lease';
      case 'service': return 'type-service';
      default: return 'type-other';
    }
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
  
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
  
  // View modal methods
  downloadContract(): void {
    if (!this.selectedContract) return;
    console.log('Downloading contract:', this.selectedContract.id);
    // Implementation would generate and download PDF
  }
  
  printContract(): void {
    if (!this.selectedContract) return;
    console.log('Printing contract:', this.selectedContract.id);
    // Implementation would print contract
  }
  
  shareContract(): void {
    if (!this.selectedContract) return;
    console.log('Sharing contract:', this.selectedContract.id);
    // Implementation would share contract
  }
  
  renewContract(): void {
    if (!this.selectedContract) return;
    console.log('Renewing contract:', this.selectedContract.id);
    // Implementation would create a renewal
  }
  
  markMilestoneComplete(milestoneId: string): void {
    if (!this.selectedContract) return;
    
    this.contractService.updateMilestone(this.selectedContract.id, milestoneId, 'completed').subscribe({
      next: (updatedContract) => {
        this.selectedContract = updatedContract;
      },
      error: (error) => {
        console.error('Error updating milestone:', error);
      }
    });
  }
  
  // Export methods
  exportContracts(): void {
    this.isExporting = true;
    
    // Mock export
    setTimeout(() => {
      const data = this.contracts.map(c => ({
        'Contract Number': c.contractNumber,
        'Title': c.title,
        'Type': c.type,
        'Status': c.status,
        'Start Date': this.formatDate(c.startDate),
        'End Date': this.formatDate(c.endDate),
        'Total Value': c.totalValue
      }));
      
      // Create CSV
      const csvContent = 'data:text/csv;charset=utf-8,' 
        + [Object.keys(data[0]), ...data.map(d => Object.values(d))]
          .map(e => e.join(','))
          .join('\n');
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `contracts_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.isExporting = false;
      this.showExportModal = false;
    }, 1000);
  }
  
  // Close modal
  closeModal(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showViewModal = false;
    this.showDeleteModal = false;
    this.showTemplateModal = false;
    this.showDeliveryModal = false;
    this.showMilestoneModal = false;
    this.showFiltersModal = false;
    this.showExportModal = false;
    this.showRenewModal = false;
    this.selectedContract = null;
    this.selectedTemplate = null;
  }
}