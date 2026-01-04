export interface PlantHealthIssue {
  id: string;
  reportNumber: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  location: {
    farmName: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  cropType: string;
  affectedArea: number; // in hectares
  diseaseType: string;
  diseaseSeverity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  dateReported: Date;
  dateIdentified?: Date;
  images: string[]; // URLs or base64 strings
  status: 'reported' | 'investigating' | 'treatment' | 'resolved' | 'monitoring';
  treatment: {
    recommended: string;
    applied?: string;
    dateApplied?: Date;
    effectiveness?: number; // 1-5 rating
  };
  inspectorNotes?: string;
  followUpDate?: Date;
  preventiveMeasures?: string[];
  audioAlertSent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiseasePattern {
  id: string;
  diseaseName: string;
  cropType: string;
  season: string;
  commonSymptoms: string[];
  recommendedTreatment: string;
  preventionTips: string[];
  affectedRegions: string[];
  outbreakRisk: 'low' | 'medium' | 'high';
  lastOutbreak?: Date;
}

export interface TreatmentHistory {
  id: string;
  issueId: string;
  treatmentType: string;
  dateApplied: Date;
  appliedBy: string;
  effectiveness: number;
  notes?: string;
}

export interface PlantHealthStats {
  totalReports: number;
  activeIssues: number;
  resolvedIssues: number;
  criticalIssues: number;
  mostAffectedCrop: string;
  mostCommonDisease: string;
  regionalBreakdown: {
    region: string;
    count: number;
    severity: string;
  }[];
  weeklyTrend: {
    date: string;
    reports: number;
    resolved: number;
  }[];
}

export interface PlantHealthFilters {
  status?: string;
  severity?: string;
  cropType?: string;
  diseaseType?: string;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  region?: string;
  search?: string;
}