// src/app/core/services/communication.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  Announcement, 
  MessageTemplate, 
  NeedPublication,
  CommunicationStats,
  CommunicationFilters,
  SupplierResponse
} from '../models/communication';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private mockAnnouncements: Announcement[] = [
    {
      id: '1',
      title: 'Market Price Update - January 2024',
      message: 'Current market prices: Maize - ₦25,000/bag, Rice - ₦35,000/bag, Cassava - ₦15,000/bag. Best time to sell is next week.',
      messageType: 'text',
      language: 'English',
      targetAudience: {
        type: 'all',
        groupIds: [],
        farmerIds: []
      },
      schedule: {
        sendNow: true,
        scheduledDate: new Date('2024-01-15T10:00:00'),
        repeat: 'none'
      },
      status: 'sent',
      sentDate: new Date('2024-01-15T10:00:00'),
      readCount: 145,
      totalRecipients: 200,
      createdBy: 'Admin User',
      createdAt: new Date('2024-01-14T14:30:00'),
      updatedAt: new Date('2024-01-15T10:00:00')
    },
    {
      id: '2',
      title: 'Weather Alert - Heavy Rainfall Expected',
      message: 'Heavy rainfall expected in the region tomorrow. Please secure your crops and equipment.',
      messageType: 'audio',
      audioUrl: 'weather-alert.mp3',
      language: 'Hausa',
      targetAudience: {
        type: 'group',
        groupIds: ['group-1', 'group-2'],
        farmerIds: []
      },
      schedule: {
        sendNow: false,
        scheduledDate: new Date('2024-01-20T08:00:00'),
        repeat: 'daily'
      },
      status: 'scheduled',
      readCount: 0,
      totalRecipients: 150,
      createdBy: 'Weather Officer',
      createdAt: new Date('2024-01-18T09:15:00'),
      updatedAt: new Date('2024-01-18T09:15:00')
    },
    {
      id: '3',
      title: 'Organic Farming Training Invitation',
      message: 'Join our organic farming training session on January 25th. Learn sustainable practices and get certified.',
      messageType: 'text',
      language: 'Yoruba',
      targetAudience: {
        type: 'individual',
        groupIds: [],
        farmerIds: ['farmer-1', 'farmer-2', 'farmer-3']
      },
      schedule: {
        sendNow: true,
        scheduledDate: new Date('2024-01-19T14:00:00'),
        repeat: 'none'
      },
      status: 'sent',
      sentDate: new Date('2024-01-19T14:00:00'),
      readCount: 85,
      totalRecipients: 120,
      createdBy: 'Training Coordinator',
      createdAt: new Date('2024-01-17T11:20:00'),
      updatedAt: new Date('2024-01-19T14:00:00')
    },
    {
      id: '4',
      title: 'Payment Processing Notification',
      message: 'Your payment for December deliveries has been processed. Check your account in 24-48 hours.',
      messageType: 'text',
      language: 'English',
      targetAudience: {
        type: 'all',
        groupIds: [],
        farmerIds: []
      },
      schedule: {
        sendNow: true,
        scheduledDate: new Date('2024-01-10T09:00:00'),
        repeat: 'weekly'
      },
      status: 'sent',
      sentDate: new Date('2024-01-10T09:00:00'),
      readCount: 180,
      totalRecipients: 200,
      createdBy: 'Finance Department',
      createdAt: new Date('2024-01-09T16:45:00'),
      updatedAt: new Date('2024-01-10T09:00:00')
    },
    {
      id: '5',
      title: 'Plant Health Advisory - Pest Control',
      message: 'Warning: Increased pest activity detected in maize fields. Apply recommended pesticides immediately.',
      messageType: 'audio',
      audioUrl: 'pest-alert.mp3',
      language: 'Igbo',
      targetAudience: {
        type: 'group',
        groupIds: ['group-3'],
        farmerIds: []
      },
      schedule: {
        sendNow: true,
        scheduledDate: new Date('2024-01-12T07:30:00'),
        repeat: 'none'
      },
      status: 'failed',
      readCount: 45,
      totalRecipients: 75,
      createdBy: 'Plant Health Officer',
      createdAt: new Date('2024-01-11T15:20:00'),
      updatedAt: new Date('2024-01-12T07:30:00')
    }
  ];

  private mockTemplates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Market Price Update Template',
      category: 'market_prices',
      content: 'Current market prices for {crop}: ₦{price} per {unit}. Best time to sell: {timing}.',
      language: 'English',
      variables: ['crop', 'price', 'unit', 'timing'],
      createdBy: 'Admin',
      createdAt: new Date('2024-01-01T10:00:00'),
      updatedAt: new Date('2024-01-01T10:00:00')
    },
    {
      id: '2',
      name: 'Weather Alert Template',
      category: 'weather',
      content: 'Weather alert: {condition} expected on {date}. {action}.',
      language: 'Multilingual',
      variables: ['condition', 'date', 'action'],
      createdBy: 'Weather Officer',
      createdAt: new Date('2024-01-02T11:30:00'),
      updatedAt: new Date('2024-01-02T11:30:00')
    },
    {
      id: '3',
      name: 'Payment Notification',
      category: 'payment',
      content: 'Your payment of ₦{amount} for {period} has been processed. Transaction ID: {transactionId}',
      language: 'English',
      variables: ['amount', 'period', 'transactionId'],
      createdBy: 'Finance',
      createdAt: new Date('2024-01-03T09:15:00'),
      updatedAt: new Date('2024-01-03T09:15:00')
    },
    {
      id: '4',
      name: 'Training Invitation',
      category: 'training',
      content: 'You are invited to {training_name} on {date} at {location}. Topics: {topics}.',
      language: 'Yoruba',
      variables: ['training_name', 'date', 'location', 'topics'],
      createdBy: 'Training Coordinator',
      createdAt: new Date('2024-01-04T14:20:00'),
      updatedAt: new Date('2024-01-04T14:20:00')
    }
  ];

  private mockNeeds: NeedPublication[] = [
    {
      id: '1',
      title: 'Organic Maize Seeds Required',
      description: 'Looking for 100kg of certified organic maize seeds for the upcoming planting season.',
      category: 'seeds',
      quantity: 100,
      unit: 'kg',
      urgency: 'high',
      deadline: new Date('2024-02-15'),
      status: 'open',
      createdBy: 'Farm Manager',
      createdAt: new Date('2024-01-18T10:00:00'),
      updatedAt: new Date('2024-01-18T10:00:00'),
      responses: [
        {
          id: 'resp-1',
          supplierName: 'Agro Seeds Ltd',
          contact: '+2348012345678',
          price: 250000,
          availabilityDate: new Date('2024-01-25'),
          notes: 'Certified organic, bulk discount available',
          status: 'pending',
          createdAt: new Date('2024-01-19T11:30:00')
        }
      ]
    },
    {
      id: '2',
      title: 'NPK Fertilizer Urgently Needed',
      description: 'Need 50 bags of NPK fertilizer for immediate use. Prefer organic options.',
      category: 'fertilizers',
      quantity: 50,
      unit: 'bags',
      urgency: 'critical',
      deadline: new Date('2024-01-25'),
      status: 'processing',
      farmerId: 'farmer-1',
      createdBy: 'John Doe',
      createdAt: new Date('2024-01-17T14:30:00'),
      updatedAt: new Date('2024-01-19T09:15:00'),
      responses: [
        {
          id: 'resp-2',
          supplierName: 'Green Fertilizers',
          contact: '+2348023456789',
          price: 1500000,
          availabilityDate: new Date('2024-01-22'),
          notes: 'Can deliver tomorrow',
          status: 'accepted',
          createdAt: new Date('2024-01-18T10:15:00')
        }
      ]
    }
  ];

  constructor() {}

  // Announcements
  getAnnouncements(filters?: CommunicationFilters): Observable<Announcement[]> {
    let filtered = [...this.mockAnnouncements];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchLower) ||
          item.message.toLowerCase().includes(searchLower)
        );
      }

      if (filters.messageType) {
        filtered = filtered.filter(item => item.messageType === filters.messageType);
      }

      if (filters.status) {
        filtered = filtered.filter(item => item.status === filters.status);
      }
    }

    return of(filtered).pipe(delay(500));
  }

  getAnnouncementById(id: string): Observable<Announcement> {
    const announcement = this.mockAnnouncements.find(a => a.id === id);
    if (announcement) {
      return of(announcement).pipe(delay(300));
    }
    return throwError(() => new Error('Announcement not found'));
  }

  createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Observable<Announcement> {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockAnnouncements.push(newAnnouncement);
    return of(newAnnouncement).pipe(delay(800));
  }

  updateAnnouncement(id: string, updates: Partial<Announcement>): Observable<Announcement> {
    const index = this.mockAnnouncements.findIndex(a => a.id === id);
    if (index === -1) {
      return throwError(() => new Error('Announcement not found'));
    }

    this.mockAnnouncements[index] = {
      ...this.mockAnnouncements[index],
      ...updates,
      updatedAt: new Date()
    };

    return of(this.mockAnnouncements[index]).pipe(delay(600));
  }

  deleteAnnouncement(id: string): Observable<boolean> {
    const index = this.mockAnnouncements.findIndex(a => a.id === id);
    if (index === -1) {
      return throwError(() => new Error('Announcement not found'));
    }

    this.mockAnnouncements.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  // Message Templates
  getTemplates(): Observable<MessageTemplate[]> {
    return of(this.mockTemplates).pipe(delay(500));
  }

  createTemplate(template: Omit<MessageTemplate, 'id' | 'createdAt' | 'updatedAt'>): Observable<MessageTemplate> {
    const newTemplate: MessageTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockTemplates.push(newTemplate);
    return of(newTemplate).pipe(delay(800));
  }

  // Needs Publications
  getNeeds(filters?: CommunicationFilters): Observable<NeedPublication[]> {
    let filtered = [...this.mockNeeds];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
        );
      }

      if (filters.category) {
        filtered = filtered.filter(item => item.category === filters.category);
      }

      if (filters.status) {
        filtered = filtered.filter(item => item.status === filters.status);
      }
    }

    return of(filtered).pipe(delay(500));
  }

  createNeed(need: Omit<NeedPublication, 'id' | 'createdAt' | 'updatedAt' | 'responses'>): Observable<NeedPublication> {
    const newNeed: NeedPublication = {
      ...need,
      id: Math.random().toString(36).substr(2, 9),
      responses: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockNeeds.push(newNeed);
    return of(newNeed).pipe(delay(800));
  }

  addResponse(needId: string, response: Omit<SupplierResponse, 'id' | 'createdAt'>): Observable<SupplierResponse> {
    const need = this.mockNeeds.find(n => n.id === needId);
    if (!need) {
      return throwError(() => new Error('Need not found'));
    }

    const newResponse: SupplierResponse = {
      ...response,
      id: `resp-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date()
    };

    need.responses.push(newResponse);
    need.updatedAt = new Date();

    return of(newResponse).pipe(delay(600));
  }

  // Statistics
  getStats(): Observable<CommunicationStats> {
    const stats: CommunicationStats = {
      totalAnnouncements: this.mockAnnouncements.length,
      scheduledAnnouncements: this.mockAnnouncements.filter(a => a.status === 'scheduled').length,
      sentAnnouncements: this.mockAnnouncements.filter(a => a.status === 'sent').length,
      totalTemplates: this.mockTemplates.length,
      openNeeds: this.mockNeeds.filter(n => n.status === 'open').length,
      responseRate: 75, // Mock data
      readRate: 68 // Mock data
    };

    return of(stats).pipe(delay(300));
  }

  // Send announcement
  sendAnnouncement(id: string): Observable<Announcement> {
    const announcement = this.mockAnnouncements.find(a => a.id === id);
    if (!announcement) {
      return throwError(() => new Error('Announcement not found'));
    }

    announcement.status = 'sent';
    announcement.sentDate = new Date();
    announcement.updatedAt = new Date();
    // Mock read count
    announcement.readCount = Math.floor(Math.random() * announcement.totalRecipients);

    return of(announcement).pipe(delay(800));
  }
}