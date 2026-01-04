// features/plant-health/plant-health.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HealthReport {
  id: string;
  diseaseName: string;
  affectedArea: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedDate: Date;
  farmerName: string;
  status: 'pending' | 'investigating' | 'resolved';
}

@Component({
  selector: 'app-plant-health',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plant-health.html',
  styleUrls: ['./plant-health.scss']
})
export class PlantHealthComponent implements OnInit {
  healthReports: HealthReport[] = [];
  filteredReports: HealthReport[] = [];
  selectedSeverity: string = 'all';
  showReportModal: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadHealthReports();
  }

  loadHealthReports(): void {
    // TODO: Load from service
  }

  filterReports(): void {
    this.filteredReports = this.healthReports.filter(report => {
      return this.selectedSeverity === 'all' || report.severity === this.selectedSeverity;
    });
  }

  createReport(): void {
    this.showReportModal = true;
  }

  viewReportDetails(reportId: string): void {
    console.log('View report:', reportId);
  }
}