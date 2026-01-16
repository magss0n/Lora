import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateNotificationDto,
  NotificationDto,
  NotificationSeverity,
  NotificationStatus,
  NotificationSummaryDto,
  NotificationType,
  UpdateNotificationStatusDto,
} from '../interfaces/notification-api';

@Injectable({
  providedIn: 'root',
})
export class NotificationApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + 'api/notifications';

  list(params?: {
    type?: NotificationType;
    severity?: NotificationSeverity;
    status?: NotificationStatus;
    q?: string;
  }): Observable<NotificationDto[]> {
    let httpParams = new HttpParams();

    if (params?.type) httpParams = httpParams.set('type', params.type);
    if (params?.severity) httpParams = httpParams.set('severity', params.severity);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.q) httpParams = httpParams.set('q', params.q);

    return this.http.get<NotificationDto[]>(this.baseUrl, { params: httpParams });
  }

  getAll(): Observable<NotificationDto[]> {
    return this.list();
  }

  create(payload: CreateNotificationDto): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(this.baseUrl, payload);
  }

  getSummary(): Observable<NotificationSummaryDto> {
    return this.http.get<NotificationSummaryDto>(`${this.baseUrl}/summary`);
  }

  updateStatus(id: string, status: NotificationStatus): Observable<NotificationDto> {
    const payload: UpdateNotificationStatusDto = { status };
    return this.http.patch<NotificationDto>(`${this.baseUrl}/${id}/status`, payload);
  }
}
