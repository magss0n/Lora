// src/app/core/models/report.model.ts
export interface Report {
  id: string;
  title: string;
  type: ReportType;
  description?: string;
  generatedBy: string;
  generationDate: Date;
  period: {
    start: Date;
    end: Date;
  };
  filters?: ReportFilters;
  data: ReportData;
  format: 'pdf' | 'excel' | 'csv' | 'html';
  fileUrl?: string;
  fileSize?: number;
  isScheduled: boolean;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    nextRun: Date;
  };
  status: 'generated' | 'pending' | 'failed';
  metrics?: ReportMetrics;
}

export type ReportType = 
  | 'production-summary'
  | 'financial-statement'
  | 'farmer-performance'
  | 'stock-movement'
  | 'credit-portfolio'
  | 'sales-analysis'
  | 'disease-report'
  | 'payment-history'
  | 'membership-report'
  | 'custom';

export interface ReportFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  farmerIds?: string[];
  productTypes?: string[];
  regions?: string[];
  cropTypes?: string[];
  status?: string[];
  minAmount?: number;
  maxAmount?: number;
}

export interface ReportData {
  summary?: any;
  charts?: ReportChart[];
  tables?: ReportTable[];
  rawData?: any[];
}

export interface ReportChart {
  type: 'bar' | 'line' | 'pie' | 'donut' | 'area';
  title: string;
  data: any[];
  xAxis: string;
  yAxis: string;
}

export interface ReportTable {
  title: string;
  columns: string[];
  rows: any[];
  footer?: any;
}

export interface ReportMetrics {
  totalRecords: number;
  timeGenerated: string;
  dataPoints: number;
  accuracy?: number;
}

export interface ReportTemplate {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  defaultFilters: ReportFilters;
  visualization: {
    charts: string[];
    tables: string[];
  };
  isCustom: boolean;
}

export interface CustomReportRequest {
  name: string;
  description?: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  filters: ReportFilters;
  metrics: string[];
  visualizations: string[];
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeTables: boolean;
  includeRawData: boolean;
}