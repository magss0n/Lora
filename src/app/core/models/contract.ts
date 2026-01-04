// src/app/core/models/contract.model.ts
export interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  type: 'farmer-supply' | 'buyer-purchase' | 'equipment-lease' | 'service';
  status: 'active' | 'expired' | 'pending' | 'terminated' | 'draft';
  
  // Parties
  farmerId?: string;
  farmerName?: string;
  buyerId?: string;
  buyerName?: string;
  supplierId?: string;
  supplierName?: string;
  
  // Terms
  startDate: Date;
  endDate: Date;
  totalValue: number;
  currency: string;
  paymentTerms: string;
  
  // Products & Delivery
  products: ContractProduct[];
  deliverySchedule: DeliverySchedule[];
  qualityStandards: string;
  
  // Documents
  signedDocument?: string;
  attachments: ContractAttachment[];
  
  // Signatures
  farmerSignature?: string;
  buyerSignature?: string;
  cooperativeSignature?: string;
  signDate?: Date;
  
  // Tracking
  fulfillment: FulfillmentStatus;
  milestones: Milestone[];
  renewalReminderDate?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractProduct {
  productId: string;
  productName: string;
  quantity: number;
  unit: 'kg' | 'ton' | 'bag' | 'crate' | 'liter';
  unitPrice: number;
  qualityGrade: string;
  deliveryPeriod: string;
}

export interface DeliverySchedule {
  deliveryId: string;
  scheduledDate: Date;
  actualDate?: Date;
  quantity: number;
  status: 'scheduled' | 'delivered' | 'delayed' | 'cancelled';
  notes?: string;
}

export interface ContractAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: Date;
  size: number;
}

export interface FulfillmentStatus {
  totalQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  completionPercentage: number;
  lastDeliveryDate?: Date;
  upcomingDelivery?: Date;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  completedDate?: Date;
  status: 'pending' | 'completed' | 'overdue';
  isCritical: boolean;
}

export interface ContractTemplate {
  id: string;
  name: string;
  type: string;
  category: string;
  content: string;
  variables: TemplateVariable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateVariable {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
  defaultValue?: string;
}

export interface ContractFilters {
  search?: string;
  type?: string;
  status?: string;
  farmerId?: string;
  buyerId?: string;
  startDate?: Date;
  endDate?: Date;
  minValue?: number;
  maxValue?: number;
}