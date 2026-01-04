import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Farmer, FarmerFilters, BulkImportResult } from '../models/farmer';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  private mockFarmers: Farmer[] = [
    {
      id: '1',
      registrationNumber: 'FARM-2024-001',
      firstName: 'Chinedu',
      lastName: 'Okoro',
      email: 'chinedu.okoro@email.com',
      phoneNumber: '+2348012345678',
      gender: 'male',
      dateOfBirth: new Date('1980-05-15'),
      address: {
        street: '123 Agric Road',
        city: 'Enugu',
        state: 'Enugu State',
        country: 'Nigeria',
        coordinates: { lat: 6.5244, lng: 7.4951 }
      },
      farmDetails: {
        farmName: 'Okoro Family Farms',
        farmSize: 15.5,
        farmLocation: 'Enugu East',
        cropsGrown: ['Maize', 'Cassava', 'Yam'],
        farmingExperience: 12,
        organicCertified: true
      },
      membership: {
        joinDate: new Date('2020-03-10'),
        status: 'active',
        membershipType: 'premium'
      },
      bankDetails: {
        bankName: 'First Bank',
        accountNumber: '1234567890',
        accountName: 'Chinedu Okoro',
        bvn: '12345678901'
      },
      documents: {
        passportPhoto: 'https://via.placeholder.com/150',
        idCard: 'uploaded-id.jpg'
      },
      financial: {
        totalCredit: 5000000,
        totalRepaid: 4500000,
        outstandingBalance: 500000,
        creditScore: 85,
        lastPaymentDate: new Date('2024-01-15')
      },
      production: {
        totalDeliveries: 45,
        totalWeight: 12500,
        averageQuality: 4.5,
        lastDeliveryDate: new Date('2024-01-20')
      },
      qrCode: 'data:image/svg+xml;base64,...',
      createdAt: new Date('2020-03-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      registrationNumber: 'FARM-2024-002',
      firstName: 'Amina',
      lastName: 'Bello',
      email: 'amina.bello@email.com',
      phoneNumber: '+2348023456789',
      gender: 'female',
      dateOfBirth: new Date('1975-08-22'),
      address: {
        street: '456 Farm Avenue',
        city: 'Kano',
        state: 'Kano State',
        country: 'Nigeria',
        coordinates: { lat: 12.0022, lng: 8.5927 }
      },
      farmDetails: {
        farmName: 'Bello Rice Plantation',
        farmSize: 45.2,
        farmLocation: 'Kano Central',
        cropsGrown: ['Rice', 'Wheat', 'Soybeans'],
        farmingExperience: 20,
        organicCertified: false
      },
      membership: {
        joinDate: new Date('2019-07-15'),
        status: 'active',
        membershipType: 'regular'
      },
      bankDetails: {
        bankName: 'UBA',
        accountNumber: '0987654321',
        accountName: 'Amina Bello'
      },
      documents: {
        passportPhoto: 'https://via.placeholder.com/150',
        landCertificate: 'land-cert.pdf'
      },
      financial: {
        totalCredit: 12000000,
        totalRepaid: 8500000,
        outstandingBalance: 3500000,
        creditScore: 72,
        lastPaymentDate: new Date('2024-01-10')
      },
      production: {
        totalDeliveries: 68,
        totalWeight: 32000,
        averageQuality: 4.2,
        lastDeliveryDate: new Date('2024-01-18')
      },
      qrCode: 'data:image/svg+xml;base64,...',
      createdAt: new Date('2019-07-15'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      registrationNumber: 'FARM-2024-003',
      firstName: 'Emeka',
      lastName: 'Nwankwo',
      email: 'emeka.nwankwo@email.com',
      phoneNumber: '+2348034567890',
      gender: 'male',
      dateOfBirth: new Date('1990-11-30'),
      address: {
        street: '789 Harvest Street',
        city: 'Port Harcourt',
        state: 'Rivers State',
        country: 'Nigeria',
        coordinates: { lat: 4.8156, lng: 7.0498 }
      },
      farmDetails: {
        farmName: 'Nwankwo Cassava Farm',
        farmSize: 8.7,
        farmLocation: 'Port Harcourt South',
        cropsGrown: ['Cassava', 'Plantain', 'Vegetables'],
        farmingExperience: 5,
        organicCertified: true
      },
      membership: {
        joinDate: new Date('2023-02-20'),
        status: 'active',
        membershipType: 'associate'
      },
      bankDetails: {
        bankName: 'Zenith Bank',
        accountNumber: '1122334455',
        accountName: 'Emeka Nwankwo'
      },
      documents: {
        passportPhoto: 'https://via.placeholder.com/150',
        taxCertificate: 'tax-cert.pdf'
      },
      financial: {
        totalCredit: 1500000,
        totalRepaid: 1200000,
        outstandingBalance: 300000,
        creditScore: 90,
        lastPaymentDate: new Date('2024-01-05')
      },
      production: {
        totalDeliveries: 22,
        totalWeight: 5800,
        averageQuality: 4.8,
        lastDeliveryDate: new Date('2024-01-12')
      },
      qrCode: 'data:image/svg+xml;base64,...',
      createdAt: new Date('2023-02-20'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '4',
      registrationNumber: 'FARM-2024-004',
      firstName: 'Fatima',
      lastName: 'Ibrahim',
      email: 'fatima.ibrahim@email.com',
      phoneNumber: '+2348045678901',
      gender: 'female',
      dateOfBirth: new Date('1985-04-12'),
      address: {
        street: '321 Green Valley',
        city: 'Kaduna',
        state: 'Kaduna State',
        country: 'Nigeria',
        coordinates: { lat: 10.5264, lng: 7.4388 }
      },
      farmDetails: {
        farmName: 'Ibrahim Maize Fields',
        farmSize: 32.8,
        farmLocation: 'Kaduna North',
        cropsGrown: ['Maize', 'Sorghum', 'Millet'],
        farmingExperience: 15,
        organicCertified: false
      },
      membership: {
        joinDate: new Date('2021-09-05'),
        status: 'suspended',
        membershipType: 'regular'
      },
      bankDetails: {
        bankName: 'GTBank',
        accountNumber: '5566778899',
        accountName: 'Fatima Ibrahim'
      },
      documents: {
        passportPhoto: 'https://via.placeholder.com/150'
      },
      financial: {
        totalCredit: 8000000,
        totalRepaid: 4500000,
        outstandingBalance: 3500000,
        creditScore: 45,
        lastPaymentDate: new Date('2023-11-15')
      },
      production: {
        totalDeliveries: 52,
        totalWeight: 18600,
        averageQuality: 3.8,
        lastDeliveryDate: new Date('2023-12-10')
      },
      qrCode: 'data:image/svg+xml;base64,...',
      createdAt: new Date('2021-09-05'),
      updatedAt: new Date('2023-12-10')
    },
    {
      id: '5',
      registrationNumber: 'FARM-2024-005',
      firstName: 'Sunday',
      lastName: 'Okafor',
      email: 'sunday.okafor@email.com',
      phoneNumber: '+2348056789012',
      gender: 'male',
      dateOfBirth: new Date('1978-12-08'),
      address: {
        street: '654 Crop Circle',
        city: 'Ibadan',
        state: 'Oyo State',
        country: 'Nigeria',
        coordinates: { lat: 7.3775, lng: 3.9470 }
      },
      farmDetails: {
        farmName: 'Okafor Mixed Farm',
        farmSize: 25.3,
        farmLocation: 'Ibadan West',
        cropsGrown: ['Yam', 'Cassava', 'Maize', 'Vegetables'],
        farmingExperience: 18,
        organicCertified: true
      },
      membership: {
        joinDate: new Date('2022-04-18'),
        status: 'inactive',
        membershipType: 'premium'
      },
      bankDetails: {
        bankName: 'Access Bank',
        accountNumber: '9988776655',
        accountName: 'Sunday Okafor'
      },
      documents: {
        passportPhoto: 'https://via.placeholder.com/150'
      },
      financial: {
        totalCredit: 3000000,
        totalRepaid: 3000000,
        outstandingBalance: 0,
        creditScore: 95,
        lastPaymentDate: new Date('2023-10-30')
      },
      production: {
        totalDeliveries: 38,
        totalWeight: 15400,
        averageQuality: 4.6,
        lastDeliveryDate: new Date('2023-10-25')
      },
      qrCode: 'data:image/svg+xml;base64,...',
      createdAt: new Date('2022-04-18'),
      updatedAt: new Date('2023-10-30')
    }
  ];

  constructor() {}

  // Get all farmers with optional filtering
  getFarmers(filters?: FarmerFilters): Observable<Farmer[]> {
    let filteredFarmers = [...this.mockFarmers];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredFarmers = filteredFarmers.filter(farmer =>
          farmer.firstName.toLowerCase().includes(searchLower) ||
          farmer.lastName.toLowerCase().includes(searchLower) ||
          farmer.registrationNumber.toLowerCase().includes(searchLower) ||
          farmer.phoneNumber.includes(filters.search!) ||
          farmer.farmDetails.farmName.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status) {
        filteredFarmers = filteredFarmers.filter(
          farmer => farmer.membership.status === filters.status
        );
      }

      if (filters.membershipType) {
        filteredFarmers = filteredFarmers.filter(
          farmer => farmer.membership.membershipType === filters.membershipType
        );
      }

      if (filters.city) {
        filteredFarmers = filteredFarmers.filter(
          farmer => farmer.address.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }

      if (filters.minFarmSize) {
        filteredFarmers = filteredFarmers.filter(
          farmer => farmer.farmDetails.farmSize >= filters.minFarmSize!
        );
      }

      if (filters.maxFarmSize) {
        filteredFarmers = filteredFarmers.filter(
          farmer => farmer.farmDetails.farmSize <= filters.maxFarmSize!
        );
      }
    }

    return of(filteredFarmers).pipe(delay(500));
  }

  // Get farmer by ID
  getFarmerById(id: string): Observable<Farmer> {
    const farmer = this.mockFarmers.find(f => f.id === id);
    if (farmer) {
      return of(farmer).pipe(delay(300));
    }
    return throwError(() => new Error('Farmer not found'));
  }

  // Create new farmer
  createFarmer(farmer: Omit<Farmer, 'id' | 'createdAt' | 'updatedAt' | 'qrCode'>): Observable<Farmer> {
    const newFarmer: Farmer = {
      ...farmer,
      id: Math.random().toString(36).substr(2, 9),
      qrCode: this.generateQRCode(farmer.registrationNumber),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockFarmers.push(newFarmer);
    return of(newFarmer).pipe(delay(800));
  }

  // Update farmer
  updateFarmer(id: string, updates: Partial<Farmer>): Observable<Farmer> {
    const index = this.mockFarmers.findIndex(f => f.id === id);
    if (index === -1) {
      return throwError(() => new Error('Farmer not found'));
    }

    this.mockFarmers[index] = {
      ...this.mockFarmers[index],
      ...updates,
      updatedAt: new Date()
    };

    return of(this.mockFarmers[index]).pipe(delay(600));
  }

  // Delete farmer (soft delete - change status to inactive)
  deleteFarmer(id: string): Observable<boolean> {
    const index = this.mockFarmers.findIndex(f => f.id === id);
    if (index === -1) {
      return throwError(() => new Error('Farmer not found'));
    }

    this.mockFarmers[index].membership.status = 'inactive';
    this.mockFarmers[index].updatedAt = new Date();
    
    return of(true).pipe(delay(400));
  }

  // Bulk import farmers
  bulkImport(farmersData: any[]): Observable<BulkImportResult> {
    const result: BulkImportResult = {
      total: farmersData.length,
      success: 0,
      failed: 0,
      errors: []
    };

    // Mock implementation - in real app, this would validate and create each farmer
    farmersData.forEach((data, index) => {
      try {
        // Validate required fields
        if (!data.firstName || !data.lastName || !data.phoneNumber) {
          throw new Error('Missing required fields');
        }

        // Create new farmer
        const newFarmer: Farmer = {
          id: Math.random().toString(36).substr(2, 9),
          registrationNumber: `FARM-${new Date().getFullYear()}-${String(this.mockFarmers.length + 1).padStart(3, '0')}`,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          gender: data.gender || 'other',
          address: {
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            country: data.address?.country || 'Nigeria'
          },
          farmDetails: {
            farmName: data.farmName || `${data.firstName} ${data.lastName} Farm`,
            farmSize: data.farmSize || 0,
            farmLocation: data.farmLocation || '',
            cropsGrown: data.cropsGrown || [],
            farmingExperience: data.farmingExperience || 0,
            organicCertified: data.organicCertified || false
          },
          membership: {
            joinDate: new Date(),
            status: 'active',
            membershipType: 'regular'
          },
          documents: {},
          financial: {
            totalCredit: 0,
            totalRepaid: 0,
            outstandingBalance: 0,
            creditScore: 0
          },
          production: {
            totalDeliveries: 0,
            totalWeight: 0,
            averageQuality: 0
          },
          qrCode: this.generateQRCode(`FARM-${new Date().getFullYear()}-${String(this.mockFarmers.length + 1).padStart(3, '0')}`),
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.mockFarmers.push(newFarmer);
        result.success++;
      } catch (error: any) {
        result.failed++;
        result.errors.push({
          row: index + 1,
          error: error.message
        });
      }
    });

    return of(result).pipe(delay(1500));
  }

  // Export farmers to Excel/PDF
  exportFarmers(format: 'excel' | 'pdf' | 'csv', filters?: FarmerFilters): Observable<Blob> {
    // Mock implementation - in real app, this would generate actual file
    const blob = new Blob(['Mock export data'], {
      type: format === 'excel' ? 'application/vnd.ms-excel' :
             format === 'pdf' ? 'application/pdf' :
             'text/csv'
    });
    
    return of(blob).pipe(delay(1000));
  }

  // Generate mock QR code
  private generateQRCode(content: string): string {
    // Mock QR code generation
    return `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100%" height="100%" fill="#f8fbf5"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#2d5016" font-family="Arial" font-size="10">${content}</text>
      </svg>
    `)}`;
  }

  // Get statistics
  getFarmerStats(): Observable<any> {
    const stats = {
      total: this.mockFarmers.length,
      active: this.mockFarmers.filter(f => f.membership.status === 'active').length,
      inactive: this.mockFarmers.filter(f => f.membership.status === 'inactive').length,
      suspended: this.mockFarmers.filter(f => f.membership.status === 'suspended').length,
      pending: this.mockFarmers.filter(f => f.membership.status === 'pending').length,
      totalFarmSize: this.mockFarmers.reduce((sum, f) => sum + f.farmDetails.farmSize, 0),
      averageExperience: this.mockFarmers.reduce((sum, f) => sum + f.farmDetails.farmingExperience, 0) / this.mockFarmers.length,
      organicCertified: this.mockFarmers.filter(f => f.farmDetails.organicCertified).length
    };

    return of(stats).pipe(delay(300));
  }
}