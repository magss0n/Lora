// src/app/core/services/contract.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  Contract, 
  ContractFilters, 
  ContractTemplate, 
  ContractProduct, 
  Milestone 
} from '../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private mockContracts: Contract[] = [
    {
      id: 'CT-2024-001',
      contractNumber: 'CT-2024-001',
      title: 'Organic Maize Supply Agreement',
      type: 'farmer-supply',
      status: 'active',
      farmerId: '1',
      farmerName: 'Chinedu Okoro',
      buyerId: 'B001',
      buyerName: 'Green Foods Ltd',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      totalValue: 12500000,
      currency: 'NGN',
      paymentTerms: 'Net 30 days',
      products: [
        {
          productId: 'P001',
          productName: 'Organic Maize',
          quantity: 5000,
          unit: 'kg',
          unitPrice: 2500,
          qualityGrade: 'Grade A',
          deliveryPeriod: 'Monthly'
        }
      ],
      deliverySchedule: [
        {
          deliveryId: 'DL-001',
          scheduledDate: new Date('2024-02-15'),
          actualDate: new Date('2024-02-14'),
          quantity: 500,
          status: 'delivered',
          notes: 'Early delivery, good quality'
        },
        {
          deliveryId: 'DL-002',
          scheduledDate: new Date('2024-03-15'),
          actualDate: new Date('2024-03-16'),
          quantity: 500,
          status: 'delivered',
          notes: 'One day delay due to rain'
        },
        {
          deliveryId: 'DL-003',
          scheduledDate: new Date('2024-04-15'),
          quantity: 500,
          status: 'scheduled',
          notes: 'Upcoming delivery'
        }
      ],
      qualityStandards: 'Moisture content < 14%, No foreign materials',
      attachments: [
        {
          id: 'ATT-001',
          name: 'signed_contract.pdf',
          type: 'pdf',
          url: '#',
          uploadDate: new Date('2024-01-05'),
          size: 2048000
        }
      ],
      fulfillment: {
        totalQuantity: 5000,
        deliveredQuantity: 1000,
        remainingQuantity: 4000,
        completionPercentage: 20,
        lastDeliveryDate: new Date('2024-03-16'),
        upcomingDelivery: new Date('2024-04-15')
      },
      milestones: [
        {
          id: 'M001',
          name: 'First Delivery',
          description: 'Complete first 500kg delivery',
          dueDate: new Date('2024-02-15'),
          completedDate: new Date('2024-02-14'),
          status: 'completed',
          isCritical: true
        },
        {
          id: 'M002',
          name: 'Quarterly Review',
          description: 'First quarter performance review',
          dueDate: new Date('2024-03-31'),
          status: 'pending',
          isCritical: true
        },
        {
          id: 'M003',
          name: 'Mid-Year Payment',
          description: 'Process 50% payment',
          dueDate: new Date('2024-06-30'),
          status: 'pending',
          isCritical: false
        }
      ],
      renewalReminderDate: new Date('2024-11-30'),
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-03-16')
    },
    {
      id: 'CT-2024-002',
      contractNumber: 'CT-2024-002',
      title: 'Rice Purchase Agreement',
      type: 'buyer-purchase',
      status: 'active',
      farmerId: '2',
      farmerName: 'Amina Bello',
      buyerId: 'B002',
      buyerName: 'National Grains Corp',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-08-31'),
      totalValue: 8500000,
      currency: 'NGN',
      paymentTerms: '50% advance, 50% on delivery',
      products: [
        {
          productId: 'P002',
          productName: 'Premium Rice',
          quantity: 2000,
          unit: 'kg',
          unitPrice: 4250,
          qualityGrade: 'Grade AA',
          deliveryPeriod: 'Bi-weekly'
        }
      ],
      deliverySchedule: [
        {
          deliveryId: 'DL-004',
          scheduledDate: new Date('2024-02-28'),
          actualDate: new Date('2024-02-27'),
          quantity: 250,
          status: 'delivered',
          notes: 'Excellent quality'
        }
      ],
      qualityStandards: 'Polished, whole grain > 95%',
      attachments: [
        {
          id: 'ATT-002',
          name: 'purchase_agreement.pdf',
          type: 'pdf',
          url: '#',
          uploadDate: new Date('2024-02-05'),
          size: 1850000
        }
      ],
      fulfillment: {
        totalQuantity: 2000,
        deliveredQuantity: 250,
        remainingQuantity: 1750,
        completionPercentage: 12.5,
        lastDeliveryDate: new Date('2024-02-27'),
        upcomingDelivery: new Date('2024-03-15')
      },
      milestones: [
        {
          id: 'M004',
          name: 'Advance Payment',
          description: 'Receive 50% advance payment',
          dueDate: new Date('2024-02-10'),
          completedDate: new Date('2024-02-09'),
          status: 'completed',
          isCritical: true
        }
      ],
      renewalReminderDate: new Date('2024-08-15'),
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-27')
    },
    {
      id: 'CT-2024-003',
      contractNumber: 'CT-2024-003',
      title: 'Equipment Lease Agreement',
      type: 'equipment-lease',
      status: 'active',
      farmerId: '3',
      farmerName: 'Emeka Nwankwo',
      supplierId: 'S001',
      supplierName: 'FarmTech Equipment',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-08-31'),
      totalValue: 2500000,
      currency: 'NGN',
      paymentTerms: 'Monthly installments',
      products: [
        {
          productId: 'P003',
          productName: 'Tractor Lease',
          quantity: 1,
          unit: 'ton',
          unitPrice: 500000,
          qualityGrade: 'Excellent',
          deliveryPeriod: '6 months'
        }
      ],
      deliverySchedule: [],
      qualityStandards: 'Regular maintenance required',
      attachments: [
        {
          id: 'ATT-003',
          name: 'lease_agreement.pdf',
          type: 'pdf',
          url: '#',
          uploadDate: new Date('2024-03-01'),
          size: 1560000
        }
      ],
      fulfillment: {
        totalQuantity: 6,
        deliveredQuantity: 1,
        remainingQuantity: 5,
        completionPercentage: 16.7,
        lastDeliveryDate: new Date('2024-03-01'),
        upcomingDelivery: new Date('2024-04-01')
      },
      milestones: [
        {
          id: 'M005',
          name: 'First Payment',
          description: 'First monthly payment due',
          dueDate: new Date('2024-04-01'),
          status: 'pending',
          isCritical: true
        }
      ],
      renewalReminderDate: new Date('2024-08-15'),
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01')
    },
    {
      id: 'CT-2024-004',
      contractNumber: 'CT-2024-004',
      title: 'Cassava Processing Service',
      type: 'service',
      status: 'pending',
      farmerId: '4',
      farmerName: 'Fatima Ibrahim',
      supplierId: 'S002',
      supplierName: 'Agro Processing Co',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-09-30'),
      totalValue: 3500000,
      currency: 'NGN',
      paymentTerms: 'Upon completion',
      products: [
        {
          productId: 'P004',
          productName: 'Cassava Processing',
          quantity: 1000,
          unit: 'kg',
          unitPrice: 3500,
          qualityGrade: 'Standard',
          deliveryPeriod: 'Monthly'
        }
      ],
      deliverySchedule: [],
      qualityStandards: 'Gari yield > 25%, moisture < 12%',
      attachments: [],
      fulfillment: {
        totalQuantity: 1000,
        deliveredQuantity: 0,
        remainingQuantity: 1000,
        completionPercentage: 0,
        upcomingDelivery: new Date('2024-05-01')
      },
      milestones: [
        {
          id: 'M006',
          name: 'Contract Signing',
          description: 'Sign service agreement',
          dueDate: new Date('2024-03-25'),
          status: 'pending',
          isCritical: true
        }
      ],
      renewalReminderDate: new Date('2024-09-15'),
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10')
    },
    {
      id: 'CT-2023-005',
      contractNumber: 'CT-2023-005',
      title: 'Tomato Supply Contract',
      type: 'farmer-supply',
      status: 'expired',
      farmerId: '5',
      farmerName: 'Sunday Okafor',
      buyerId: 'B003',
      buyerName: 'Fresh Produce Market',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-12-31'),
      totalValue: 6200000,
      currency: 'NGN',
      paymentTerms: 'Weekly payments',
      products: [
        {
          productId: 'P005',
          productName: 'Fresh Tomatoes',
          quantity: 3000,
          unit: 'crate',
          unitPrice: 2067,
          qualityGrade: 'Grade A',
          deliveryPeriod: 'Weekly'
        }
      ],
      deliverySchedule: [
        {
          deliveryId: 'DL-005',
          scheduledDate: new Date('2023-06-07'),
          actualDate: new Date('2023-06-07'),
          quantity: 100,
          status: 'delivered'
        }
      ],
      qualityStandards: 'Fresh, no bruises, uniform size',
      attachments: [
        {
          id: 'ATT-004',
          name: 'tomato_contract.pdf',
          type: 'pdf',
          url: '#',
          uploadDate: new Date('2023-06-01'),
          size: 1890000
        }
      ],
      fulfillment: {
        totalQuantity: 3000,
        deliveredQuantity: 3000,
        remainingQuantity: 0,
        completionPercentage: 100,
        lastDeliveryDate: new Date('2023-12-28')
      },
      milestones: [
        {
          id: 'M007',
          name: 'Final Delivery',
          description: 'Complete all deliveries',
          dueDate: new Date('2023-12-31'),
          completedDate: new Date('2023-12-28'),
          status: 'completed',
          isCritical: true
        }
      ],
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-12-28')
    }
  ];

  private mockTemplates: ContractTemplate[] = [
    {
      id: 'TPL-001',
      name: 'Standard Farmer Supply Agreement',
      type: 'farmer-supply',
      category: 'Supply',
      content: 'Standard contract template for farmer supply agreements...',
      variables: [
        { name: 'farmerName', label: 'Farmer Name', type: 'text', required: true },
        { name: 'productName', label: 'Product Name', type: 'text', required: true },
        { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'unitPrice', label: 'Unit Price', type: 'number', required: true },
        { name: 'startDate', label: 'Start Date', type: 'date', required: true }
      ],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ];

  constructor() {}

  // Get all contracts with optional filtering
  getContracts(filters?: ContractFilters): Observable<Contract[]> {
    let filteredContracts = [...this.mockContracts];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredContracts = filteredContracts.filter(contract =>
          contract.title.toLowerCase().includes(searchLower) ||
          contract.contractNumber.toLowerCase().includes(searchLower) ||
          contract.farmerName?.toLowerCase().includes(searchLower) ||
          contract.buyerName?.toLowerCase().includes(searchLower)
        );
      }

      if (filters.type) {
        filteredContracts = filteredContracts.filter(
          contract => contract.type === filters.type
        );
      }

      if (filters.status) {
        filteredContracts = filteredContracts.filter(
          contract => contract.status === filters.status
        );
      }

      if (filters.farmerId) {
        filteredContracts = filteredContracts.filter(
          contract => contract.farmerId === filters.farmerId
        );
      }

      if (filters.startDate) {
        filteredContracts = filteredContracts.filter(
          contract => contract.startDate >= filters.startDate!
        );
      }

      if (filters.endDate) {
        filteredContracts = filteredContracts.filter(
          contract => contract.endDate <= filters.endDate!
        );
      }
    }

    return of(filteredContracts).pipe(delay(500));
  }

  // Get contract by ID
  getContractById(id: string): Observable<Contract> {
    const contract = this.mockContracts.find(c => c.id === id);
    if (contract) {
      return of(contract).pipe(delay(300));
    }
    return throwError(() => new Error('Contract not found'));
  }

  // Create new contract
  createContract(contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Observable<Contract> {
    const newContract: Contract = {
      ...contract,
      id: `CT-${new Date().getFullYear()}-${String(this.mockContracts.length + 1).padStart(3, '0')}`,
      contractNumber: `CT-${new Date().getFullYear()}-${String(this.mockContracts.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockContracts.push(newContract);
    return of(newContract).pipe(delay(800));
  }

  // Update contract
  updateContract(id: string, updates: Partial<Contract>): Observable<Contract> {
    const index = this.mockContracts.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error('Contract not found'));
    }

    this.mockContracts[index] = {
      ...this.mockContracts[index],
      ...updates,
      updatedAt: new Date()
    };

    return of(this.mockContracts[index]).pipe(delay(600));
  }

  // Delete contract
  deleteContract(id: string): Observable<boolean> {
    const index = this.mockContracts.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error('Contract not found'));
    }

    this.mockContracts.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  // Get contract templates
  getTemplates(): Observable<ContractTemplate[]> {
    return of(this.mockTemplates).pipe(delay(300));
  }

  // Get contract statistics
  getContractStats(): Observable<any> {
    const stats = {
      total: this.mockContracts.length,
      active: this.mockContracts.filter(c => c.status === 'active').length,
      expired: this.mockContracts.filter(c => c.status === 'expired').length,
      pending: this.mockContracts.filter(c => c.status === 'pending').length,
      terminated: this.mockContracts.filter(c => c.status === 'terminated').length,
      draft: this.mockContracts.filter(c => c.status === 'draft').length,
      totalValue: this.mockContracts.reduce((sum, c) => sum + c.totalValue, 0),
      upcomingRenewals: this.mockContracts.filter(c => 
        c.renewalReminderDate && 
        new Date(c.renewalReminderDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000
      ).length
    };

    return of(stats).pipe(delay(300));
  }

  // Generate contract from template
  generateFromTemplate(templateId: string, variables: any): Observable<string> {
    // Mock implementation
    const content = `Contract generated from template ${templateId}`;
    return of(content).pipe(delay(500));
  }

  // Get contracts expiring soon (within 30 days)
  getExpiringSoon(): Observable<Contract[]> {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const expiringContracts = this.mockContracts.filter(contract => 
      contract.status === 'active' &&
      contract.endDate <= thirtyDaysFromNow &&
      contract.endDate >= new Date()
    );
    
    return of(expiringContracts).pipe(delay(300));
  }

  // Record delivery against contract
  recordDelivery(contractId: string, delivery: any): Observable<Contract> {
    const index = this.mockContracts.findIndex(c => c.id === contractId);
    if (index === -1) {
      return throwError(() => new Error('Contract not found'));
    }

    const newDelivery = {
      deliveryId: `DL-${Date.now()}`,
      scheduledDate: new Date(),
      ...delivery,
      status: 'delivered'
    };

    this.mockContracts[index].deliverySchedule.push(newDelivery);
    
    // Update fulfillment status
    const deliveredQty = this.mockContracts[index].deliverySchedule
      .filter(d => d.status === 'delivered')
      .reduce((sum, d) => sum + d.quantity, 0);
    
    this.mockContracts[index].fulfillment.deliveredQuantity = deliveredQty;
    this.mockContracts[index].fulfillment.remainingQuantity = 
      this.mockContracts[index].fulfillment.totalQuantity - deliveredQty;
    this.mockContracts[index].fulfillment.completionPercentage = 
      (deliveredQty / this.mockContracts[index].fulfillment.totalQuantity) * 100;
    this.mockContracts[index].fulfillment.lastDeliveryDate = new Date();

    return of(this.mockContracts[index]).pipe(delay(600));
  }

  // Update milestone status
  updateMilestone(contractId: string, milestoneId: string, status: 'pending' | 'completed' | 'overdue'): Observable<Contract> {
    const index = this.mockContracts.findIndex(c => c.id === contractId);
    if (index === -1) {
      return throwError(() => new Error('Contract not found'));
    }

    const milestoneIndex = this.mockContracts[index].milestones.findIndex(m => m.id === milestoneId);
    if (milestoneIndex === -1) {
      return throwError(() => new Error('Milestone not found'));
    }

    this.mockContracts[index].milestones[milestoneIndex].status = status;
    if (status === 'completed') {
      this.mockContracts[index].milestones[milestoneIndex].completedDate = new Date();
    }

    this.mockContracts[index].updatedAt = new Date();
    return of(this.mockContracts[index]).pipe(delay(400));
  }
}