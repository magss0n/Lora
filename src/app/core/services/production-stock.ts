import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Production, Stock, StockMovement, ProductionFilters, StockFilters } from '../models/production-stock';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  private mockProductions: Production[] = [
    {
      id: '1',
      productionNumber: 'PROD-2024-001',
      farmerId: '1',
      farmerName: 'Chinedu Okoro',
      productType: 'Maize',
      quantity: 1250,
      unit: 'kg',
      qualityGrade: 'A',
      season: 'harvest',
      harvestDate: new Date('2024-01-15'),
      deliveryDate: new Date('2024-01-20'),
      status: 'approved',
      location: {
        farmLocation: 'Enugu East',
        coordinates: { lat: 6.5244, lng: 7.4951 }
      },
      price: 62500,
      paymentStatus: 'paid',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      productionNumber: 'PROD-2024-002',
      farmerId: '2',
      farmerName: 'Amina Bello',
      productType: 'Rice',
      quantity: 3200,
      unit: 'kg',
      qualityGrade: 'B',
      season: 'harvest',
      harvestDate: new Date('2024-01-10'),
      deliveryDate: new Date('2024-01-18'),
      status: 'approved',
      location: {
        farmLocation: 'Kano Central'
      },
      price: 160000,
      paymentStatus: 'partial',
      notes: 'Partial delivery, remaining to follow next week',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      productionNumber: 'PROD-2024-003',
      farmerId: '3',
      farmerName: 'Emeka Nwankwo',
      productType: 'Cassava',
      quantity: 850,
      unit: 'kg',
      qualityGrade: 'A',
      season: 'planting',
      harvestDate: new Date('2024-01-05'),
      deliveryDate: new Date('2024-01-12'),
      status: 'processed',
      location: {
        farmLocation: 'Port Harcourt South'
      },
      price: 42500,
      paymentStatus: 'pending',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '4',
      productionNumber: 'PROD-2024-004',
      farmerId: '4',
      farmerName: 'Fatima Ibrahim',
      productType: 'Maize',
      quantity: 1860,
      unit: 'kg',
      qualityGrade: 'C',
      season: 'harvest',
      harvestDate: new Date('2023-12-05'),
      deliveryDate: new Date('2023-12-10'),
      status: 'approved',
      location: {
        farmLocation: 'Kaduna North'
      },
      price: 93000,
      paymentStatus: 'paid',
      createdAt: new Date('2023-12-10'),
      updatedAt: new Date('2023-12-10')
    },
    {
      id: '5',
      productionNumber: 'PROD-2024-005',
      farmerId: '5',
      farmerName: 'Sunday Okafor',
      productType: 'Yam',
      quantity: 950,
      unit: 'kg',
      qualityGrade: 'B',
      season: 'harvest',
      harvestDate: new Date('2023-10-20'),
      deliveryDate: new Date('2023-10-25'),
      status: 'processed',
      location: {
        farmLocation: 'Ibadan West'
      },
      price: 76000,
      paymentStatus: 'paid',
      notes: 'Organic yam tubers',
      createdAt: new Date('2023-10-25'),
      updatedAt: new Date('2023-10-25')
    }
  ];

  private mockStocks: Stock[] = [
    {
      id: '1',
      productType: 'Maize',
      productName: 'Premium Maize Grains',
      category: 'grains',
      quantity: 15000,
      unit: 'kg',
      warehouseLocation: 'Warehouse A',
      shelfLife: new Date('2024-06-30'),
      qualityStatus: 'fresh',
      lastUpdated: new Date('2024-01-25'),
      minStockLevel: 5000,
      maxStockLevel: 30000,
      supplier: 'Multiple Farmers',
      batchNumber: 'BATCH-MZ-2024-01',
      incomingDate: new Date('2024-01-25'),
      storageConditions: {
        temperature: '25°C',
        humidity: '12%',
        specialNotes: 'Store in cool dry place'
      },
      value: 750000
    },
    {
      id: '2',
      productType: 'Rice',
      productName: 'Long Grain Rice',
      category: 'grains',
      quantity: 8500,
      unit: 'kg',
      warehouseLocation: 'Warehouse B',
      shelfLife: new Date('2024-08-15'),
      qualityStatus: 'good',
      lastUpdated: new Date('2024-01-22'),
      minStockLevel: 3000,
      maxStockLevel: 15000,
      supplier: 'Bello Rice Plantation',
      batchNumber: 'BATCH-RC-2024-01',
      incomingDate: new Date('2024-01-22'),
      storageConditions: {
        temperature: '22°C',
        humidity: '13%'
      },
      value: 425000
    },
    {
      id: '3',
      productType: 'Cassava',
      productName: 'Fresh Cassava Tubers',
      category: 'tubers',
      quantity: 3200,
      unit: 'kg',
      warehouseLocation: 'Cold Storage',
      shelfLife: new Date('2024-02-15'),
      qualityStatus: 'fresh',
      lastUpdated: new Date('2024-01-20'),
      minStockLevel: 1000,
      maxStockLevel: 5000,
      supplier: 'Nwankwo Cassava Farm',
      batchNumber: 'BATCH-CS-2024-01',
      incomingDate: new Date('2024-01-20'),
      storageConditions: {
        temperature: '15°C',
        humidity: '85%',
        specialNotes: 'Requires refrigeration'
      },
      value: 160000
    },
    {
      id: '4',
      productType: 'Yam',
      productName: 'Organic Yam Tubers',
      category: 'tubers',
      quantity: 2200,
      unit: 'kg',
      warehouseLocation: 'Warehouse A',
      shelfLife: new Date('2024-03-30'),
      qualityStatus: 'good',
      lastUpdated: new Date('2024-01-18'),
      minStockLevel: 800,
      maxStockLevel: 4000,
      supplier: 'Okafor Mixed Farm',
      batchNumber: 'BATCH-YM-2024-01',
      incomingDate: new Date('2024-01-18'),
      storageConditions: {
        temperature: '18°C',
        humidity: '70%'
      },
      value: 176000
    },
    {
      id: '5',
      productType: 'Sorghum',
      productName: 'White Sorghum',
      category: 'grains',
      quantity: 1800,
      unit: 'kg',
      warehouseLocation: 'Warehouse C',
      shelfLife: new Date('2024-07-31'),
      qualityStatus: 'average',
      lastUpdated: new Date('2024-01-15'),
      minStockLevel: 500,
      maxStockLevel: 2500,
      supplier: 'Ibrahim Maize Fields',
      batchNumber: 'BATCH-SG-2024-01',
      incomingDate: new Date('2024-01-15'),
      storageConditions: {
        temperature: '24°C',
        humidity: '14%'
      },
      value: 72000
    }
  ];

  private mockStockMovements: StockMovement[] = [
    {
      id: '1',
      stockId: '1',
      productType: 'Maize',
      movementType: 'incoming',
      quantity: 1250,
      unit: 'kg',
      fromLocation: 'Farm Collection',
      toLocation: 'Warehouse A',
      reason: 'New delivery from farmer',
      referenceNumber: 'PROD-2024-001',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-20')
    },
    {
      id: '2',
      stockId: '2',
      productType: 'Rice',
      movementType: 'incoming',
      quantity: 3200,
      unit: 'kg',
      fromLocation: 'Farm Collection',
      toLocation: 'Warehouse B',
      reason: 'Bulk delivery',
      referenceNumber: 'PROD-2024-002',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-18')
    },
    {
      id: '3',
      stockId: '3',
      productType: 'Cassava',
      movementType: 'incoming',
      quantity: 850,
      unit: 'kg',
      fromLocation: 'Farm Collection',
      toLocation: 'Cold Storage',
      reason: 'Perishable delivery',
      referenceNumber: 'PROD-2024-003',
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-12')
    },
    {
      id: '4',
      stockId: '1',
      productType: 'Maize',
      movementType: 'outgoing',
      quantity: 500,
      unit: 'kg',
      fromLocation: 'Warehouse A',
      toLocation: 'Customer A',
      reason: 'Sales order #SO-2024-001',
      referenceNumber: 'SO-2024-001',
      createdBy: 'Sales Manager',
      createdAt: new Date('2024-01-22')
    },
    {
      id: '5',
      stockId: '4',
      productType: 'Yam',
      movementType: 'transfer',
      quantity: 200,
      unit: 'kg',
      fromLocation: 'Warehouse A',
      toLocation: 'Warehouse B',
      reason: 'Stock redistribution',
      createdBy: 'Warehouse Manager',
      createdAt: new Date('2024-01-19')
    }
  ];

  constructor() {}

  // Production methods
  getProductions(filters?: ProductionFilters): Observable<Production[]> {
    let filtered = [...this.mockProductions];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(prod =>
          prod.productionNumber.toLowerCase().includes(searchLower) ||
          prod.farmerName.toLowerCase().includes(searchLower) ||
          prod.productType.toLowerCase().includes(searchLower)
        );
      }

      if (filters.productType) {
        filtered = filtered.filter(prod => prod.productType === filters.productType);
      }

      if (filters.season) {
        filtered = filtered.filter(prod => prod.season === filters.season);
      }

      if (filters.status) {
        filtered = filtered.filter(prod => prod.status === filters.status);
      }

      if (filters.farmerId) {
        filtered = filtered.filter(prod => prod.farmerId === filters.farmerId);
      }

      if (filters.minQuantity) {
        filtered = filtered.filter(prod => prod.quantity >= filters.minQuantity!);
      }

      if (filters.maxQuantity) {
        filtered = filtered.filter(prod => prod.quantity <= filters.maxQuantity!);
      }
    }

    return of(filtered).pipe(delay(500));
  }

  getProductionById(id: string): Observable<Production> {
    const production = this.mockProductions.find(p => p.id === id);
    if (production) {
      return of(production).pipe(delay(300));
    }
    return throwError(() => new Error('Production not found'));
  }

  createProduction(production: Omit<Production, 'id' | 'createdAt' | 'updatedAt'>): Observable<Production> {
    const newProduction: Production = {
      ...production,
      id: Math.random().toString(36).substr(2, 9),
      productionNumber: `PROD-${new Date().getFullYear()}-${String(this.mockProductions.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockProductions.push(newProduction);
    return of(newProduction).pipe(delay(800));
  }

  updateProduction(id: string, updates: Partial<Production>): Observable<Production> {
    const index = this.mockProductions.findIndex(p => p.id === id);
    if (index === -1) {
      return throwError(() => new Error('Production not found'));
    }

    this.mockProductions[index] = {
      ...this.mockProductions[index],
      ...updates,
      updatedAt: new Date()
    };

    return of(this.mockProductions[index]).pipe(delay(600));
  }

  deleteProduction(id: string): Observable<boolean> {
    const index = this.mockProductions.findIndex(p => p.id === id);
    if (index === -1) {
      return throwError(() => new Error('Production not found'));
    }

    this.mockProductions.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  // Stock methods
  getStocks(filters?: StockFilters): Observable<Stock[]> {
    let filtered = [...this.mockStocks];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(stock =>
          stock.productType.toLowerCase().includes(searchLower) ||
          stock.productName.toLowerCase().includes(searchLower) ||
          stock.warehouseLocation.toLowerCase().includes(searchLower)
        );
      }

      if (filters.category) {
        filtered = filtered.filter(stock => stock.category === filters.category);
      }

      if (filters.qualityStatus) {
        filtered = filtered.filter(stock => stock.qualityStatus === filters.qualityStatus);
      }

      if (filters.warehouse) {
        filtered = filtered.filter(stock => stock.warehouseLocation === filters.warehouse);
      }

      if (filters.lowStock) {
        filtered = filtered.filter(stock => stock.quantity < stock.minStockLevel);
      }

      if (filters.expiringSoon) {
        const today = new Date();
        const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(stock => 
          stock.shelfLife && stock.shelfLife <= twoWeeksFromNow
        );
      }
    }

    return of(filtered).pipe(delay(500));
  }

  updateStock(id: string, updates: Partial<Stock>): Observable<Stock> {
    const index = this.mockStocks.findIndex(s => s.id === id);
    if (index === -1) {
      return throwError(() => new Error('Stock not found'));
    }

    this.mockStocks[index] = {
      ...this.mockStocks[index],
      ...updates,
      lastUpdated: new Date()
    };

    return of(this.mockStocks[index]).pipe(delay(600));
  }

  // Stock movements
  getStockMovements(stockId?: string): Observable<StockMovement[]> {
    let filtered = [...this.mockStockMovements];

    if (stockId) {
      filtered = filtered.filter(movement => movement.stockId === stockId);
    }

    return of(filtered).pipe(delay(300));
  }

  recordStockMovement(movement: Omit<StockMovement, 'id' | 'createdAt'>): Observable<StockMovement> {
    const newMovement: StockMovement = {
      ...movement,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };

    this.mockStockMovements.push(newMovement);
    return of(newMovement).pipe(delay(600));
  }

  // Statistics
  getProductionStats(): Observable<any> {
    const stats = {
      totalProductions: this.mockProductions.length,
      totalQuantity: this.mockProductions.reduce((sum, p) => sum + p.quantity, 0),
      approvedProductions: this.mockProductions.filter(p => p.status === 'approved').length,
      pendingProductions: this.mockProductions.filter(p => p.status === 'pending').length,
      totalValue: this.mockProductions.reduce((sum, p) => sum + (p.price || 0), 0),
      byProductType: this.mockProductions.reduce((acc, p) => {
        acc[p.productType] = (acc[p.productType] || 0) + p.quantity;
        return acc;
      }, {} as Record<string, number>)
    };

    return of(stats).pipe(delay(300));
  }

  getStockStats(): Observable<any> {
    const stats = {
      totalStockItems: this.mockStocks.length,
      totalStockValue: this.mockStocks.reduce((sum, s) => sum + (s.value || 0), 0),
      totalQuantity: this.mockStocks.reduce((sum, s) => sum + s.quantity, 0),
      lowStockItems: this.mockStocks.filter(s => s.quantity < s.minStockLevel).length,
      expiringSoon: this.mockStocks.filter(s => {
        if (!s.shelfLife) return false;
        const twoWeeksFromNow = new Date();
        twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
        return s.shelfLife <= twoWeeksFromNow;
      }).length,
      byCategory: this.mockStocks.reduce((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + s.quantity;
        return acc;
      }, {} as Record<string, number>)
    };

    return of(stats).pipe(delay(300));
  }
}