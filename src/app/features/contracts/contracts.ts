// features/contracts/contracts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Contract {
  id: string;
  contractNumber: string;
  partyName: string;
  type: 'supply' | 'purchase' | 'service';
  startDate: Date;
  endDate: Date;
  value: number;
  status: 'active' | 'expired' | 'pending' | 'cancelled';
}

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contracts.html',
  styleUrls: ['./contracts.scss']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[] = [];
  filteredContracts: Contract[] = [];
  selectedStatus: string = 'all';
  showCreateModal: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    // TODO: Load from service
  }

  filterContracts(): void {
    this.filteredContracts = this.contracts.filter(contract => {
      return this.selectedStatus === 'all' || contract.status === this.selectedStatus;
    });
  }

  createContract(): void {
    this.showCreateModal = true;
  }

  viewContractDetails(contractId: string): void {
    console.log('View contract:', contractId);
  }

  renewContract(contractId: string): void {
    console.log('Renew contract:', contractId);
  }
}
