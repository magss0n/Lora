// src/app/core/services/report.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  Report, 
  ReportType, 
  ReportTemplate, 
  CustomReportRequest,
  ReportFilters 
} from '../models/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private mockReports: Report[] = [
    {
      id: '1',
      title: 'Monthly Production Summary - January 2024',
      type: 'production-summary',
      description: 'Comprehensive overview of all production activities for January 2024',
      generatedBy: 'Admin User',
      generationDate: new Date('2024-01-31T14:30:00'),
      period: {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-31')
      },
      filters: {
        dateRange: {
          start: new Date('2024-01-01'),
          end: new Date('2024-01-31')
        },
        productTypes: ['Maize', 'Rice', 'Cassava']
      },
      data: {
        summary: {
          totalProduction: 12500,
          averageYield: 3.2,
          topProducers: 5,
          totalFarmers: 45
        },
        charts: [
          {
            type: 'bar',
            title: 'Production by Crop Type',
            data: [
              { crop: 'Maize', value: 4500 },
              { crop: 'Rice', value: 3200 },
              { crop: 'Cassava', value: 4800 }
            ],
            xAxis: 'crop',
            yAxis: 'value'
          }
        ],
        tables: [
          {
            title: 'Top 10 Producers',
            columns: ['Rank', 'Farmer', 'Crop', 'Quantity (kg)', 'Quality'],
            rows: [
              [1, 'Chinedu Okoro', 'Maize', 1250, 'A'],
              [2, 'Amina Bello', 'Rice', 1100, 'A+'],
              [3, 'Emeka Nwankwo', 'Cassava', 980, 'A']
            ]
          }
        ]
      },
      format: 'pdf',
      fileUrl: '/reports/production-jan-2024.pdf',
      fileSize: 2.5,
      isScheduled: true,
      schedule: {
        frequency: 'monthly',
        nextRun: new Date('2024-02-28')
      },
      status: 'generated',
      metrics: {
        totalRecords: 12500,
        timeGenerated: '2.5s',
        dataPoints: 450
      }
    },
    {
      id: '2',
      title: 'Financial Statement Q4 2023',
      type: 'financial-statement',
      description: 'Quarterly financial performance and revenue analysis',
      generatedBy: 'Finance Dept',
      generationDate: new Date('2024-01-15T10:15:00'),
      period: {
        start: new Date('2023-10-01'),
        end: new Date('2023-12-31')
      },
      data: {
        summary: {
          totalRevenue: 8500000,
          totalExpenses: 4500000,
          netProfit: 4000000,
          growthRate: 15.5
        }
      },
      format: 'excel',
      fileSize: 3.2,
      isScheduled: true,
      status: 'generated',
      metrics: {
        totalRecords: 1250,
        timeGenerated: '3.8s',
        dataPoints: 125
      }
    },
    {
      id: '3',
      title: 'Farmer Performance Report',
      type: 'farmer-performance',
      description: 'Performance metrics for all registered farmers',
      generatedBy: 'Operations Manager',
      generationDate: new Date('2024-01-28T16:45:00'),
      period: {
        start: new Date('2023-01-01'),
        end: new Date('2023-12-31')
      },
      data: {
        summary: {
          totalFarmers: 156,
          activeFarmers: 128,
          avgProduction: 3200,
          topPerformer: 'Sunday Okafor'
        }
      },
      format: 'pdf',
      fileSize: 4.1,
      isScheduled: false,
      status: 'generated'
    },
    {
      id: '4',
      title: 'Credit Portfolio Analysis',
      type: 'credit-portfolio',
      description: 'Analysis of outstanding loans and repayment rates',
      generatedBy: 'Credit Manager',
      generationDate: new Date('2024-01-20T11:30:00'),
      period: {
        start: new Date('2023-01-01'),
        end: new Date('2023-12-31')
      },
      data: {
        summary: {
          totalLoans: 45000000,
          repaidAmount: 32000000,
          outstanding: 13000000,
          defaultRate: 2.5
        }
      },
      format: 'excel',
      fileSize: 2.8,
      isScheduled: true,
      status: 'generated'
    },
    {
      id: '5',
      title: 'Stock Movement Report',
      type: 'stock-movement',
      description: 'Monthly stock inventory and movement analysis',
      generatedBy: 'Stock Manager',
      generationDate: new Date('2024-01-25T09:15:00'),
      period: {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-31')
      },
      data: {
        summary: {
          initialStock: 12500,
          received: 8500,
          sold: 10500,
          currentStock: 10500,
          wastage: 250
        }
      },
      format: 'pdf',
      fileSize: 1.9,
      isScheduled: true,
      status: 'generated'
    }
  ];

  private reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Monthly Production Summary',
      type: 'production-summary',
      description: 'Monthly production data by crop type and farmer',
      defaultFilters: {
        dateRange: {
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          end: new Date()
        }
      },
      visualization: {
        charts: ['Production by Crop', 'Monthly Trends', 'Top Producers'],
        tables: ['Production Summary', 'Farmer Rankings']
      },
      isCustom: false
    },
    {
      id: '2',
      name: 'Financial Dashboard',
      type: 'financial-statement',
      description: 'Financial performance metrics and revenue analysis',
      defaultFilters: {
        dateRange: {
          start: new Date(new Date().getFullYear(), 0, 1),
          end: new Date()
        }
      },
      visualization: {
        charts: ['Revenue Trends', 'Expense Breakdown', 'Profit Margin'],
        tables: ['Income Statement', 'Balance Sheet']
      },
      isCustom: false
    },
    {
      id: '3',
      name: 'Farmer Performance',
      type: 'farmer-performance',
      description: 'Individual farmer performance metrics and rankings',
      defaultFilters: {
        dateRange: {
          start: new Date(new Date().getFullYear(), 0, 1),
          end: new Date()
        }
      },
      visualization: {
        charts: ['Performance Scores', 'Production History', 'Quality Trends'],
        tables: ['Performance Rankings', 'Detailed Metrics']
      },
      isCustom: false
    }
  ];

  constructor() {}

  // Get all reports
  getReports(filters?: any): Observable<Report[]> {
    let filteredReports = [...this.mockReports];

    if (filters) {
      if (filters.type) {
        filteredReports = filteredReports.filter(report => report.type === filters.type);
      }

      if (filters.status) {
        filteredReports = filteredReports.filter(report => report.status === filters.status);
      }

      if (filters.dateRange) {
        filteredReports = filteredReports.filter(report => {
          const genDate = new Date(report.generationDate);
          return genDate >= new Date(filters.dateRange.start) && 
                 genDate <= new Date(filters.dateRange.end);
        });
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredReports = filteredReports.filter(report =>
          report.title.toLowerCase().includes(searchLower) ||
          report.description?.toLowerCase().includes(searchLower)
        );
      }
    }

    return of(filteredReports).pipe(delay(800));
  }

  // Get report by ID
  getReportById(id: string): Observable<Report> {
    const report = this.mockReports.find(r => r.id === id);
    if (report) {
      return of(report).pipe(delay(500));
    }
    return throwError(() => new Error('Report not found'));
  }

  // Get report templates
  getReportTemplates(): Observable<ReportTemplate[]> {
    return of(this.reportTemplates).pipe(delay(300));
  }

  // Generate new report
  generateReport(templateId: string, filters?: ReportFilters): Observable<Report> {
    const template = this.reportTemplates.find(t => t.id === templateId);
    
    if (!template) {
      return throwError(() => new Error('Template not found'));
    }

    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      title: `${template.name} - ${new Date().toLocaleDateString()}`,
      type: template.type,
      description: template.description,
      generatedBy: 'System User',
      generationDate: new Date(),
      period: filters?.dateRange || template.defaultFilters.dateRange || {
        start: new Date(new Date().getFullYear(), 0, 1),
        end: new Date()
      },
      filters: { ...template.defaultFilters, ...filters },
      data: this.generateMockData(template.type),
      format: 'pdf',
      fileSize: Math.random() * 5 + 1,
      isScheduled: false,
      status: 'generated',
      metrics: {
        totalRecords: Math.floor(Math.random() * 10000),
        timeGenerated: `${(Math.random() * 5 + 1).toFixed(1)}s`,
        dataPoints: Math.floor(Math.random() * 500)
      }
    };

    this.mockReports.unshift(newReport);
    return of(newReport).pipe(delay(1500));
  }

  // Generate custom report
  generateCustomReport(request: CustomReportRequest): Observable<Report> {
    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      title: request.name,
      type: 'custom',
      description: request.description,
      generatedBy: 'Custom User',
      generationDate: new Date(),
      period: request.dateRange,
      filters: request.filters,
      data: this.generateCustomData(request),
      format: request.format,
      fileSize: Math.random() * 5 + 1,
      isScheduled: false,
      status: 'generated',
      metrics: {
        totalRecords: Math.floor(Math.random() * 10000),
        timeGenerated: `${(Math.random() * 10 + 2).toFixed(1)}s`,
        dataPoints: Math.floor(Math.random() * 1000)
      }
    };

    this.mockReports.unshift(newReport);
    return of(newReport).pipe(delay(2000));
  }

  // Schedule report
  scheduleReport(templateId: string, frequency: string, filters?: ReportFilters): Observable<boolean> {
    return of(true).pipe(delay(800));
  }

  // Download report
  downloadReport(reportId: string): Observable<Blob> {
    const report = this.mockReports.find(r => r.id === reportId);
    
    if (!report) {
      return throwError(() => new Error('Report not found'));
    }

    // Mock file content
    const content = `Report: ${report.title}\nGenerated: ${report.generationDate}\n\nSummary data...`;
    const blob = new Blob([content], { type: 'application/pdf' });
    
    return of(blob).pipe(delay(500));
  }

  // Delete report
  deleteReport(reportId: string): Observable<boolean> {
    const index = this.mockReports.findIndex(r => r.id === reportId);
    
    if (index === -1) {
      return throwError(() => new Error('Report not found'));
    }

    this.mockReports.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  // Get report statistics
  getReportStats(): Observable<any> {
    const stats = {
      total: this.mockReports.length,
      generated: this.mockReports.filter(r => r.status === 'generated').length,
      pending: this.mockReports.filter(r => r.status === 'pending').length,
      scheduled: this.mockReports.filter(r => r.isScheduled).length,
      custom: this.mockReports.filter(r => r.type === 'custom').length,
      totalFileSize: this.mockReports.reduce((sum, r) => sum + (r.fileSize || 0), 0),
      popularTypes: this.getPopularTypes()
    };

    return of(stats).pipe(delay(300));
  }

  // Private helper methods
  private generateMockData(type: ReportType): Report['data'] {
    switch (type) {
      case 'production-summary':
        return {
          summary: {
            totalProduction: 12500,
            averageYield: 3.2,
            topProducers: 5,
            totalFarmers: 45
          }
        };
      case 'financial-statement':
        return {
          summary: {
            totalRevenue: 8500000,
            totalExpenses: 4500000,
            netProfit: 4000000,
            growthRate: 15.5
          }
        };
      case 'farmer-performance':
        return {
          summary: {
            totalFarmers: 156,
            activeFarmers: 128,
            avgProduction: 3200,
            topPerformer: 'Sunday Okafor'
          }
        };
      default:
        return { summary: {} };
    }
  }

  private generateCustomData(request: CustomReportRequest): Report['data'] {
    // Generate mock data based on request
    return {
      summary: {
        recordsProcessed: Math.floor(Math.random() * 10000),
        timePeriod: `${request.dateRange.start.toLocaleDateString()} - ${request.dateRange.end.toLocaleDateString()}`,
        filtersApplied: Object.keys(request.filters).length
      },
      charts: request.includeCharts ? [
        {
          type: 'bar',
          title: 'Custom Data Analysis',
          data: [
            { label: 'Category A', value: 4500 },
            { label: 'Category B', value: 3200 },
            { label: 'Category C', value: 4800 }
          ],
          xAxis: 'label',
          yAxis: 'value'
        }
      ] : [],
      tables: request.includeTables ? [
        {
          title: 'Data Summary',
          columns: ['Metric', 'Value', 'Change'],
          rows: [
            ['Total Records', '12,500', '+15%'],
            ['Average Value', '₦45,000', '+8%'],
            ['Growth Rate', '12.5%', '+2.3%']
          ]
        }
      ] : [],
      rawData: request.includeRawData ? [
        { id: 1, value: 100, date: '2024-01-01' },
        { id: 2, value: 150, date: '2024-01-02' },
        { id: 3, value: 200, date: '2024-01-03' }
      ] : []
    };
  }

  private getPopularTypes(): any[] {
    const typeCounts = this.mockReports.reduce((acc, report) => {
      acc[report.type] = (acc[report.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
}