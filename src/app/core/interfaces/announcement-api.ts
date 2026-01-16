export type TargetAudience = 'FARMERS' | 'COOPERATIVES' | 'ALL';
export type AnnouncementStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export interface ApiFile {
  id: number;
  fileName: string;
  fileUrl: string;
  publicId?: string;
  fileType?: string;
  fileSize?: number;
  uploadDate?: string;
}

export interface TranslationDto {
  id: number;
  languageCode: string;
  translatedTitle: string;
  translatedContent: string;
  audioFile?: ApiFile | null;
}

export interface AnnouncementDto {
  id: number;
  title: string;
  message: string;
  targetAudience: TargetAudience;
  createdByAgentId: number;
  status?: AnnouncementStatus | string;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  translations?: TranslationDto[];
  attachments?: ApiFile[];
}

export interface CreateAnnouncementDto {
  title: string;
  message: string;
  targetAudience: TargetAudience;
  createdByAgentId: number;
  translations?: Array<{
    languageCode: string;
    translatedTitle: string;
    translatedContent: string;
  }>;
}

export interface LanguageDto {
  id: number;
  code: string;
  name: string;
  isActive?: boolean;
}
