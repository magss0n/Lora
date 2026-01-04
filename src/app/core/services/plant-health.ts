import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  PlantHealthIssue, 
  DiseasePattern, 
  TreatmentHistory, 
  PlantHealthStats,
  PlantHealthFilters 
} from '../models/plant-health';

@Injectable({
  providedIn: 'root'
})
export class PlantHealthService {
  private mockIssues: PlantHealthIssue[] = [
    {
      id: '1',
      reportNumber: 'PH-2024-001',
      farmerId: 'FARM-2024-001',
      farmerName: 'Chinedu Okoro',
      farmerPhone: '+2348012345678',
      location: {
        farmName: 'Okoro Family Farms',
        city: 'Enugu',
        state: 'Enugu State'
      },
      cropType: 'Maize',
      affectedArea: 2.5,
      diseaseType: 'Maize Streak Virus',
      diseaseSeverity: 'high',
      symptoms: ['Yellow streaks on leaves', 'Stunted growth', 'Leaf curling'],
      dateReported: new Date('2024-01-15'),
      dateIdentified: new Date('2024-01-16'),
      images: ['https://via.placeholder.com/300x200?text=Maize+Streak+Virus'],
      status: 'treatment',
      treatment: {
        recommended: 'Apply systemic insecticides and remove infected plants',
        applied: 'Cypermethrin spray applied',
        dateApplied: new Date('2024-01-17'),
        effectiveness: 3
      },
      inspectorNotes: 'Infection spreading to adjacent rows. Immediate action required.',
      followUpDate: new Date('2024-01-24'),
      preventiveMeasures: ['Crop rotation', 'Use resistant varieties', 'Early planting'],
      audioAlertSent: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-17')
    },
    {
      id: '2',
      reportNumber: 'PH-2024-002',
      farmerId: 'FARM-2024-002',
      farmerName: 'Amina Bello',
      farmerPhone: '+2348023456789',
      location: {
        farmName: 'Bello Rice Plantation',
        city: 'Kano',
        state: 'Kano State'
      },
      cropType: 'Rice',
      affectedArea: 5.2,
      diseaseType: 'Rice Blast',
      diseaseSeverity: 'critical',
      symptoms: ['Diamond-shaped lesions', 'White to gray centers', 'Collars turn necrotic'],
      dateReported: new Date('2024-01-10'),
      dateIdentified: new Date('2024-01-11'),
      images: ['https://via.placeholder.com/300x200?text=Rice+Blast'],
      status: 'investigating',
      treatment: {
        recommended: 'Fungicide application and proper water management'
      },
      inspectorNotes: 'High humidity conditions favor disease spread. Urgent treatment needed.',
      audioAlertSent: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-11')
    },
    {
      id: '3',
      reportNumber: 'PH-2024-003',
      farmerId: 'FARM-2024-003',
      farmerName: 'Emeka Nwankwo',
      farmerPhone: '+2348034567890',
      location: {
        farmName: 'Nwankwo Cassava Farm',
        city: 'Port Harcourt',
        state: 'Rivers State'
      },
      cropType: 'Cassava',
      affectedArea: 1.8,
      diseaseType: 'Cassava Mosaic Disease',
      diseaseSeverity: 'medium',
      symptoms: ['Mosaic patterns on leaves', 'Leaf distortion', 'Reduced tuber size'],
      dateReported: new Date('2024-01-05'),
      dateIdentified: new Date('2024-01-06'),
      images: ['https://via.placeholder.com/300x200?text=Cassava+Mosaic'],
      status: 'monitoring',
      treatment: {
        recommended: 'Remove infected plants, use virus-free planting material',
        applied: 'Infected plants removed and burned',
        dateApplied: new Date('2024-01-07'),
        effectiveness: 4
      },
      followUpDate: new Date('2024-01-20'),
      preventiveMeasures: ['Use certified cuttings', 'Control whitefly vectors', 'Rogue infected plants'],
      audioAlertSent: false,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-07')
    },
    {
      id: '4',
      reportNumber: 'PH-2024-004',
      farmerId: 'FARM-2024-004',
      farmerName: 'Fatima Ibrahim',
      farmerPhone: '+2348045678901',
      location: {
        farmName: 'Ibrahim Maize Fields',
        city: 'Kaduna',
        state: 'Kaduna State'
      },
      cropType: 'Maize',
      affectedArea: 3.7,
      diseaseType: 'Northern Corn Leaf Blight',
      diseaseSeverity: 'low',
      symptoms: ['Gray-green elliptical lesions', 'Lesions turning tan', 'Premature leaf death'],
      dateReported: new Date('2024-01-18'),
      status: 'reported',
      images: ['https://via.placeholder.com/300x200?text=Corn+Leaf+Blight'],
      treatment: {
        recommended: 'Fungicide spray and crop rotation'
      },
      audioAlertSent: false,
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '5',
      reportNumber: 'PH-2024-005',
      farmerId: 'FARM-2024-005',
      farmerName: 'Sunday Okafor',
      farmerPhone: '+2348056789012',
      location: {
        farmName: 'Okafor Mixed Farm',
        city: 'Ibadan',
        state: 'Oyo State'
      },
      cropType: 'Yam',
      affectedArea: 0.8,
      diseaseType: 'Yam Anthracnose',
      diseaseSeverity: 'high',
      symptoms: ['Dark brown leaf spots', 'Lesions on stems', 'Tuber rot'],
      dateReported: new Date('2023-12-20'),
      dateIdentified: new Date('2023-12-21'),
      images: ['https://via.placeholder.com/300x200?text=Yam+Anthracnose'],
      status: 'resolved',
      treatment: {
        recommended: 'Copper-based fungicide and proper storage',
        applied: 'Copper oxychloride spray applied',
        dateApplied: new Date('2023-12-22'),
        effectiveness: 5
      },
      inspectorNotes: 'Disease controlled successfully. Recommend regular monitoring.',
      preventiveMeasures: ['Proper vine staking', 'Good drainage', 'Sanitation'],
      audioAlertSent: true,
      createdAt: new Date('2023-12-20'),
      updatedAt: new Date('2023-12-30')
    }
  ];

  private mockDiseasePatterns: DiseasePattern[] = [
    {
      id: '1',
      diseaseName: 'Maize Streak Virus',
      cropType: 'Maize',
      season: 'Rainy',
      commonSymptoms: ['Yellow streaks', 'Stunted growth', 'Leaf curling'],
      recommendedTreatment: 'Systemic insecticides, resistant varieties',
      preventionTips: ['Early planting', 'Vector control', 'Field sanitation'],
      affectedRegions: ['Enugu', 'Kaduna', 'Plateau'],
      outbreakRisk: 'high',
      lastOutbreak: new Date('2024-01-15')
    },
    {
      id: '2',
      diseaseName: 'Rice Blast',
      cropType: 'Rice',
      season: 'Wet',
      commonSymptoms: ['Diamond lesions', 'Neck rot', 'Panicle blight'],
      recommendedTreatment: 'Fungicides, proper fertilization',
      preventionTips: ['Balanced fertilization', 'Water management', 'Resistant varieties'],
      affectedRegions: ['Kano', 'Kebbi', 'Jigawa'],
      outbreakRisk: 'high',
      lastOutbreak: new Date('2024-01-10')
    }
  ];

  constructor() {}

  // Get all plant health issues
  getIssues(filters?: PlantHealthFilters): Observable<PlantHealthIssue[]> {
    let filteredIssues = [...this.mockIssues];

    if (filters) {
      if (filters.status) {
        filteredIssues = filteredIssues.filter(
          issue => issue.status === filters.status
        );
      }

      if (filters.severity) {
        filteredIssues = filteredIssues.filter(
          issue => issue.diseaseSeverity === filters.severity
        );
      }

      if (filters.cropType) {
        filteredIssues = filteredIssues.filter(
          issue => issue.cropType.toLowerCase().includes(filters.cropType!.toLowerCase())
        );
      }

      if (filters.diseaseType) {
        filteredIssues = filteredIssues.filter(
          issue => issue.diseaseType.toLowerCase().includes(filters.diseaseType!.toLowerCase())
        );
      }

      if (filters.region) {
        filteredIssues = filteredIssues.filter(
          issue => issue.location.state.toLowerCase().includes(filters.region!.toLowerCase())
        );
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredIssues = filteredIssues.filter(issue =>
          issue.farmerName.toLowerCase().includes(searchLower) ||
          issue.reportNumber.toLowerCase().includes(searchLower) ||
          issue.cropType.toLowerCase().includes(searchLower) ||
          issue.diseaseType.toLowerCase().includes(searchLower)
        );
      }
    }

    return of(filteredIssues).pipe(delay(500));
  }

  // Get issue by ID
  getIssueById(id: string): Observable<PlantHealthIssue> {
    const issue = this.mockIssues.find(i => i.id === id);
    if (issue) {
      return of(issue).pipe(delay(300));
    }
    return throwError(() => new Error('Issue not found'));
  }

  // Create new issue
  createIssue(issue: Omit<PlantHealthIssue, 'id' | 'createdAt' | 'updatedAt' | 'reportNumber'>): Observable<PlantHealthIssue> {
    const newIssue: PlantHealthIssue = {
      ...issue,
      id: Math.random().toString(36).substr(2, 9),
      reportNumber: `PH-${new Date().getFullYear()}-${String(this.mockIssues.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockIssues.push(newIssue);
    return of(newIssue).pipe(delay(800));
  }

  // Update issue
  updateIssue(id: string, updates: Partial<PlantHealthIssue>): Observable<PlantHealthIssue> {
    const index = this.mockIssues.findIndex(i => i.id === id);
    if (index === -1) {
      return throwError(() => new Error('Issue not found'));
    }

    this.mockIssues[index] = {
      ...this.mockIssues[index],
      ...updates,
      updatedAt: new Date()
    };

    return of(this.mockIssues[index]).pipe(delay(600));
  }

  // Delete issue
  deleteIssue(id: string): Observable<boolean> {
    const index = this.mockIssues.findIndex(i => i.id === id);
    if (index === -1) {
      return throwError(() => new Error('Issue not found'));
    }

    this.mockIssues.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  // Get statistics
  getStats(): Observable<PlantHealthStats> {
    const stats: PlantHealthStats = {
      totalReports: this.mockIssues.length,
      activeIssues: this.mockIssues.filter(i => i.status !== 'resolved').length,
      resolvedIssues: this.mockIssues.filter(i => i.status === 'resolved').length,
      criticalIssues: this.mockIssues.filter(i => i.diseaseSeverity === 'critical').length,
      mostAffectedCrop: this.getMostAffectedCrop(),
      mostCommonDisease: this.getMostCommonDisease(),
      regionalBreakdown: this.getRegionalBreakdown(),
      weeklyTrend: this.getWeeklyTrend()
    };

    return of(stats).pipe(delay(300));
  }

  // Get disease patterns
  getDiseasePatterns(): Observable<DiseasePattern[]> {
    return of(this.mockDiseasePatterns).pipe(delay(300));
  }

  // Get treatment history for an issue
  getTreatmentHistory(issueId: string): Observable<TreatmentHistory[]> {
    // Mock treatment history
    const mockHistory: TreatmentHistory[] = [
      {
        id: '1',
        issueId: issueId,
        treatmentType: 'Fungicide Application',
        dateApplied: new Date('2024-01-17'),
        appliedBy: 'Agro Inspector',
        effectiveness: 4,
        notes: 'Initial treatment applied'
      },
      {
        id: '2',
        issueId: issueId,
        treatmentType: 'Follow-up Inspection',
        dateApplied: new Date('2024-01-24'),
        appliedBy: 'Field Officer',
        effectiveness: 3,
        notes: 'Some improvement noted'
      }
    ];

    return of(mockHistory).pipe(delay(300));
  }

  // Send audio alert
  sendAudioAlert(issueId: string, message: string): Observable<boolean> {
    const index = this.mockIssues.findIndex(i => i.id === issueId);
    if (index !== -1) {
      this.mockIssues[index].audioAlertSent = true;
    }
    
    // Mock API call
    return of(true).pipe(delay(500));
  }

  // Helper methods
  private getMostAffectedCrop(): string {
    const cropCounts = this.mockIssues.reduce((acc, issue) => {
      acc[issue.cropType] = (acc[issue.cropType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(cropCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
  }

  private getMostCommonDisease(): string {
    const diseaseCounts = this.mockIssues.reduce((acc, issue) => {
      acc[issue.diseaseType] = (acc[issue.diseaseType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(diseaseCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
  }

  private getRegionalBreakdown() {
    const regions = this.mockIssues.reduce((acc, issue) => {
      const region = issue.location.state;
      if (!acc[region]) {
        acc[region] = { count: 0, severity: 'low' };
      }
      acc[region].count++;
      
      // Determine highest severity in region
      const severities = { low: 1, medium: 2, high: 3, critical: 4 };
      if (severities[issue.diseaseSeverity] > severities[acc[region].severity as keyof typeof severities]) {
        acc[region].severity = issue.diseaseSeverity;
      }
      
      return acc;
    }, {} as Record<string, { count: number; severity: string }>);

    return Object.entries(regions).map(([region, data]) => ({
      region,
      ...data
    }));
  }

  private getWeeklyTrend() {
    // Mock weekly trend data
    return [
      { date: '2024-01-01', reports: 2, resolved: 1 },
      { date: '2024-01-08', reports: 3, resolved: 2 },
      { date: '2024-01-15', reports: 5, resolved: 3 },
      { date: '2024-01-22', reports: 4, resolved: 3 }
    ];
  }
}