// src/app/features/reports/reports.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../core/services/reports';
import { 
  Report, 
  ReportType, 
  ReportTemplate, 
  CustomReportRequest,
  ReportFilters 
} from '../../../core/models/reports';

// SVG Icons
import { 
  ReportsIcon,
  DownloadIcon,
  UploadIcon,
  FileIcon,
  SearchIcon,
  XCircleIcon,
  CheckCircleIcon,
  AlertIcon,
  ClockIcon,
  PlusIcon,
  CreditCardIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  BarChartIcon,
  PieChartIcon,
  LineChartIcon,
  UsersIcon,
  PalletIcon,
  CreditIcon,
  SalesIcon,
  SettingsIcon
} from '../../../shared/components/svg-icons/svg-icons';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // SVG Icons
    ReportsIcon,
    DownloadIcon,
    UploadIcon,
    FileIcon,
    SearchIcon,
    XCircleIcon,
    CheckCircleIcon,
    AlertIcon,
    ClockIcon,
    PlusIcon,
    CreditCardIcon,
    FilterIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    CalendarIcon,
    BarChartIcon,
    PieChartIcon,
    LineChartIcon,
    UsersIcon,
    PalletIcon,
    CreditIcon,
    SalesIcon,
    SettingsIcon
  ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class ReportsComponent implements OnInit {
  // Data
  reports: Report[] = [];
  filteredReports: Report[] = [];
  templates: ReportTemplate[] = [];
  selectedReport: Report | null = null;
  
  // Filters
  searchQuery: string = '';
  typeFilter: string = 'all';
  statusFilter: string = 'all';
  formatFilter: string = 'all';
  
  // Modals
  showGenerateModal: boolean = false;
  showCustomModal: boolean = false;
  showViewModal: boolean = false;
  showDeleteModal: boolean = false;
  showScheduleModal: boolean = false;
  showFiltersModal: boolean = false;
  showTemplatesModal: boolean = false;
  
  // Forms
  selectedTemplate: string = '';
  selectedFrequency: string = 'weekly';
  customReportRequest: CustomReportRequest = {
    name: '',
    description: '',
    dateRange: {
      start: new Date(new Date().getFullYear(), 0, 1),
      end: new Date()
    },
    filters: {},
    metrics: [],
    visualizations: [],
    format: 'pdf',
    includeCharts: true,
    includeTables: true,
    includeRawData: false
  };
  
  // Loading states
  isLoading: boolean = false;
  isGenerating: boolean = false;
  isScheduling: boolean = false;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;
  
  // Statistics
  stats: any = {
    total: 0,
    generated: 0,
    pending: 0,
    scheduled: 0,
    custom: 0,
    totalFileSize: 0
  };

  // Date filters
  dateRange = {
    start: '',
    end: ''
  };

  // Available report types
  reportTypes: { value: ReportType, label: string, icon: string }[] = [
    { value: 'production-summary', label: 'Production Summary', icon: 'pallet' },
    { value: 'financial-statement', label: 'Financial Statement', icon: 'credit' },
    { value: 'farmer-performance', label: 'Farmer Performance', icon: 'users' },
    { value: 'stock-movement', label: 'Stock Movement', icon: 'pallet' },
    { value: 'credit-portfolio', label: 'Credit Portfolio', icon: 'credit-card' },
    { value: 'sales-analysis', label: 'Sales Analysis', icon: 'sales' },
    { value: 'disease-report', label: 'Disease Report', icon: 'alert' },
    { value: 'payment-history', label: 'Payment History', icon: 'clock' },
    { value: 'membership-report', label: 'Membership Report', icon: 'users' },
    { value: 'custom', label: 'Custom Report', icon: 'settings' }
  ];

  // Available formats
  formats = [
    { value: 'pdf', label: 'PDF', icon: 'file' },
    { value: 'excel', label: 'Excel', icon: 'file' },
    { value: 'csv', label: 'CSV', icon: 'file' },
    { value: 'html', label: 'HTML', icon: 'file' }
  ];

  // Available frequencies
  frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  // Available visualizations
  visualizations = [
    { value: 'bar-chart', label: 'Bar Chart', icon: 'bar-chart' },
    { value: 'line-chart', label: 'Line Chart', icon: 'line-chart' },
    { value: 'pie-chart', label: 'Pie Chart', icon: 'pie-chart' },
    { value: 'table', label: 'Data Table', icon: 'table' },
    { value: 'summary', label: 'Summary Stats', icon: 'trending-up' }
  ];

  // Available metrics
  availableMetrics = [
    { value: 'production-volume', label: 'Production Volume' },
    { value: 'revenue', label: 'Revenue' },
    { value: 'expenses', label: 'Expenses' },
    { value: 'profit', label: 'Profit' },
    { value: 'farmer-count', label: 'Farmer Count' },
    { value: 'loan-amount', label: 'Loan Amount' },
    { value: 'repayment-rate', label: 'Repayment Rate' },
    { value: 'stock-levels', label: 'Stock Levels' },
    { value: 'sales-volume', label: 'Sales Volume' },
    { value: 'quality-score', label: 'Quality Score' }
  ];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.initializeWithEmptyData();
    this.loadReports();
    this.loadTemplates();
    this.loadStats();
  }

  initializeWithEmptyData(): void {
    // Set default dates
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    
    this.dateRange = {
      start: this.formatDateForInput(firstDayOfYear),
      end: this.formatDateForInput(today)
    };

    this.customReportRequest.dateRange = {
      start: firstDayOfYear,
      end: today
    };
  }

  loadReports(): void {
    this.isLoading = true;
    
    const filters: any = {};
    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.typeFilter !== 'all') filters.type = this.typeFilter;
    if (this.statusFilter !== 'all') filters.status = this.statusFilter;
    if (this.formatFilter !== 'all') filters.format = this.formatFilter;
    
    if (this.dateRange.start && this.dateRange.end) {
      filters.dateRange = {
        start: new Date(this.dateRange.start),
        end: new Date(this.dateRange.end)
      };
    }

    this.reportService.getReports(filters).subscribe({
      next: (reports) => {
        this.reports = reports;
        this.filteredReports = [...reports];
        this.totalItems = reports.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.isLoading = false;
      }
    });
  }

  loadTemplates(): void {
    this.reportService.getReportTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;
      },
      error: (error) => {
        console.error('Error loading templates:', error);
      }
    });
  }

  loadStats(): void {
    this.reportService.getReportStats().subscribe({
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
    this.filteredReports = this.reports.slice(startIndex, endIndex);
  }

  // Search
  onSearch(): void {
    this.currentPage = 1;
    this.loadReports();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  // Filter methods
  applyFilters(): void {
    this.currentPage = 1;
    this.loadReports();
    this.showFiltersModal = false;
  }

  clearFilters(): void {
    this.typeFilter = 'all';
    this.statusFilter = 'all';
    this.formatFilter = 'all';
    this.dateRange = { start: '', end: '' };
    this.applyFilters();
  }

  // Modal methods
  openGenerateModal(templateId?: string): void {
    this.selectedTemplate = templateId || this.templates[0]?.id || '';
    this.showGenerateModal = true;
  }

  openCustomModal(): void {
    // Reset custom report request
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    
    this.customReportRequest = {
      name: '',
      description: '',
      dateRange: {
        start: firstDayOfYear,
        end: today
      },
      filters: {},
      metrics: [],
      visualizations: ['bar-chart', 'table'],
      format: 'pdf',
      includeCharts: true,
      includeTables: true,
      includeRawData: false
    };
    
    this.showCustomModal = true;
  }

  openViewModal(report: Report): void {
    this.selectedReport = report;
    this.showViewModal = true;
  }

  openDeleteModal(report: Report): void {
    this.selectedReport = report;
    this.showDeleteModal = true;
  }

  openScheduleModal(templateId?: string): void {
    this.selectedTemplate = templateId || this.templates[0]?.id || '';
    this.selectedFrequency = 'weekly';
    this.showScheduleModal = true;
  }

  openTemplatesModal(): void {
    this.showTemplatesModal = true;
  }

  // Report actions
  generateReport(): void {
    if (!this.selectedTemplate) return;

    this.isGenerating = true;
    
    this.reportService.generateReport(this.selectedTemplate).subscribe({
      next: (newReport) => {
        this.loadReports();
        this.loadStats();
        this.showGenerateModal = false;
        this.isGenerating = false;
      },
      error: (error) => {
        console.error('Error generating report:', error);
        this.isGenerating = false;
      }
    });
  }

  generateCustomReport(): void {
    if (!this.customReportRequest.name.trim()) return;

    this.isGenerating = true;
    
    this.reportService.generateCustomReport(this.customReportRequest).subscribe({
      next: (newReport) => {
        this.loadReports();
        this.loadStats();
        this.showCustomModal = false;
        this.isGenerating = false;
      },
      error: (error) => {
        console.error('Error generating custom report:', error);
        this.isGenerating = false;
      }
    });
  }

  scheduleReport(): void {
    if (!this.selectedTemplate) return;

    this.isScheduling = true;
    
    this.reportService.scheduleReport(this.selectedTemplate, this.selectedFrequency).subscribe({
      next: (success) => {
        if (success) {
          this.loadStats();
          this.showScheduleModal = false;
        }
        this.isScheduling = false;
      },
      error: (error) => {
        console.error('Error scheduling report:', error);
        this.isScheduling = false;
      }
    });
  }

  downloadReport(report: Report): void {
    this.reportService.downloadReport(report.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.${report.format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading report:', error);
      }
    });
  }

  deleteReport(): void {
    if (!this.selectedReport) return;

    this.isLoading = true;
    this.reportService.deleteReport(this.selectedReport.id).subscribe({
      next: () => {
        this.loadReports();
        this.loadStats();
        this.showDeleteModal = false;
        this.selectedReport = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting report:', error);
        this.isLoading = false;
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getReportTypeLabel(type: ReportType): string {
    const found = this.reportTypes.find(t => t.value === type);
    return found ? found.label : type;
  }

getReportTypeIcon(type: ReportType): string {
  const found = this.reportTypes.find(t => t.value === type);
  return found ? found.icon : 'file';
}

getTypeBadgeClass(type: ReportType): string {
  // Return a CSS class based on report type
  switch (type) {
    case 'production-summary':
      return 'type-badge-production';
    case 'financial-statement':
      return 'type-badge-financial';
    case 'farmer-performance':
      return 'type-badge-farmer';
    case 'credit-portfolio':
      return 'type-badge-credit';
    case 'stock-movement':
      return 'type-badge-stock';
    case 'sales-analysis':
      return 'type-badge-sales';
    case 'disease-report':
      return 'type-badge-disease';
    case 'payment-history':
      return 'type-badge-payment';
    case 'membership-report':
      return 'type-badge-membership';
    case 'custom':
      return 'type-badge-custom';
    default:
      return 'type-badge-default';
  }
}

  getStatusClass(status: string): string {
    switch (status) {
      case 'generated': return 'status-active';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-suspended';
      default: return 'status-inactive';
    }
  }

  getFormatClass(format: string): string {
    switch (format) {
      case 'pdf': return 'format-pdf';
      case 'excel': return 'format-excel';
      case 'csv': return 'format-csv';
      case 'html': return 'format-html';
      default: return 'format-other';
    }
  }

  toggleMetric(metric: string): void {
    const index = this.customReportRequest.metrics.indexOf(metric);
    if (index > -1) {
      this.customReportRequest.metrics.splice(index, 1);
    } else {
      this.customReportRequest.metrics.push(metric);
    }
  }

  toggleVisualization(viz: string): void {
    const index = this.customReportRequest.visualizations.indexOf(viz);
    if (index > -1) {
      this.customReportRequest.visualizations.splice(index, 1);
    } else {
      this.customReportRequest.visualizations.push(viz);
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

  // Add these methods to the ReportsComponent class in reports.component.ts

// Helper method to calculate time ago
getTimeAgo(date: Date | string): string {
  if (!date) return 'N/A';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffDays > 30) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (diffDays > 0) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffMinutes > 0) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  } else {
    return 'Just now';
  }
}

// Helper method to calculate days between dates
getDaysBetween(start: Date | string, end: Date | string): number {
  if (!start || !end) return 0;
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Get selected template name
getSelectedTemplateName(): string {
  const template = this.templates.find(t => t.id === this.selectedTemplate);
  return template ? template.name : 'No template selected';
}

// Get selected template description
getSelectedTemplateDesc(): string {
  const template = this.templates.find(t => t.id === this.selectedTemplate);
  return template ? template.description : '';
}

// Get summary keys from report data
getSummaryKeys(summary: any): string[] {
  if (!summary) return [];
  return Object.keys(summary).filter(key => 
    typeof summary[key] === 'number' || typeof summary[key] === 'string'
  );
}

// Format key for display
formatKey(key: string): string {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/_/g, ' ');
}

// Get next run date for scheduling
getNextRunDate(): string {
  const today = new Date();
  let nextDate: Date;
  
  switch (this.selectedFrequency) {
    case 'daily':
      nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 1);
      break;
    case 'weekly':
      nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 7);
      break;
    case 'monthly':
      nextDate = new Date(today);
      nextDate.setMonth(today.getMonth() + 1);
      break;
    case 'quarterly':
      nextDate = new Date(today);
      nextDate.setMonth(today.getMonth() + 3);
      break;
    default:
      nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 1);
  }
  
  return nextDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Also add this method to format file size properly
getFileSize(size: number): string {
  if (size < 1) {
    return `${(size * 1024).toFixed(0)} KB`;
  } else if (size < 1024) {
    return `${size.toFixed(1)} MB`;
  } else {
    return `${(size / 1024).toFixed(1)} GB`;
  }
}

  // Modal close
  closeModal(): void {
    this.showGenerateModal = false;
    this.showCustomModal = false;
    this.showViewModal = false;
    this.showDeleteModal = false;
    this.showScheduleModal = false;
    this.showFiltersModal = false;
    this.showTemplatesModal = false;
    this.selectedReport = null;
  }
}