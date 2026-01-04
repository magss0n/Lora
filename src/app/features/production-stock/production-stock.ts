import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductionService } from '../../core/services/production-stock';
import { FarmerService } from '../../core/services/farmer';
import { Production, Stock, StockMovement, ProductionFilters, StockFilters } from '../../core/models/production-stock';
import { Farmer } from '../../core/models/farmer';

// SVG Icons
import { 
  SearchIcon,
  FilterIcon,
  XCircleIcon,
  CheckCircleIcon,
  AlertIcon,
  PalletIcon,
  PlantIcon,
  PackageIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
  DownloadIcon,
  UploadIcon,
  FileIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  QrIcon,
  MapPinIcon,
  ExportIcon,
  ImportIcon,
  UsersIcon,
  BarChartIcon,
  WarehouseIcon,
  ScaleIcon,
  CalendarIcon,
  TagIcon,
  TruckIcon,
  RefreshIcon
} from '../../shared/components/svg-icons/svg-icons';

@Component({
  selector: 'app-production-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SVG Icons
    SearchIcon,
    FilterIcon,
    XCircleIcon,
    CheckCircleIcon,
    AlertIcon,
    PalletIcon,
    PlantIcon,
    PackageIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    PlusIcon,
    DownloadIcon,
    UploadIcon,
    FileIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    QrIcon,
    MapPinIcon,
    ExportIcon,
    ImportIcon,
    UsersIcon,
    BarChartIcon,
    WarehouseIcon,
    ScaleIcon,
    CalendarIcon,
    TagIcon,
    TruckIcon,
    RefreshIcon
  ],
  templateUrl: './production-stock.html',
  styleUrls: ['./production-stock.scss']
})
export class ProductionStockComponent implements OnInit {
  // Data
  productions: Production[] = [];
  stocks: Stock[] = [];
  filteredProductions: Production[] = [];
  filteredStocks: Stock[] = [];
  stockMovements: StockMovement[] = [];
  farmers: Farmer[] = [];
  
  // Selected items
  selectedProduction: Production | null = null;
  selectedStock: Stock | null = null;
  
  // Active view
  activeView: 'production' | 'stock' = 'production';
  
  // Filters
  productionFilters: ProductionFilters = {};
  stockFilters: StockFilters = {};
  searchQuery: string = '';
  
  // Modals
  showAddProductionModal: boolean = false;
  showEditProductionModal: boolean = false;
  showViewProductionModal: boolean = false;
  showDeleteProductionModal: boolean = false;
  showAddStockModal: boolean = false;
  showEditStockModal: boolean = false;
  showViewStockModal: boolean = false;
  showDeleteStockModal: boolean = false;
  showStockMovementModal: boolean = false;
  showFiltersModal: boolean = false;
  showImportModal: boolean = false;
  showExportModal: boolean = false;
  
  // Forms
  productionForm: FormGroup;
  stockForm: FormGroup;
  movementForm: FormGroup;
  
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
  productionStats: any = {
    totalProductions: 0,
    totalQuantity: 0,
    approvedProductions: 0,
    pendingProductions: 0,
    totalValue: 0
  };
  
  stockStats: any = {
    totalStockItems: 0,
    totalStockValue: 0,
    totalQuantity: 0,
    lowStockItems: 0,
    expiringSoon: 0
  };

  // Available options
  productTypes: string[] = ['Maize', 'Rice', 'Cassava', 'Yam', 'Wheat', 'Sorghum', 'Millet', 'Soybeans', 'Vegetables', 'Fruits'];
  qualityGrades: string[] = ['A', 'B', 'C', 'D'];
  seasons: string[] = ['planting', 'harvest', 'dry', 'rainy'];
  statuses: string[] = ['pending', 'approved', 'rejected', 'processed'];
  units: string[] = ['kg', 'tons', 'bags', 'crates'];
  categories: string[] = ['grains', 'tubers', 'vegetables', 'fruits', 'others'];
  qualityStatuses: string[] = ['fresh', 'good', 'average', 'low', 'expired'];
  movementTypes: string[] = ['incoming', 'outgoing', 'transfer', 'wastage'];
  warehouses: string[] = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Cold Storage'];

  constructor(
    private productionService: ProductionService,
    private farmerService: FarmerService,
    private fb: FormBuilder
  ) {
    this.productionForm = this.fb.group({
      farmerId: ['', Validators.required],
      productType: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['kg', Validators.required],
      qualityGrade: ['A', Validators.required],
      season: ['harvest', Validators.required],
      harvestDate: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      notes: [''],
      price: [0, Validators.min(0)],
      location: this.fb.group({
        farmLocation: [''],
        coordinates: this.fb.group({
          lat: [0],
          lng: [0]
        })
      })
    });

    this.stockForm = this.fb.group({
      productType: ['', Validators.required],
      productName: ['', Validators.required],
      category: ['grains', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['kg', Validators.required],
      warehouseLocation: ['', Validators.required],
      shelfLife: [''],
      minStockLevel: [0, [Validators.required, Validators.min(0)]],
      maxStockLevel: [0, [Validators.required, Validators.min(0)]],
      supplier: [''],
      batchNumber: [''],
      storageConditions: this.fb.group({
        temperature: [''],
        humidity: [''],
        specialNotes: ['']
      }),
      value: [0, Validators.min(0)]
    });

    this.movementForm = this.fb.group({
      stockId: ['', Validators.required],
      productType: ['', Validators.required],
      movementType: ['incoming', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['kg', Validators.required],
      fromLocation: [''],
      toLocation: [''],
      reason: [''],
      referenceNumber: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadProductions();
    this.loadStocks();
    this.loadFarmers();
    this.loadStatistics();
  }

  loadProductions(): void {
    this.isLoading = true;
    this.productionService.getProductions(this.productionFilters).subscribe({
      next: (productions) => {
        this.productions = productions;
        this.filteredProductions = [...productions];
        this.totalItems = productions.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading productions:', error);
        this.isLoading = false;
      }
    });
  }

  loadStocks(): void {
    this.isLoading = true;
    this.productionService.getStocks(this.stockFilters).subscribe({
      next: (stocks) => {
        this.stocks = stocks;
        this.filteredStocks = [...stocks];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading stocks:', error);
        this.isLoading = false;
      }
    });
  }

  loadFarmers(): void {
    this.farmerService.getFarmers().subscribe({
      next: (farmers) => {
        this.farmers = farmers;
      },
      error: (error) => {
        console.error('Error loading farmers:', error);
      }
    });
  }

  loadStatistics(): void {
    this.productionService.getProductionStats().subscribe({
      next: (stats) => {
        this.productionStats = stats;
      },
      error: (error) => {
        console.error('Error loading production stats:', error);
      }
    });

    this.productionService.getStockStats().subscribe({
      next: (stats) => {
        this.stockStats = stats;
      },
      error: (error) => {
        console.error('Error loading stock stats:', error);
      }
    });
  }

  // View switching
  switchView(view: 'production' | 'stock'): void {
    this.activeView = view;
    this.currentPage = 1;
    this.searchQuery = '';
    this.productionFilters = {};
    this.stockFilters = {};
    
    if (view === 'production') {
      this.loadProductions();
    } else {
      this.loadStocks();
    }
  }

  // Production methods
  openAddProductionModal(): void {
    this.productionForm.reset({
      unit: 'kg',
      qualityGrade: 'A',
      season: 'harvest'
    });
    this.showAddProductionModal = true;
  }

  openEditProductionModal(production: Production): void {
    this.selectedProduction = production;
    this.productionForm.patchValue({
      ...production,
      harvestDate: production.harvestDate ? this.formatDateForInput(production.harvestDate) : '',
      deliveryDate: production.deliveryDate ? this.formatDateForInput(production.deliveryDate) : ''
    });
    this.showEditProductionModal = true;
  }

  openViewProductionModal(production: Production): void {
    this.selectedProduction = production;
    this.showViewProductionModal = true;
  }

  openDeleteProductionModal(production: Production): void {
    this.selectedProduction = production;
    this.showDeleteProductionModal = true;
  }

  addProduction(): void {
    if (this.productionForm.invalid) return;

    const productionData = this.productionForm.value;
    productionData.farmerName = this.getFarmerName(productionData.farmerId);
    productionData.harvestDate = new Date(productionData.harvestDate);
    productionData.deliveryDate = new Date(productionData.deliveryDate);
    productionData.status = 'pending';
    
    this.isLoading = true;
    this.productionService.createProduction(productionData).subscribe({
      next: () => {
        this.loadProductions();
        this.loadStatistics();
        this.showAddProductionModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding production:', error);
        this.isLoading = false;
      }
    });
  }

  updateProduction(): void {
    if (this.productionForm.invalid || !this.selectedProduction) return;

    const updates = this.productionForm.value;
    updates.harvestDate = new Date(updates.harvestDate);
    updates.deliveryDate = new Date(updates.deliveryDate);
    
    this.isLoading = true;
    this.productionService.updateProduction(this.selectedProduction.id, updates).subscribe({
      next: () => {
        this.loadProductions();
        this.loadStatistics();
        this.showEditProductionModal = false;
        this.selectedProduction = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating production:', error);
        this.isLoading = false;
      }
    });
  }

  deleteProduction(): void {
    if (!this.selectedProduction) return;

    this.isLoading = true;
    this.productionService.deleteProduction(this.selectedProduction.id).subscribe({
      next: () => {
        this.loadProductions();
        this.loadStatistics();
        this.showDeleteProductionModal = false;
        this.selectedProduction = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting production:', error);
        this.isLoading = false;
      }
    });
  }

  // Stock methods
  openAddStockModal(): void {
    this.stockForm.reset({
      category: 'grains',
      unit: 'kg',
      qualityStatus: 'fresh'
    });
    this.showAddStockModal = true;
  }

  openEditStockModal(stock: Stock): void {
    this.selectedStock = stock;
    this.stockForm.patchValue({
      ...stock,
      shelfLife: stock.shelfLife ? this.formatDateForInput(stock.shelfLife) : ''
    });
    this.showEditStockModal = true;
  }

  openViewStockModal(stock: Stock): void {
    this.selectedStock = stock;
    this.productionService.getStockMovements(stock.id).subscribe({
      next: (movements) => {
        this.stockMovements = movements;
      },
      error: (error) => {
        console.error('Error loading stock movements:', error);
      }
    });
    this.showViewStockModal = true;
  }

  openDeleteStockModal(stock: Stock): void {
    this.selectedStock = stock;
    this.showDeleteStockModal = true;
  }

  openStockMovementModal(stock: Stock): void {
    this.selectedStock = stock;
    this.movementForm.reset({
      stockId: stock.id,
      productType: stock.productType,
      unit: stock.unit,
      movementType: 'incoming'
    });
    this.showStockMovementModal = true;
  }

  // Add these helper methods
get today(): string {
  return new Date().toISOString().split('T')[0];
}

getDaysAgo(date: Date | string): number {
  if (!date) return 0;
  const deliveryDate = new Date(date);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - deliveryDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

getDaysUntil(date: Date | string): number {
  if (!date) return 0;
  const shelfDate = new Date(date);
  const today = new Date();
  const diffTime = Math.abs(shelfDate.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

  addStock(): void {
    if (this.stockForm.invalid) return;

    const stockData = this.stockForm.value;
    stockData.shelfLife = stockData.shelfLife ? new Date(stockData.shelfLife) : undefined;
    stockData.lastUpdated = new Date();
    stockData.qualityStatus = 'fresh';
    
    this.isLoading = true;
    // Note: In a real app, you'd have a createStock method
    // For now, we'll simulate by updating existing stock
    this.loadStocks();
    this.showAddStockModal = false;
    this.isLoading = false;
  }

  updateStock(): void {
    if (this.stockForm.invalid || !this.selectedStock) return;

    const updates = this.stockForm.value;
    updates.shelfLife = updates.shelfLife ? new Date(updates.shelfLife) : undefined;
    
    this.isLoading = true;
    this.productionService.updateStock(this.selectedStock.id, updates).subscribe({
      next: () => {
        this.loadStocks();
        this.loadStatistics();
        this.showEditStockModal = false;
        this.selectedStock = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating stock:', error);
        this.isLoading = false;
      }
    });
  }

  deleteStock(): void {
    // Note: In a real app, you'd have a deleteStock method
    // For now, we'll just close the modal
    this.showDeleteStockModal = false;
    this.selectedStock = null;
  }

  recordMovement(): void {
    if (this.movementForm.invalid || !this.selectedStock) return;

    const movementData = this.movementForm.value;
    movementData.createdBy = 'Admin User';
    
    this.isLoading = true;
    this.productionService.recordStockMovement(movementData).subscribe({
      next: () => {
        // Update stock quantity based on movement type
        const quantityChange = movementData.movementType === 'incoming' 
          ? movementData.quantity 
          : -movementData.quantity;
        
        const updatedQuantity = Math.max(0, this.selectedStock!.quantity + quantityChange);
        
        this.productionService.updateStock(this.selectedStock!.id, {
          quantity: updatedQuantity,
          lastUpdated: new Date()
        }).subscribe({
          next: () => {
            this.loadStocks();
            this.loadStatistics();
            this.showStockMovementModal = false;
            this.selectedStock = null;
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error recording movement:', error);
        this.isLoading = false;
      }
    });
  }

  // Helper methods
  getFarmerName(farmerId: string): string {
    const farmer = this.farmers.find(f => f.id === farmerId);
    return farmer ? `${farmer.firstName} ${farmer.lastName}` : 'Unknown Farmer';
  }

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

  formatCurrency(amount: number): string {
    return `₦${amount.toLocaleString()}`;
  }

  formatQuantity(quantity: number, unit: string): string {
    return `${quantity.toLocaleString()} ${unit}`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'status-active';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-suspended';
      case 'processed': return 'status-processed';
      default: return 'status-unknown';
    }
  }

  getQualityClass(grade: string): string {
    switch (grade) {
      case 'A': return 'quality-excellent';
      case 'B': return 'quality-good';
      case 'C': return 'quality-average';
      case 'D': return 'quality-poor';
      default: return 'quality-unknown';
    }
  }

  getStockStatusClass(status: string): string {
    switch (status) {
      case 'fresh': return 'stock-fresh';
      case 'good': return 'stock-good';
      case 'average': return 'stock-average';
      case 'low': return 'stock-low';
      case 'expired': return 'stock-expired';
      default: return 'stock-unknown';
    }
  }

  getStockLevelClass(stock: Stock): string {
    const percentage = (stock.quantity / stock.maxStockLevel) * 100;
    if (percentage <= 20) return 'level-critical';
    if (percentage <= 40) return 'level-low';
    if (percentage <= 70) return 'level-medium';
    return 'level-good';
  }

  // Search and filtering
  onSearch(): void {
    this.currentPage = 1;
    if (this.activeView === 'production') {
      this.loadProductions();
    } else {
      this.loadStocks();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  applyFilters(): void {
    this.currentPage = 1;
    if (this.activeView === 'production') {
      this.loadProductions();
    } else {
      this.loadStocks();
    }
    this.showFiltersModal = false;
  }

  clearFilters(): void {
    this.productionFilters = {};
    this.stockFilters = {};
    this.applyFilters();
  }

  // Pagination
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredProductions = this.productions.slice(startIndex, endIndex);
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

  // Modal close
  closeModal(): void {
    this.showAddProductionModal = false;
    this.showEditProductionModal = false;
    this.showViewProductionModal = false;
    this.showDeleteProductionModal = false;
    this.showAddStockModal = false;
    this.showEditStockModal = false;
    this.showViewStockModal = false;
    this.showDeleteStockModal = false;
    this.showStockMovementModal = false;
    this.showFiltersModal = false;
    this.showImportModal = false;
    this.showExportModal = false;
    this.selectedProduction = null;
    this.selectedStock = null;
    this.isDragover = false;
  }
}