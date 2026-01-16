import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AnnouncementDto,
  AnnouncementStatus,
  CreateAnnouncementDto,
  LanguageDto,
  ApiFile,
  TranslationDto,
} from '../interfaces/announcement-api';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementApiService {
  private readonly http = inject(HttpClient);

  private readonly announcementsBaseUrl = environment.apiUrl + 'api/announcements';
  private readonly translationsBaseUrl = environment.apiUrl + 'api/translations';
  private readonly filesBaseUrl = environment.apiUrl + 'api/files';
  private readonly languagesBaseUrl = environment.apiUrl + 'api/languages';

  getAnnouncements(): Observable<AnnouncementDto[]> {
    return this.http.get<AnnouncementDto[]>(this.announcementsBaseUrl);
  }

  countByStatus(status: AnnouncementStatus): Observable<number> {
    return this.http.get<number>(`${this.announcementsBaseUrl}/stats/count`, {
      params: {
        status,
      },
    });
  }

  createAnnouncement(payload: CreateAnnouncementDto): Observable<AnnouncementDto> {
    return this.http.post<AnnouncementDto>(this.announcementsBaseUrl, payload);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.announcementsBaseUrl}/${id}`);
  }

  getLanguages(activeOnly = true): Observable<LanguageDto[]> {
    return this.http.get<LanguageDto[]>(this.languagesBaseUrl, {
      params: {
        activeOnly: String(activeOnly),
      },
    });
  }

  getTranslationsByAnnouncement(announcementId: number): Observable<TranslationDto[]> {
    return this.http.get<TranslationDto[]>(
      `${this.translationsBaseUrl}/announcement/${announcementId}`
    );
  }

  createTranslation(announcementId: number, translation: Omit<TranslationDto, 'id'>): Observable<TranslationDto> {
    return this.http.post<TranslationDto>(
      `${this.translationsBaseUrl}/announcement/${announcementId}`,
      translation
    );
  }

  uploadFileForAnnouncement(announcementId: number, file: File): Observable<ApiFile> {
    const form = new FormData();
    form.append('type', 'announcement');
    form.append('parentId', String(announcementId));
    form.append('file', file);

    return this.http.post<ApiFile>(`${this.filesBaseUrl}/upload`, form);
  }

  uploadFileForTranslation(translationId: number, file: File): Observable<ApiFile> {
    const form = new FormData();
    form.append('type', 'translation');
    form.append('parentId', String(translationId));
    form.append('file', file);

    return this.http.post<ApiFile>(`${this.filesBaseUrl}/upload`, form);
  }
}
