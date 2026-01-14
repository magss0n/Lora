import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantHealthService } from '../../../core/services/plant-health';
import { 
  PlantHealthIssue, 
  DiseasePattern, 
  TreatmentHistory, 
  PlantHealthStats,
  PlantHealthFilters 
} from '../../../core/models/plant-health';

// SVG Icons
import { 
  AlertIcon,
  CheckCircleIcon,
  XCircleIcon,
  DownloadIcon,
  UploadIcon,
  FileIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  QrIcon,
  MapPinIcon,
  ExportIcon,
  ImportIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  PlusIcon,
  PlantIcon,
  UsersIcon,
  ChartIcon,
  BellIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '../../../shared/components/svg-icons/svg-icons';

@Component({
  selector: 'app-plant-health',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SVG Icons
    AlertIcon,
    CheckCircleIcon,
    XCircleIcon,
    DownloadIcon,
    UploadIcon,
    FileIcon,
    SearchIcon,
    FilterIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    QrIcon,
    MapPinIcon,
    ExportIcon,
    ImportIcon,
    PhoneIcon,
    MailIcon,
    CalendarIcon,
    PlusIcon,
    PlantIcon,
    UsersIcon,
    ChartIcon,
    BellIcon,
    TrendingUpIcon,
    TrendingDownIcon
  ],
  templateUrl: './plant-health.html',
  styleUrls: ['./plant-health.scss']
})
export class PlantHealthComponent implements OnInit {
  // Data
  issues: PlantHealthIssue[] = [];
  filteredIssues: PlantHealthIssue[] = [];
  selectedIssue: PlantHealthIssue | null = null;
  diseasePatterns: DiseasePattern[] = [];
  treatmentHistory: TreatmentHistory[] = [];
  
  // Filters
  filters: PlantHealthFilters = {};
  searchQuery: string = '';
  statusFilter: string = 'all';
  severityFilter: string = 'all';
  cropTypeFilter: string = 'all';
  
  // Modals
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showViewModal: boolean = false;
  showDeleteModal: boolean = false;
  showImportModal: boolean = false;
  showExportModal: boolean = false;
  showFiltersModal: boolean = false;
  showAudioModal: boolean = false;
  showTreatmentModal: boolean = false;
  showPatternsModal: boolean = false;
  
  // Forms
  issueForm: FormGroup;
  treatmentForm: FormGroup;
  audioForm: FormGroup;
  
  // Loading states
  isLoading: boolean = false;
  isExporting: boolean = false;
  isImporting: boolean = false;
  isSendingAudio: boolean = false;
  
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
  includeResolved: boolean = false;
  includeTreatmentHistory: boolean = true;
  includeImages: boolean = false;
  
  // Statistics
  stats: PlantHealthStats = {
    totalReports: 0,
    activeIssues: 0,
    resolvedIssues: 0,
    criticalIssues: 0,
    mostAffectedCrop: '',
    mostCommonDisease: '',
    regionalBreakdown: [],
    weeklyTrend: []
  };

  // Available options
  cropTypes: string[] = ['Maize', 'Rice', 'Cassava', 'Yam', 'Wheat', 'Sorghum', 'Millet', 'Soybeans', 'Vegetables', 'Fruits'];
  diseaseTypes: string[] = ['Maize Streak Virus', 'Rice Blast', 'Cassava Mosaic', 'Yam Anthracnose', 'Northern Corn Leaf Blight', 'Fusarium Wilt'];
  severityLevels = ['low', 'medium', 'high', 'critical'];
  statusOptions = ['reported', 'investigating', 'treatment', 'resolved', 'monitoring'];
  symptomsOptions: string[] = [
    'Yellowing leaves',
    'Stunted growth',
    'Leaf spots',
    'Wilting',
    'Mosaic patterns',
    'Rotting',
    'Lesions',
    'Curling leaves',
    'Necrosis',
    'Premature death'
  ];
  treatments: string[] = [
    'Fungicide Application',
    'Insecticide Spray',
    'Crop Rotation',
    'Remove Infected Plants',
    'Soil Treatment',
    'Biological Control',
    'Resistant Varieties',
    'Proper Irrigation',
    'Nutrient Management',
    'Sanitation'
  ];
  
  // View tabs
  activeTab: string = 'details';
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private plantHealthService: PlantHealthService,
    private fb: FormBuilder
  ) {
    this.issueForm = this.fb.group({
      farmerId: ['', Validators.required],
      farmerName: ['', Validators.required],
      farmerPhone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      location: this.fb.group({
        farmName: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
      }),
      cropType: ['', Validators.required],
      affectedArea: [0, [Validators.required, Validators.min(0)]],
      diseaseType: ['', Validators.required],
      diseaseSeverity: ['medium', Validators.required],
      symptoms: [[]],
      dateReported: [this.today],
      images: [[]],
      status: ['reported', Validators.required],
      treatment: this.fb.group({
        recommended: [''],
        applied: [''],
        dateApplied: [''],
        effectiveness: [0]
      }),
      inspectorNotes: [''],
      followUpDate: [''],
      preventiveMeasures: [[]]
    });

    this.treatmentForm = this.fb.group({
      treatmentType: ['', Validators.required],
      dateApplied: [this.today, Validators.required],
      appliedBy: ['', Validators.required],
      effectiveness: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      notes: ['']
    });

    this.audioForm = this.fb.group({
      message: ['', Validators.required],
      language: ['english', Validators.required],
      includePreventionTips: [true],
      includeTreatmentInfo: [true],
      scheduleFor: ['immediate']
    });
  }

  ngOnInit(): void {
    this.initializeWithEmptyData();
    this.loadIssues();
    this.loadStats();
    this.loadDiseasePatterns();
  }

  initializeWithEmptyData(): void {
    this.issues = this.createEmptyIssues(5);
    this.filteredIssues = [...this.issues];
    this.totalItems = this.issues.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePagination();
    
    this.stats = {
      totalReports: 0,
      activeIssues: 0,
      resolvedIssues: 0,
      criticalIssues: 0,
      mostAffectedCrop: '',
      mostCommonDisease: '',
      regionalBreakdown: [],
      weeklyTrend: []
    };
  }

  createEmptyIssues(count: number): any[] {
    const emptyIssues = [];
    for (let i = 0; i < count; i++) {
      emptyIssues.push({
        id: `temp-${i}`,
        reportNumber: 'Loading...',
        farmerName: 'Loading...',
        farmerPhone: '...',
        location: {
          farmName: '...',
          city: '...',
          state: '...'
        },
        cropType: '...',
        affectedArea: 0,
        diseaseType: '...',
        diseaseSeverity: 'low',
        symptoms: [],
        dateReported: new Date(),
        status: 'reported',
        treatment: {
          recommended: ''
        }
      });
    }
    return emptyIssues;
  }

  loadIssues(): void {
    this.isLoading = true;
    
    const filters: PlantHealthFilters = {};
    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.statusFilter !== 'all') filters.status = this.statusFilter;
    if (this.severityFilter !== 'all') filters.severity = this.severityFilter;
    if (this.cropTypeFilter !== 'all') filters.cropType = this.cropTypeFilter;

    this.plantHealthService.getIssues(filters).subscribe({
      next: (issues) => {
        this.issues = issues;
        this.filteredIssues = [...issues];
        this.totalItems = issues.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading issues:', error);
        this.isLoading = false;
      }
    });
  }

  // Add these properties
startDate: string = '';
endDate: string = '';

// Add these methods
onStartDateChange(event: any): void {
  this.startDate = event.target.value;
  this.updateDateRange();
}

onEndDateChange(event: any): void {
  this.endDate = event.target.value;
  this.updateDateRange();
}

updateDateRange(): void {
  if (!this.filters.dateRange) {
    this.filters.dateRange = {
      start: null,
      end: null
    };
  }
  
  if (this.startDate) {
    this.filters.dateRange.start = new Date(this.startDate);
  } else {
    this.filters.dateRange.start = null;
  }
  
  if (this.endDate) {
    this.filters.dateRange.end = new Date(this.endDate);
  } else {
    this.filters.dateRange.end = null;
  }
}

// Update clearFilters method
clearFilters(): void {
  this.statusFilter = 'all';
  this.severityFilter = 'all';
  this.cropTypeFilter = 'all';
  this.startDate = '';
  this.endDate = '';
  this.filters = {};
  this.applyFilters();
}

  loadStats(): void {
    this.plantHealthService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  loadDiseasePatterns(): void {
    this.plantHealthService.getDiseasePatterns().subscribe({
      next: (patterns) => {
        this.diseasePatterns = patterns;
      },
      error: (error) => {
        console.error('Error loading disease patterns:', error);
      }
    });
  }

  loadTreatmentHistory(issueId: string): void {
    this.plantHealthService.getTreatmentHistory(issueId).subscribe({
      next: (history) => {
        this.treatmentHistory = history;
      },
      error: (error) => {
        console.error('Error loading treatment history:', error);
      }
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredIssues = this.issues.slice(startIndex, endIndex);
  }

  // Search and Filter methods
  onSearch(): void {
    this.currentPage = 1;
    this.loadIssues();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadIssues();
    this.showFiltersModal = false;
  }
 
  // Modal methods
  openAddModal(): void {
    this.issueForm.reset({
      diseaseSeverity: 'medium',
      status: 'reported',
      dateReported: this.today,
      symptoms: [],
      preventiveMeasures: [],
      treatment: {
        recommended: '',
        effectiveness: 0
      }
    });
    this.showAddModal = true;
  }

  openEditModal(issue: PlantHealthIssue): void {
    this.selectedIssue = issue;
    this.issueForm.patchValue({
      ...issue,
      dateReported: this.formatDateForInput(issue.dateReported),
      followUpDate: issue.followUpDate ? this.formatDateForInput(issue.followUpDate) : '',
      treatment: {
        ...issue.treatment,
        dateApplied: issue.treatment.dateApplied ? this.formatDateForInput(issue.treatment.dateApplied) : ''
      }
    });
    this.showEditModal = true;
  }

  openViewModal(issue: PlantHealthIssue): void {
    this.selectedIssue = issue;
    this.activeTab = 'details';
    this.loadTreatmentHistory(issue.id);
    this.showViewModal = true;
  }

  openDeleteModal(issue: PlantHealthIssue): void {
    this.selectedIssue = issue;
    this.showDeleteModal = true;
  }

  openTreatmentModal(issue: PlantHealthIssue): void {
    this.selectedIssue = issue;
    this.treatmentForm.reset({
      dateApplied: this.today,
      effectiveness: 3,
      appliedBy: 'Agro Inspector'
    });
    this.showTreatmentModal = true;
  }

  openAudioModal(issue: PlantHealthIssue): void {
    this.selectedIssue = issue;
    this.audioForm.reset({
      message: `Alert: ${issue.diseaseType} detected in your ${issue.cropType} crop. Please check your farm.`,
      language: 'english',
      includePreventionTips: true,
      includeTreatmentInfo: true,
      scheduleFor: 'immediate'
    });
    this.showAudioModal = true;
  }

  openPatternsModal(): void {
    this.showPatternsModal = true;
  }

  openImportModal(): void {
    this.importFile = null;
    this.importResult = null;
    this.importProgress = 0;
    this.showImportModal = true;
  }

  openExportModal(): void {
    this.showExportModal = true;
  }

  // Form submission methods
  addIssue(): void {
    if (this.issueForm.invalid) return;

    const issueData = this.issueForm.value;
    issueData.dateReported = new Date(issueData.dateReported);
    if (issueData.followUpDate) {
      issueData.followUpDate = new Date(issueData.followUpDate);
    }
    if (issueData.treatment.dateApplied) {
      issueData.treatment.dateApplied = new Date(issueData.treatment.dateApplied);
    }

    this.isLoading = true;
    this.plantHealthService.createIssue(issueData).subscribe({
      next: (newIssue) => {
        this.loadIssues();
        this.loadStats();
        this.showAddModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding issue:', error);
        this.isLoading = false;
      }
    });
  }

  updateIssue(): void {
    if (this.issueForm.invalid || !this.selectedIssue) return;

    const updates = this.issueForm.value;
    updates.dateReported = new Date(updates.dateReported);
    if (updates.followUpDate) {
      updates.followUpDate = new Date(updates.followUpDate);
    }
    if (updates.treatment.dateApplied) {
      updates.treatment.dateApplied = new Date(updates.treatment.dateApplied);
    }

    this.isLoading = true;
    this.plantHealthService.updateIssue(this.selectedIssue.id, updates).subscribe({
      next: (updatedIssue) => {
        this.loadIssues();
        this.loadStats();
        this.showEditModal = false;
        this.selectedIssue = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating issue:', error);
        this.isLoading = false;
      }
    });
  }

  addTreatment(): void {
    if (this.treatmentForm.invalid || !this.selectedIssue) return;

    const treatmentData = this.treatmentForm.value;
    treatmentData.dateApplied = new Date(treatmentData.dateApplied);
    treatmentData.issueId = this.selectedIssue.id;

    // In a real app, this would be an API call
    console.log('Adding treatment:', treatmentData);
    
    // Update the issue with new treatment
    const updates = {
      treatment: {
        ...this.selectedIssue.treatment,
        applied: treatmentData.treatmentType,
        dateApplied: treatmentData.dateApplied,
        effectiveness: treatmentData.effectiveness
      },
      status: 'treatment' as const
    };

    this.isLoading = true;
    this.plantHealthService.updateIssue(this.selectedIssue.id, updates).subscribe({
      next: () => {
        this.loadIssues();
        this.showTreatmentModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding treatment:', error);
        this.isLoading = false;
      }
    });
  }

  sendAudioAlert(): void {
    if (this.audioForm.invalid || !this.selectedIssue) return;

    this.isSendingAudio = true;
    this.plantHealthService.sendAudioAlert(this.selectedIssue.id, this.audioForm.value.message).subscribe({
      next: (success) => {
        if (success) {
          // Update issue to show alert was sent
          this.plantHealthService.updateIssue(this.selectedIssue!.id, { audioAlertSent: true }).subscribe(() => {
            this.loadIssues();
          });
        }
        this.showAudioModal = false;
        this.isSendingAudio = false;
      },
      error: (error) => {
        console.error('Error sending audio alert:', error);
        this.isSendingAudio = false;
      }
    });
  }

  deleteIssue(): void {
    if (!this.selectedIssue) return;

    this.isLoading = true;
    this.plantHealthService.deleteIssue(this.selectedIssue.id).subscribe({
      next: () => {
        this.loadIssues();
        this.loadStats();
        this.showDeleteModal = false;
        this.selectedIssue = null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting issue:', error);
        this.isLoading = false;
      }
    });
  }

  // Import/Export methods
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importFile = file;
    }
  }

  importIssues(): void {
    if (!this.importFile) return;

    this.isImporting = true;
    this.importProgress = 0;

    // Simulate import progress
    const interval = setInterval(() => {
      this.importProgress += 10;
      if (this.importProgress >= 100) {
        clearInterval(interval);
        this.importResult = {
          total: 10,
          success: 8,
          failed: 2,
          errors: [
            { row: 3, error: 'Invalid crop type' },
            { row: 7, error: 'Missing required fields' }
          ]
        };

        setTimeout(() => {
          this.loadIssues();
          this.loadStats();
          this.isImporting = false;
        }, 500);
      }
    }, 200);
  }

  exportIssues(): void {
    this.isExporting = true;
    
    // Mock export
    setTimeout(() => {
      const blob = new Blob(['Mock export data'], {
        type: this.exportFormat === 'excel' ? 'application/vnd.ms-excel' :
               this.exportFormat === 'pdf' ? 'application/pdf' :
               'text/csv'
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plant-health-issues_${new Date().toISOString().split('T')[0]}.${
        this.exportFormat === 'excel' ? 'xlsx' :
        this.exportFormat === 'pdf' ? 'pdf' : 'csv'
      }`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      this.isExporting = false;
      this.showExportModal = false;
    }, 1000);
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

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'low': return 'severity-low';
      case 'medium': return 'severity-medium';
      case 'high': return 'severity-high';
      case 'critical': return 'severity-critical';
      default: return 'severity-unknown';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'reported': return 'status-reported';
      case 'investigating': return 'status-investigating';
      case 'treatment': return 'status-treatment';
      case 'resolved': return 'status-resolved';
      case 'monitoring': return 'status-monitoring';
      default: return 'status-unknown';
    }
  }

  getCropClass(crop: string): string {
    const cropClasses: Record<string, string> = {
      'Maize': 'crop-maize',
      'Rice': 'crop-rice',
      'Cassava': 'crop-cassava',
      'Yam': 'crop-yam',
      'Wheat': 'crop-wheat',
      'Sorghum': 'crop-sorghum',
      'Millet': 'crop-millet',
      'Soybeans': 'crop-soybeans',
      'Vegetables': 'crop-vegetables',
      'Fruits': 'crop-fruits'
    };
    return cropClasses[crop] || 'crop-other';
  }

  getDiseaseClass(disease: string): string {
    const diseaseClasses: Record<string, string> = {
      'Maize Streak Virus': 'disease-maize-streak',
      'Rice Blast': 'disease-rice-blast',
      'Cassava Mosaic': 'disease-cassava-mosaic',
      'Yam Anthracnose': 'disease-yam-anthracnose',
      'Northern Corn Leaf Blight': 'disease-corn-blight',
      'Fusarium Wilt': 'disease-fusarium-wilt'
    };
    return diseaseClasses[disease] || 'disease-other';
  }

  // Symptom and treatment selection
  onSymptomChange(event: any, symptom: string): void {
    const symptoms = this.issueForm.get('symptoms')?.value || [];
    
    if (event.target.checked) {
      symptoms.push(symptom);
    } else {
      const index = symptoms.indexOf(symptom);
      if (index > -1) {
        symptoms.splice(index, 1);
      }
    }
    
    this.issueForm.get('symptoms')?.setValue(symptoms);
  }

  onPreventionChange(event: any, measure: string): void {
    const measures = this.issueForm.get('preventiveMeasures')?.value || [];
    
    if (event.target.checked) {
      measures.push(measure);
    } else {
      const index = measures.indexOf(measure);
      if (index > -1) {
        measures.splice(index, 1);
      }
    }
    
    this.issueForm.get('preventiveMeasures')?.setValue(measures);
  }

  // View modal helpers
  getEffectivenessStars(effectiveness: number): string[] {
    return Array(5).fill('').map((_, i) => i < effectiveness ? 'star-filled' : 'star-empty');
  }

  getRiskClass(risk: string): string {
    switch (risk) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      case 'critical': return 'risk-critical';
      default: return 'risk-unknown';
    }
  }

  downloadTemplate(): void {
    const templateContent = `Report Date,Farmer Name,Farmer Phone,Farm Name,City,State,Crop Type,Affected Area (ha),Disease Type,Severity,Symptoms,Status,Recommended Treatment
2024-01-15,Chinedu Okoro,+2348012345678,Okoro Family Farms,Enugu,Enugu State,Maize,2.5,Maize Streak Virus,high,"Yellow streaks,Stunted growth",reported,"Apply insecticides,Remove infected plants"`;

    const blob = new Blob([templateContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plant-health-import-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  printReport(issue: PlantHealthIssue): void {
    const printContent = `
      <html>
        <head>
          <title>Plant Health Report - ${issue.reportNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #2d5016; }
            .section { margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
            .label { font-weight: bold; color: #4a7c2a; }
            .value { margin-left: 10px; }
            .severity-${issue.diseaseSeverity} { 
              padding: 4px 8px; 
              border-radius: 12px; 
              font-weight: bold; 
              color: white; 
            }
            .severity-critical { background: #c44536; }
            .severity-high { background: #e6a700; }
            .severity-medium { background: #3d7ea6; }
            .severity-low { background: #3a7d34; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Plant Health Inspection Report</h1>
          
          <div class="section">
            <h2>Report Information</h2>
            <p><span class="label">Report Number:</span><span class="value">${issue.reportNumber}</span></p>
            <p><span class="label">Date Reported:</span><span class="value">${this.formatDate(issue.dateReported)}</span></p>
            <p><span class="label">Status:</span><span class="value">${issue.status}</span></p>
            <p><span class="label">Severity:</span><span class="value"><span class="severity-${issue.diseaseSeverity}">${issue.diseaseSeverity.toUpperCase()}</span></span></p>
          </div>
          
          <div class="section">
            <h2>Farmer Information</h2>
            <p><span class="label">Farmer Name:</span><span class="value">${issue.farmerName}</span></p>
            <p><span class="label">Phone:</span><span class="value">${issue.farmerPhone}</span></p>
            <p><span class="label">Farm:</span><span class="value">${issue.location.farmName}</span></p>
            <p><span class="label">Location:</span><span class="value">${issue.location.city}, ${issue.location.state}</span></p>
          </div>
          
          <div class="section">
            <h2>Disease Details</h2>
            <p><span class="label">Crop Type:</span><span class="value">${issue.cropType}</span></p>
            <p><span class="label">Affected Area:</span><span class="value">${issue.affectedArea} hectares</span></p>
            <p><span class="label">Disease:</span><span class="value">${issue.diseaseType}</span></p>
            <p><span class="label">Symptoms:</span><span class="value">${issue.symptoms.join(', ')}</span></p>
          </div>
          
          <div class="section">
            <h2>Treatment</h2>
            <p><span class="label">Recommended:</span><span class="value">${issue.treatment.recommended}</span></p>
            ${issue.treatment.applied ? `<p><span class="label">Applied:</span><span class="value">${issue.treatment.applied}</span></p>` : ''}
            ${issue.treatment.effectiveness ? `<p><span class="label">Effectiveness:</span><span class="value">${issue.treatment.effectiveness}/5</span></p>` : ''}
          </div>
          
          <div class="no-print" style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #2d5016; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Print this report
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

  // Drag and drop
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
      } else {
        alert('Please upload a CSV or Excel file');
      }
    }
  }

  // Close all modals
  closeModal(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showViewModal = false;
    this.showDeleteModal = false;
    this.showImportModal = false;
    this.showExportModal = false;
    this.showFiltersModal = false;
    this.showAudioModal = false;
    this.showTreatmentModal = false;
    this.showPatternsModal = false;
    this.selectedIssue = null;
    this.isDragover = false;
  }

  // Pagination helper
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
}
 