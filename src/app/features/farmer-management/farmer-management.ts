import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FarmerService } from '../../core/services/farmer';
import { Farmer, FarmerFilters } from '../../core/models/farmer';

// SVG Icons
import { 
  AddFarmerIcon,
  EditFarmerIcon,
  ViewFarmerIcon,
  DeleteFarmerIcon,
  ExportIcon,
  ImportIcon,
  FilterIcon,
  QrIcon,
  DownloadIcon,
  UploadIcon,
  FileIcon,
  SearchIcon,
  UsersIcon,
  XCircleIcon,
  CheckCircleIcon,
  AlertIcon,
  PalletIcon,
  PlantIcon,
  PhoneIcon,        
  MailIcon,         
  MapPinIcon  
} from '../../shared/components/svg-icons/svg-icons';

@Component({
  selector: 'app-farmer-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // SVG Icons
    AddFarmerIcon,
    EditFarmerIcon,
    ViewFarmerIcon,
    DeleteFarmerIcon,
    ExportIcon,
    ImportIcon,
    FilterIcon,
    QrIcon,
    DownloadIcon,
    UploadIcon,
    FileIcon,
    SearchIcon,
    UsersIcon,
    XCircleIcon,
    CheckCircleIcon,
    AlertIcon,
    PalletIcon,
    PlantIcon,
    PhoneIcon,         
    MailIcon,         
    MapPinIcon  
  ],
  templateUrl: './farmer-management.html',
  styleUrls: ['./farmer-management.scss']
})
export class FarmerManagementComponent implements OnInit {
  // Data
  farmers: Farmer[] = [];
  filteredFarmers: Farmer[] = [];
  selectedFarmer: Farmer | null = null;
  
  // Filters
  filters: FarmerFilters = {};
  searchQuery: string = '';
  statusFilter: string = 'all';
  membershipFilter: string = 'all';
  
  // Modals
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showViewModal: boolean = false;
  showDeleteModal: boolean = false;
  showImportModal: boolean = false;
  showExportModal: boolean = false;
  showFiltersModal: boolean = false;
  
  // Forms
  farmerForm: FormGroup;
  importForm: FormGroup;
  
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
  
  // Export filters
  includeInactive: boolean = false;
  includeFinancial: boolean = true;
  includeProduction: boolean = true;
  
  // Statistics
  stats: any = {
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
    pending: 0,
    totalFarmSize: 0,
    organicCertified: 0
  };

  constructor(
    private farmerService: FarmerService,
    private fb: FormBuilder
  ) {
    this.farmerForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.email]],
  phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
  gender: ['male', Validators.required],
  dateOfBirth: [''],
  identificationNumber: [''],
  address: this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['Nigeria', Validators.required],
    postalCode: ['']
  }),
  farmDetails: this.fb.group({
    farmName: ['', Validators.required],
    farmSize: [0, [Validators.required, Validators.min(0)]],
    farmLocation: ['', Validators.required],
    cropsGrown: [[]],
    farmingExperience: [0, [Validators.min(0)]],
    organicCertified: [false],
    hasIrrigation: [false],
    primaryCrop: ['']
  }),
  membership: this.fb.group({
    status: ['active', Validators.required],
    membershipType: ['regular', Validators.required],
    joinDate: [new Date().toISOString().split('T')[0]],
    notes: ['']
  }),
  bankDetails: this.fb.group({
    bankName: [''],
    accountNumber: [''],
    accountName: [''],
    bvn: ['']
  })
});

    this.importForm = this.fb.group({
      file: [null, Validators.required]
    });
  }
 
ngOnInit(): void {
  // Initialize immediately with empty/default data
  this.initializeWithEmptyData();
  
  // Load real data in background
  this.loadFarmers();
  this.loadStats();
}

initializeWithEmptyData(): void {
  // Set up default/empty farmers array
  this.farmers = this.createEmptyFarmers(5); // Show 5 empty rows
  this.filteredFarmers = [...this.farmers];
  this.totalItems = this.farmers.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.updatePagination();
  
  // Set default stats
  this.stats = {
    total: 0,
    active: 0,
    totalFarmSize: 0,
    organicCertified: 0
  };
}

createEmptyFarmers(count: number): any[] {
  const emptyFarmers = [];
  for (let i = 0; i < count; i++) {
    emptyFarmers.push({
      id: `temp-${i}`,
      registrationNumber: 'Loading...',
      firstName: 'Loading',
      lastName: '...',
      phoneNumber: '...',
      gender: 'other',
      address: {
        street: '...',
        city: '...',
        state: '...',
        country: '...'
      },
      farmDetails: {
        farmName: 'Loading...',
        farmSize: 0,
        farmLocation: '...',
        cropsGrown: [],
        farmingExperience: 0,
        organicCertified: false
      },
      membership: {
        joinDate: new Date(),
        status: 'pending',
        membershipType: 'regular'
      },
      financial: {
        totalCredit: 0,
        totalRepaid: 0,
        outstandingBalance: 0,
        creditScore: 0
      },
      production: {
        totalDeliveries: 0,
        totalWeight: 0,
        averageQuality: 0
      }
    });
  }
  return emptyFarmers;
}

  loadFarmers(): void {
    this.isLoading = true;
    
    // Apply filters if any
    const filters: FarmerFilters = {};
    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.statusFilter !== 'all') filters.status = this.statusFilter;
    if (this.membershipFilter !== 'all') filters.membershipType = this.membershipFilter;
    
    this.farmerService.getFarmers(filters).subscribe({
      next: (farmers) => {
        this.farmers = farmers;
        this.filteredFarmers = [...farmers];
        this.totalItems = farmers.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading farmers:', error);
        this.isLoading = false;
      }
    });
  }

  loadStats(): void {
    this.farmerService.getFarmerStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredFarmers = this.farmers.slice(startIndex, endIndex);
  }

  // Search
  onSearch(): void {
    this.currentPage = 1;
    this.loadFarmers();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  // Filter methods
  applyFilters(): void {
    this.currentPage = 1;
    this.loadFarmers();
    this.showFiltersModal = false;
  }

  clearFilters(): void {
    this.statusFilter = 'all';
    this.membershipFilter = 'all';
    this.filters = {};
    this.applyFilters();
  }

  // Modal methods
  openAddModal(): void {
    this.farmerForm.reset({
      gender: 'male',
      address: { country: 'Nigeria' },
      farmDetails: { organicCertified: false, cropsGrown: [] },
      membership: { status: 'active', membershipType: 'regular' }
    });
    this.showAddModal = true;
  }

  openEditModal(farmer: Farmer): void {
    this.selectedFarmer = farmer;
    this.farmerForm.patchValue({
      ...farmer,
      dateOfBirth: farmer.dateOfBirth ? this.formatDateForInput(farmer.dateOfBirth) : ''
    });
    this.showEditModal = true;
  }

  openViewModal(farmer: Farmer): void {
    this.selectedFarmer = farmer;
    this.showViewModal = true;
  }

  openDeleteModal(farmer: Farmer): void {
    this.selectedFarmer = farmer;
    this.showDeleteModal = true;
  }

  openImportModal(): void {
    this.importForm.reset();
    this.importFile = null;
    this.importResult = null;
    this.importProgress = 0;
    this.showImportModal = true;
  }

  openExportModal(): void {
    this.showExportModal = true;
  }

  // Form submission
  addFarmer(): void {
    if (this.farmerForm.invalid) return;

    const farmerData = this.farmerForm.value;
    farmerData.dateOfBirth = farmerData.dateOfBirth ? new Date(farmerData.dateOfBirth) : undefined;
    
    this.isLoading = true;
    this.farmerService.createFarmer(farmerData).subscribe({
      next: (newFarmer) => {
        this.loadFarmers();
        this.loadStats();
        this.showAddModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding farmer:', error);
        this.isLoading = false;
      }
    });
  }

  updateFarmer(): void {
    if (this.farmerForm.invalid || !this.selectedFarmer) return;

    const updates = this.farmerForm.value;
    updates.dateOfBirth = updates.dateOfBirth ? new Date(updates.dateOfBirth) : undefined;
    
    this.isLoading = true;
    this.farmerService.updateFarmer(this.selectedFarmer.id, updates).subscribe({
      next: (updatedFarmer) => {
        this.loadFarmers();
        this.loadStats();
        this.showEditModal = false;
        this.selectedFarmer = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating farmer:', error);
        this.isLoading = false;
      }
    });
  }

  getEndIndex(): number {
  const end = this.currentPage * this.itemsPerPage;
  return Math.min(end, this.totalItems);
}

// Add these methods to your FarmerManagementComponent class:

viewDocument(doc: any): void {
  console.log('View document:', doc);
  // In a real app, this would open a document viewer
  alert(`Viewing document: ${doc.name}`);
}

downloadDocument(doc: any): void {
  console.log('Download document:', doc);
  // In a real app, this would download the document
  alert(`Downloading document: ${doc.name}`);
}

uploadDocument(farmer: Farmer): void {
  console.log('Upload document for farmer:', farmer);
  // In a real app, this would open a file upload dialog
  alert(`Upload document for ${farmer.firstName} ${farmer.lastName}`);
}

printFarmerDetails(farmer: Farmer): void {
  console.log('Print farmer details:', farmer);
  
  // Create a print-friendly version
  const printContent = `
    <html>
      <head>
        <title>Farmer Details - ${farmer.firstName} ${farmer.lastName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #2d5016; }
          .section { margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
          .label { font-weight: bold; color: #4a7c2a; }
          .value { margin-left: 10px; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Farmer Details</h1>
        
        <div class="section">
          <h2>Personal Information</h2>
          <p><span class="label">Name:</span><span class="value">${farmer.firstName} ${farmer.lastName}</span></p>
          <p><span class="label">Registration Number:</span><span class="value">${farmer.registrationNumber}</span></p>
          <p><span class="label">Phone:</span><span class="value">${farmer.phoneNumber}</span></p>
          ${farmer.email ? `<p><span class="label">Email:</span><span class="value">${farmer.email}</span></p>` : ''}
          <p><span class="label">Gender:</span><span class="value">${farmer.gender}</span></p>
        </div>
        
        <div class="section">
          <h2>Farm Information</h2>
          <p><span class="label">Farm Name:</span><span class="value">${farmer.farmDetails.farmName}</span></p>
          <p><span class="label">Farm Size:</span><span class="value">${farmer.farmDetails.farmSize} hectares</span></p>
          <p><span class="label">Location:</span><span class="value">${farmer.farmDetails.farmLocation}</span></p>
        </div>
        
        <div class="section">
          <h2>Membership Details</h2>
          <p><span class="label">Status:</span><span class="value">${farmer.membership.status}</span></p>
          <p><span class="label">Type:</span><span class="value">${farmer.membership.membershipType}</span></p>
          <p><span class="label">Join Date:</span><span class="value">${this.formatDate(farmer.membership.joinDate)}</span></p>
        </div>
        
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #2d5016; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Print this page
          </button>
        </div>
      </body>
    </html>
  `;
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
  }
}

// Fix for getPageNumbers method - ensure it's properly defined
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

// Add these to your component class in TypeScript:
availableCrops: string[] = [
  'Maize', 'Rice', 'Cassava', 'Yam', 'Wheat', 'Sorghum', 
  'Millet', 'Soybeans', 'Vegetables', 'Fruits', 'Plantain',
  'Potato', 'Tomato', 'Pepper', 'Onion'
];

today: string = new Date().toISOString().split('T')[0];
activeTab: string = 'personal';

// Add these helper methods
calculateAge(dateOfBirth?: Date): number {
  if (!dateOfBirth) return 0;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

onCropChange(event: any, crop: string): void {
  const cropsGrown = this.farmerForm.get('farmDetails.cropsGrown')?.value || [];
  
  if (event.target.checked) {
    cropsGrown.push(crop);
  } else {
    const index = cropsGrown.indexOf(crop);
    if (index > -1) {
      cropsGrown.splice(index, 1);
    }
  }
  
  this.farmerForm.get('farmDetails.cropsGrown')?.setValue(cropsGrown);
}

getPaymentHistory(farmer: Farmer): any[] {
  // Mock payment history
  return [
    { date: '2024-01-15', amount: 500000, status: 'paid' },
    { date: '2023-12-10', amount: 750000, status: 'paid' },
    { date: '2023-11-05', amount: 300000, status: 'paid' },
    { date: '2023-10-20', amount: 1000000, status: 'paid' }
  ];
}

getRecentDeliveries(farmer: Farmer): any[] {
  // Mock recent deliveries
  return [
    { date: '2024-01-20', crop: 'Maize', weight: 1250, quality: 4.5 },
    { date: '2024-01-15', crop: 'Cassava', weight: 850, quality: 4.0 },
    { date: '2024-01-10', crop: 'Rice', weight: 2000, quality: 4.8 },
    { date: '2024-01-05', crop: 'Yam', weight: 950, quality: 4.2 }
  ];
}

getFarmerDocuments(farmer: Farmer): any[] {
  // Mock documents
  return [
    { name: 'ID Card', type: 'Identification', uploadDate: '2024-01-15' },
    { name: 'Passport Photo', type: 'Photo', uploadDate: '2024-01-10' },
    { name: 'Land Certificate', type: 'Legal', uploadDate: '2024-01-05' }
  ];
}

getRandomYield(): number {
  return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
}

getRandomGrade(): string {
  const grades = ['A', 'B', 'C', 'Premium'];
  return grades[Math.floor(Math.random() * grades.length)];
}

  deleteFarmer(): void {
    if (!this.selectedFarmer) return;

    this.isLoading = true;
    this.farmerService.deleteFarmer(this.selectedFarmer.id).subscribe({
      next: () => {
        this.loadFarmers();
        this.loadStats();
        this.showDeleteModal = false;
        this.selectedFarmer = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting farmer:', error);
        this.isLoading = false;
      }
    });
  }

  // Import/Export
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importFile = file;
      this.importForm.patchValue({ file: file });
    }
  }

  importFarmers(): void {
    if (!this.importFile) return;

    this.isImporting = true;
    this.importProgress = 0;

    // Simulate import process
    const interval = setInterval(() => {
      this.importProgress += 10;
      if (this.importProgress >= 100) {
        clearInterval(interval);
        
        // Mock import result
        this.importResult = {
          total: 10,
          success: 8,
          failed: 2,
          errors: [
            { row: 3, error: 'Missing required fields' },
            { row: 7, error: 'Invalid phone number' }
          ]
        };

        // Reload data after import
        setTimeout(() => {
          this.loadFarmers();
          this.loadStats();
          this.isImporting = false;
        }, 500);
      }
    }, 200);
  }

  exportFarmers(): void {
    this.isExporting = true;
    
    // Apply export filters
    const exportFilters: FarmerFilters = {
      ...this.filters
    };
    if (!this.includeInactive) {
      exportFilters.status = 'active';
    }
    
    this.farmerService.exportFarmers(this.exportFormat, exportFilters).subscribe({
      next: (blob) => {
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `farmers_${new Date().toISOString().split('T')[0]}.${
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
        console.error('Error exporting farmers:', error);
        this.isExporting = false;
      }
    });
  }

  // Pagination
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'suspended': return 'status-suspended';
      case 'pending': return 'status-pending';
      default: return 'status-unknown';
    }
  }

  getMembershipClass(type: string): string {
    switch (type) {
      case 'premium': return 'membership-premium';
      case 'regular': return 'membership-regular';
      case 'associate': return 'membership-associate';
      default: return 'membership-unknown';
    }
  }

  getCreditScoreClass(score: number): string {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-good';
    if (score >= 70) return 'score-fair';
    return 'score-poor';
  }

  // Crop display
  getCropsDisplay(crops: string[]): string {
    if (!crops || crops.length === 0) return 'No crops';
    if (crops.length <= 2) return crops.join(', ');
    return `${crops.slice(0, 2).join(', ')} +${crops.length - 2}`;
  }

  // Drag and drop methods
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
      if (file.type.includes('csv') || 
          file.type.includes('excel') || 
          file.type.includes('spreadsheet') ||
          file.name.endsWith('.csv') || 
          file.name.endsWith('.xlsx') || 
          file.name.endsWith('.xls')) {
        this.importFile = file;
        this.importForm.patchValue({ file: file });
      } else {
        alert('Please upload a CSV or Excel file');
      }
    }
  }
 
  // Additional methods for template
  viewQRCode(farmer: Farmer): void {
    this.selectedFarmer = farmer;
    // In a real app, you might open a QR code modal or show it in the view modal
    this.openViewModal(farmer);
  }

  downloadQRCode(farmer: Farmer): void {
    if (!farmer.qrCode) return;
    
    // Create download link for QR code
    const link = document.createElement('a');
    link.href = farmer.qrCode;
    link.download = `qr-code-${farmer.registrationNumber}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getMembershipDuration(joinDate: Date | string): string {
    if (!joinDate) return 'N/A';
    
    const join = new Date(joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - join.getTime());
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

  generateReport(farmer: Farmer): void {
    // Mock report generation
    this.isLoading = true;
    
    setTimeout(() => {
      // Create a simple HTML report
      const reportContent = `
        <html>
          <head>
            <title>Farmer Report - ${farmer.firstName} ${farmer.lastName}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #2d5016; }
              .section { margin-bottom: 30px; }
              .label { font-weight: bold; color: #4a7c2a; }
              .value { margin-left: 10px; }
            </style>
          </head>
          <body>
            <h1>Farmer Report</h1>
            <div class="section">
              <h2>Personal Information</h2>
              <p><span class="label">Name:</span><span class="value">${farmer.firstName} ${farmer.lastName}</span></p>
              <p><span class="label">Registration Number:</span><span class="value">${farmer.registrationNumber}</span></p>
              <p><span class="label">Phone:</span><span class="value">${farmer.phoneNumber}</span></p>
              ${farmer.email ? `<p><span class="label">Email:</span><span class="value">${farmer.email}</span></p>` : ''}
            </div>
            <div class="section">
              <h2>Farm Details</h2>
              <p><span class="label">Farm Name:</span><span class="value">${farmer.farmDetails.farmName}</span></p>
              <p><span class="label">Farm Size:</span><span class="value">${farmer.farmDetails.farmSize} hectares</span></p>
              <p><span class="label">Location:</span><span class="value">${farmer.farmDetails.farmLocation}</span></p>
            </div>
            <div class="section">
              <h2>Financial Summary</h2>
              <p><span class="label">Total Credit:</span><span class="value">₦${farmer.financial.totalCredit.toLocaleString()}</span></p>
              <p><span class="label">Outstanding Balance:</span><span class="value">₦${farmer.financial.outstandingBalance.toLocaleString()}</span></p>
              <p><span class="label">Credit Score:</span><span class="value">${farmer.financial.creditScore}/100</span></p>
            </div>
            <p>Report generated on ${new Date().toLocaleDateString()}</p>
          </body>
        </html>
      `;
      
      // Convert to blob and download
      const blob = new Blob([reportContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `farmer-report-${farmer.registrationNumber}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      this.isLoading = false;
    }, 1000);
  }

  downloadTemplate(): void {
    // Create CSV template
    const templateContent = `First Name,Last Name,Phone Number,Email,Gender,Street Address,City,State,Country,Farm Name,Farm Size,Farm Location,Farming Experience,Organic Certified (true/false),Crops Grown (comma separated)
John,Doe,+2348012345678,john.doe@email.com,Male,123 Farm Road,Lagos,Lagos State,Nigeria,Doe Farms,12.5,Lagos Mainland,8,true,Maize,Cassava,Yam
Jane,Smith,+2348023456789,jane.smith@email.com,Female,456 Harvest Street,Abuja,FCT,Nigeria,Smith Plantation,25.3,Abuja Central,15,false,Rice,Wheat`;
    
    const blob = new Blob([templateContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'farmer-import-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Modal close
  closeModal(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showViewModal = false;
    this.showDeleteModal = false;
    this.showImportModal = false;
    this.showExportModal = false;
    this.showFiltersModal = false;
    this.selectedFarmer = null;
    this.isDragover = false;
  }
}