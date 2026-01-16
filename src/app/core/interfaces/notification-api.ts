export type NotificationSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type NotificationStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
export type NotificationType = 'FLOOD' | 'FIRE' | 'PEST' | 'DISEASE' | 'OTHER';

export interface NotificationDto {
  id: string; // UUID
  type: NotificationType;
  severity: NotificationSeverity;
  status: NotificationStatus;

  title?: string;
  message?: string;

  // Optional fields: backend may provide either or both.
  region?: string;
  location?: string;
  cooperativeName?: string;

  createdAt: string; // ISO string
  read?: boolean;
}

export interface CreateNotificationDto {
  type: NotificationType;
  severity: NotificationSeverity;
  title?: string;
  message?: string;
  region?: string;
  location?: string;
  cooperativeName?: string;
}

export interface UpdateNotificationStatusDto {
  status: NotificationStatus;
}

export interface NotificationSummaryDto {
  totalYtd: number;
  criticalYtd: number;
  highYtd: number;
  mediumYtd: number;
  lowYtd: number;
  newCount: number;
  inProgressCount: number;
  resolvedCount: number;
}
