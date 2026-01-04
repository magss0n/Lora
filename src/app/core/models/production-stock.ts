export interface Production {
  id: string;
  productionNumber: string;
  farmerId: string;
  farmerName: string;
  productType: string;
  quantity: number;
  unit: 'kg' | 'tons' | 'bags' | 'crates';
  qualityGrade: 'A' | 'B' | 'C' | 'D';
  season: 'planting' | 'harvest' | 'dry' | 'rainy';
  harvestDate: Date;
  deliveryDate: Date;
  notes?: string;
  photos?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  createdAt: Date;
  updatedAt: Date;
  location?: {
    farmLocation: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  price?: number;
  paymentStatus?: 'pending' | 'paid' | 'partial';
}

export interface Stock {
  id: string;
  productType: string;
  productName: string;
  category: 'grains' | 'tubers' | 'vegetables' | 'fruits' | 'others';
  quantity: number;
  unit: 'kg' | 'tons' | 'bags' | 'crates';
  warehouseLocation: string;
  shelfLife?: Date;
  qualityStatus: 'fresh' | 'good' | 'average' | 'low' | 'expired';
  lastUpdated: Date;
  minStockLevel: number;
  maxStockLevel: number;
  supplier?: string;
  batchNumber?: string;
  incomingDate?: Date;
  outgoingDate?: Date;
  storageConditions?: {
    temperature: string;
    humidity: string;
    specialNotes?: string;
  };
  value?: number;
}

export interface StockMovement {
  id: string;
  stockId: string;
  productType: string;
  movementType: 'incoming' | 'outgoing' | 'transfer' | 'wastage';
  quantity: number;
  unit: string;
  fromLocation?: string;
  toLocation?: string;
  reason?: string;
  referenceNumber?: string;
  createdBy: string;
  createdAt: Date;
  notes?: string;
}

export interface ProductionFilters {
  search?: string;
  farmerId?: string;
  productType?: string;
  season?: string;
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
}

export interface StockFilters {
  search?: string;
  category?: string;
  qualityStatus?: string;
  warehouse?: string;
  lowStock?: boolean;
  expiringSoon?: boolean;
}