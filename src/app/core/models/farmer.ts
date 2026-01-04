export interface Farmer {
  id: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    postalCode?: string;  
  };
  farmDetails: {
    farmName: string;
    farmSize: number;
    farmLocation: string;
    cropsGrown: string[];
    farmingExperience: number;
    organicCertified: boolean;
    hasIrrigation?: boolean;  
    primaryCrop?: string;    
  };
  membership: {
    joinDate: Date;
    status: 'active' | 'inactive' | 'suspended' | 'pending';
    membershipType: 'regular' | 'premium' | 'associate';
    notes?: string;  
  };
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    bvn?: string;
  };
  identificationNumber?: string;   
  documents: {
    idCard?: string;
    passportPhoto?: string;
    landCertificate?: string;
    taxCertificate?: string;
  };
  financial: {
    totalCredit: number;
    totalRepaid: number;
    outstandingBalance: number;
    creditScore: number;
    lastPaymentDate?: Date;
  };
  production: {
    totalDeliveries: number;
    totalWeight: number; // in kg
    averageQuality: number; // 1-5
    lastDeliveryDate?: Date;
  };
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FarmerFilters {
  search?: string;
  status?: string;
  membershipType?: string;
  city?: string;
  minFarmSize?: number;
  maxFarmSize?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface BulkImportResult {
  total: number;
  success: number;
  failed: number;
  errors: Array<{
    row: number;
    error: string;
  }>;
}