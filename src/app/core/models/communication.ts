// src/app/core/models/communication.model.ts

// In your communication.models.ts file
export interface Announcement {
  id: string;
  title: string;
  message: string;
  messageType: 'text' | 'audio';
  language: string;
  targetAudience: {
    type: 'all' | 'group' | 'individual';
    groupIds?: string[];
    farmerIds?: string[];
  };
  schedule: {
    sendNow: boolean;
    scheduledDate?: Date;
    repeat: 'none' | 'daily' | 'weekly' | 'monthly';
  };
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  readCount: number;
  totalRecipients: number;
  sentDate?: Date;
  audioUrl?: string;
  audioDuration?: number; // Add this property
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: 'market_prices' | 'weather' | 'training' | 'payment' | 'health' | 'other';
  content: string;
  language: string;
  variables: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NeedPublication { 
  id: string;
  title: string;
  description: string;
  category: 'seeds' | 'fertilizers' | 'equipment' | 'labor' | 'other';
  quantity: number;
  unit: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  deadline?: Date;
  status: 'open' | 'processing' | 'fulfilled' | 'cancelled';
  farmerId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  responses: SupplierResponse[];
  notes?: string;  
}

export interface SupplierResponse {
  id: string;
  supplierName: string;
  contact: string;
  price: number;
  availabilityDate: Date;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface CommunicationStats {
  totalAnnouncements: number;
  scheduledAnnouncements: number;
  sentAnnouncements: number;
  totalTemplates: number;
  openNeeds: number;
  responseRate: number;
  readRate: number;
}

export interface CommunicationFilters {
  search?: string;
  messageType?: 'text' | 'audio';
  status?: string;
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}