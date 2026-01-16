import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { AnnouncementApiService } from '../../../core/services/announcement-api';
import {
  AnnouncementDto,
  LanguageDto,
  TargetAudience,
} from '../../../core/interfaces/announcement-api';

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './announcements.html',
  styleUrl: './announcements.scss',
})
export class Announcements implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AnnouncementApiService);
  private readonly auth = inject(AuthService);

  announcements: AnnouncementDto[] = [];
  languages: LanguageDto[] = [];

  loading = false;
  saving = false;
  errorMessage: string | null = null;

  showUploadModal = false;

  readonly targetAudiences: TargetAudience[] = ['ALL', 'FARMERS', 'COOPERATIVES'];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    message: ['', [Validators.required]],
    targetAudience: ['ALL' as TargetAudience, [Validators.required]],
    createdByAgentId: [null as number | null, [Validators.required]],
    pdfFile: [null as File | null],
    translations: this.fb.array<FormGroup>([]),
  });

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    const agentId = currentUser?.id ? Number(currentUser.id) : null;
    if (agentId && !Number.isNaN(agentId)) {
      this.form.patchValue({ createdByAgentId: agentId });
    }

    this.loadPageData();
  }

  get translations(): FormArray<FormGroup> {
    return this.form.get('translations') as FormArray<FormGroup>;
  }

  translationAt(index: number): AbstractControl {
    return this.translations.at(index);
  }

  private loadPageData(): void {
    this.loading = true;
    this.errorMessage = null;

    forkJoin({
      announcements: this.api.getAnnouncements(),
      languages: this.api.getLanguages(true),
    }).subscribe({
      next: ({ announcements, languages }) => {
        this.announcements = announcements;
        this.languages = languages;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load announcements. Please try again.';
        this.loading = false;
      },
    });
  }

  openUploadModal(): void {
    this.showUploadModal = true;
    this.errorMessage = null;
    if (this.translations.length === 0) {
      this.addTranslation();
    }
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.resetForm();
  }

  resetForm(): void {
    const createdByAgentId = this.form.value.createdByAgentId;
    this.form.reset({
      title: '',
      message: '',
      targetAudience: 'ALL',
      createdByAgentId: createdByAgentId ?? null,
      pdfFile: null,
      translations: [],
    });
    this.translations.clear();
  }

  addTranslation(): void {
    this.translations.push(
      this.fb.group({
        languageCode: ['', [Validators.required]],
        translatedTitle: ['', [Validators.required]],
        translatedContent: ['', [Validators.required]],
        audioFile: [null as File | null],
      })
    );
  }

  removeTranslation(index: number): void {
    this.translations.removeAt(index);
  }

  handlePdfUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      this.form.patchValue({ pdfFile: null });
      return;
    }
    if (file.type !== 'application/pdf') {
      this.errorMessage = 'Please select a valid PDF file.';
      this.form.patchValue({ pdfFile: null });
      input.value = '';
      return;
    }
    this.form.patchValue({ pdfFile: file });
  }

  handleTranslationAudioUpload(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      this.translations.at(index).patchValue({ audioFile: null });
      return;
    }
    if (!file.type.startsWith('audio/')) {
      this.errorMessage = 'Please select a valid audio file.';
      this.translations.at(index).patchValue({ audioFile: null });
      input.value = '';
      return;
    }
    this.translations.at(index).patchValue({ audioFile: file });
  }

  createAnnouncement(): void {
    this.errorMessage = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const pdfFile = this.form.value.pdfFile ?? null;

    const translations = this.translations.controls
      .map(ctrl => ctrl.value)
      .filter(t => !!t.languageCode && !!t.translatedTitle && !!t.translatedContent)
      .map(t => ({
        languageCode: String(t.languageCode),
        translatedTitle: String(t.translatedTitle),
        translatedContent: String(t.translatedContent),
      }));

    const payload = {
      title: String(this.form.value.title),
      message: String(this.form.value.message),
      targetAudience: this.form.value.targetAudience as TargetAudience,
      createdByAgentId: Number(this.form.value.createdByAgentId),
      translations: translations.length > 0 ? translations : undefined,
    };

    this.saving = true;

    this.api.createAnnouncement(payload).pipe(
      switchMap((created) => {
        const uploads = [] as Array<ReturnType<typeof of>>;

        const uploadCalls = [] as Array<ReturnType<typeof this.api.uploadFileForAnnouncement>>;

        if (pdfFile) {
          uploadCalls.push(this.api.uploadFileForAnnouncement(created.id, pdfFile));
        }

        const createdTranslations = created.translations ?? [];
        const translationForms = this.translations.controls.map(c => c.value);

        for (const createdTr of createdTranslations) {
          const match = translationForms.find(tf => tf.languageCode === createdTr.languageCode);
          const audioFile = (match?.audioFile as File | null | undefined) ?? null;
          if (audioFile) {
            uploadCalls.push(this.api.uploadFileForTranslation(createdTr.id, audioFile));
          }
        }

        if (uploadCalls.length === 0) {
          return of(created);
        }

        return forkJoin(uploadCalls).pipe(map(() => created));
      })
    ).subscribe({
      next: () => {
        this.saving = false;
        this.closeUploadModal();
        this.loadPageData();
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        this.errorMessage = 'Failed to create announcement. Please check your inputs and try again.';
      },
    });
  }

  deleteAnnouncement(ann: AnnouncementDto): void {
    if (!confirm(`Are you sure you want to delete "${ann.title}"?`)) {
      return;
    }
    this.api.deleteAnnouncement(ann.id).subscribe({
      next: () => this.loadPageData(),
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to delete announcement.';
      },
    });
  }
}
