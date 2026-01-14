// src/app/features/communication/communication.component.ts

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommunicationService } from '../../../core/services/communication';
import { 
  Announcement, 
  MessageTemplate, 
  NeedPublication,
  CommunicationStats,
  CommunicationFilters
} from '../../../core/models/communication';

// SVG Icons
import { 
  UsersIcon,
  CheckCircleIcon,
  PalletIcon,
  PlantIcon,
  AlertIcon,
  XCircleIcon,
  SearchIcon,
  FilterIcon,
  ExportIcon,
  ImportIcon,
  DownloadIcon,
  FileIcon,
  AddFarmerIcon,
  EditFarmerIcon,
  ViewFarmerIcon,
  DeleteFarmerIcon,
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  QrIcon,
  AnnouncementIcon,
  NeedsIcon,
  AudioIcon,
  SendIcon,
  MegaphoneIcon,
  PlayIcon,
  DuplicateIcon,
  SupplierIcon,
  AddCommunicationIcon,
  TemplateIcon,
  CalendarIcon,
  ChartIcon,
  MicIcon,
  PauseIcon,
  StopIcon,
  TextIcon,
  UploadIcon
} from '../../../shared/components/svg-icons/svg-icons';
 
@Component({
  selector: 'app-communication-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Existing icons
    UsersIcon,
    CheckCircleIcon,
    PalletIcon,
    PlantIcon,
    AlertIcon,
    XCircleIcon,
    SearchIcon,
    FilterIcon,
    ExportIcon,
    ImportIcon,
    DownloadIcon,
    UploadIcon,
    FileIcon,
    AddFarmerIcon,
    EditFarmerIcon,
    ViewFarmerIcon,
    DeleteFarmerIcon,
    ClockIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    PhoneIcon,
    MailIcon,
    MapPinIcon,
    QrIcon,
    MicIcon,
    PauseIcon,
    StopIcon,
    TextIcon,
    // New communication icons
    AnnouncementIcon,
    TemplateIcon,
    NeedsIcon,
    AudioIcon,
    SendIcon,
    CalendarIcon,
    MegaphoneIcon,
    ChartIcon,
    PlayIcon,
    DuplicateIcon,
    SupplierIcon,
    AddCommunicationIcon
  ],
  templateUrl: './communication.html',
  styleUrls: ['./communication.scss']
})

export class CommunicationComponent implements OnInit, AfterViewInit {
    // Audio recording properties
  @ViewChild('recordingWaveform') recordingWaveform!: ElementRef<HTMLCanvasElement>;
  @ViewChild('audioWaveform') audioWaveform!: ElementRef<HTMLCanvasElement>;
  
  isRecording: boolean = false;
  isPaused: boolean = false;
  isUploading: boolean = false;
  recordingTime: number = 0;
  audioDuration: number = 0;
  audioBlob: Blob | null = null;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  recordingInterval: any;
  recordingStatusClass: string = 'status-ready';
  recordingStatusText: string = 'Ready to record';
  
  // Audio playback properties
  audioPlayer: HTMLAudioElement | null = null;
  currentTime: number = 0;
  isPlayingAudio: boolean = false;
  playingAnnouncementId: string | null = null;
  
  // File upload properties
  uploadedFile: File | null = null;
  isDragOver: boolean = false;

  // Data
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  templates: MessageTemplate[] = [];
  needs: NeedPublication[] = [];
  
  // Selected items
  selectedAnnouncement: Announcement | null = null;
  selectedTemplate: MessageTemplate | null = null;
  selectedNeed: NeedPublication | null = null;
  selectedResponse: any = null;
  
  // Tabs
  activeTab: 'announcements' | 'templates' | 'needs' = 'announcements';
  announcementTab: 'list' | 'create' | 'view' | 'edit' = 'list';
  needsTab: 'list' | 'create' | 'view' | 'edit' = 'list';
  
  // Filters
  filters: CommunicationFilters = {};
  searchQuery: string = '';
  statusFilter: string = 'all';
  typeFilter: string = 'all';
  categoryFilter: string = 'all';
  
  // Modals
  showCreateAnnouncementModal: boolean = false;
  showCreateTemplateModal: boolean = false;
  showCreateNeedModal: boolean = false;
  showSendAnnouncementModal: boolean = false;
  showResponseModal: boolean = false;
  showImportModal: boolean = false;
  showExportModal: boolean = false;
  showFiltersModal: boolean = false;
  showDeleteModal: boolean = false;
  
  // Forms
  announcementForm: FormGroup;
  templateForm: FormGroup;
  needForm: FormGroup;
  responseForm: FormGroup;
  
  // Loading states
  isLoading: boolean = false;
  isSending: boolean = false;
  isExporting: boolean = false;
  
  // Statistics
  stats: CommunicationStats = {
    totalAnnouncements: 0,
    scheduledAnnouncements: 0,
    sentAnnouncements: 0,
    totalTemplates: 0,
    openNeeds: 0,
    responseRate: 0,
    readRate: 0
  };

  // Options
  languages: string[] = ['English', 'Hausa', 'Yoruba', 'Igbo', 'French'];
  categories: string[] = ['market_prices', 'weather', 'training', 'payment', 'health', 'other'];
  needCategories: string[] = ['seeds', 'fertilizers', 'equipment', 'labor', 'other'];
  urgencyLevels: string[] = ['low', 'medium', 'high', 'critical'];
  repeatOptions: string[] = ['none', 'daily', 'weekly', 'monthly'];
  targetAudienceTypes: string[] = ['all', 'group', 'individual'];
  
  // Mock farmer groups
  farmerGroups: any[] = [
    { id: 'group-1', name: 'Maize Farmers' },
    { id: 'group-2', name: 'Rice Growers' },
    { id: 'group-3', name: 'Organic Certified' },
    { id: 'group-4', name: 'New Members' }
  ];

  constructor(
    private communicationService: CommunicationService,
    private fb: FormBuilder
  ) {
    // Initialize forms 
this.announcementForm = this.fb.group({
  title: ['', Validators.required],
  message: ['', Validators.required],
  messageType: ['text', Validators.required],
  language: ['English', Validators.required],
  targetAudience: this.fb.group({
    type: ['all', Validators.required],
    groupIds: [[]],
    farmerIds: [[]]
  }),
  schedule: this.fb.group({
    sendNow: [true],
    scheduledDate: [null], // Change from '' to null
    repeat: ['none']
  })
});

    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      category: ['other', Validators.required],
      content: ['', Validators.required],
      language: ['English', Validators.required]
    });

    this.needForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['seeds', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      urgency: ['medium', Validators.required],
      deadline: [''],
      notes: ['']
    });

    this.responseForm = this.fb.group({
      supplierName: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      price: [0, [Validators.required, Validators.min(0)]],
      availabilityDate: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadStats();
  }

  loadData(): void {
    this.isLoading = true;
    
    // Load announcements
    this.communicationService.getAnnouncements(this.filters).subscribe({
      next: (announcements) => {
        this.announcements = announcements;
        this.filteredAnnouncements = [...announcements];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading announcements:', error);
        this.isLoading = false;
      }
    });

    // Load templates
    this.communicationService.getTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;
      },
      error: (error) => {
        console.error('Error loading templates:', error);
      }
    });

    // Load needs
    this.communicationService.getNeeds(this.filters).subscribe({
      next: (needs) => {
        this.needs = needs;
      },
      error: (error) => {
        console.error('Error loading needs:', error);
      }
    });
  }

  loadStats(): void {
    this.communicationService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  // Tab management
  setTab(tab: 'announcements' | 'templates' | 'needs'): void {
    this.activeTab = tab;
    this.announcementTab = 'list';
    this.needsTab = 'list';
  }

  // Announcement methods
  openCreateAnnouncement(): void {
    this.announcementForm.reset({
      messageType: 'text',
      language: 'English',
      targetAudience: {
        type: 'all',
        groupIds: [],
        farmerIds: []
      },
      schedule: {
        sendNow: true,
        repeat: 'none'
      }
    });
    this.showCreateAnnouncementModal = true;
  }

  viewAnnouncement(announcement: Announcement): void {
    this.selectedAnnouncement = announcement;
    this.announcementTab = 'view';
  }

  editAnnouncement(announcement: Announcement): void {
    this.selectedAnnouncement = announcement;
    this.announcementForm.patchValue({
      ...announcement,
      schedule: {
        ...announcement.schedule,
        scheduledDate: announcement.schedule.scheduledDate ? 
          this.formatDateForInput(announcement.schedule.scheduledDate) : ''
      }
    });
    this.showCreateAnnouncementModal = true;
  }

  sendAnnouncement(announcement: Announcement): void {
    this.selectedAnnouncement = announcement;
    this.showSendAnnouncementModal = true;
  }

  confirmSendAnnouncement(): void {
    if (!this.selectedAnnouncement) return;

    this.isSending = true;
    this.communicationService.sendAnnouncement(this.selectedAnnouncement.id).subscribe({
      next: () => {
        this.loadData();
        this.loadStats();
        this.showSendAnnouncementModal = false;
        this.isSending = false;
      },
      error: (error) => {
        console.error('Error sending announcement:', error);
        this.isSending = false;
      }
    });
  }

  deleteAnnouncement(announcement: Announcement): void {
    this.selectedAnnouncement = announcement;
    this.showDeleteModal = true;
  }

  confirmDeleteAnnouncement(): void {
    if (!this.selectedAnnouncement) return;

    this.isLoading = true;
    this.communicationService.deleteAnnouncement(this.selectedAnnouncement.id).subscribe({
      next: () => {
        this.loadData();
        this.loadStats();
        this.showDeleteModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting announcement:', error);
        this.isLoading = false;
      }
    });
  }

  // Template methods
  openCreateTemplate(): void {
    this.templateForm.reset({
      category: 'other',
      language: 'English'
    });
    this.showCreateTemplateModal = true;
  }

  createTemplate(): void {
    if (this.templateForm.invalid) return;

    this.isLoading = true;
    this.communicationService.createTemplate({
      ...this.templateForm.value,
      variables: this.extractVariables(this.templateForm.value.content),
      createdBy: 'Current User',
      createdAt: new Date(),
      updatedAt: new Date()
    }).subscribe({
      next: () => {
        this.loadData();
        this.showCreateTemplateModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating template:', error);
        this.isLoading = false;
      }
    });
  }

  useTemplate(template: MessageTemplate): void {
    this.announcementForm.patchValue({
      message: template.content,
      language: template.language
    });
    this.activeTab = 'announcements';
    this.showCreateAnnouncementModal = true;
  }

  // Needs methods
  openCreateNeed(): void {
    this.needForm.reset({
      category: 'seeds',
      urgency: 'medium',
      quantity: 1,
      unit: 'kg'
    });
    this.showCreateNeedModal = true;
  }

  createNeed(): void {
    if (this.needForm.invalid) return;

    const needData = this.needForm.value;
    if (needData.deadline) {
      needData.deadline = new Date(needData.deadline);
    }

    this.isLoading = true;
    this.communicationService.createNeed({
      ...needData,
      status: 'open',
      createdBy: 'Current User',
      createdAt: new Date(),
      updatedAt: new Date()
    }).subscribe({
      next: () => {
        this.loadData();
        this.loadStats();
        this.showCreateNeedModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating need:', error);
        this.isLoading = false;
      }
    });
  }

  viewNeed(need: NeedPublication): void {
    this.selectedNeed = need;
    this.needsTab = 'view';
  }

  addResponse(need: NeedPublication): void {
    this.selectedNeed = need;
    this.responseForm.reset({
      availabilityDate: this.formatDateForInput(new Date())
    });
    this.showResponseModal = true;
  }

  submitResponse(): void {
    if (this.responseForm.invalid || !this.selectedNeed) return;

    const responseData = this.responseForm.value;
    responseData.availabilityDate = new Date(responseData.availabilityDate);

    this.isLoading = true;
    this.communicationService.addResponse(this.selectedNeed.id, {
      ...responseData,
      status: 'pending'
    }).subscribe({
      next: () => {
        this.loadData();
        this.showResponseModal = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding response:', error);
        this.isLoading = false;
      }
    });
  }

  // Helper methods
  extractVariables(content: string): string[] {
    const variablePattern = /\{([^}]+)\}/g;
    const matches = content.match(variablePattern);
    return matches ? matches.map(match => match.slice(1, -1)) : [];
  }

  formatDate(date: Date | string | undefined | null): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

  formatDateForInput(date: Date | string | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

onGroupChange(event: any, groupId: string): void {
  const groupIds = this.announcementForm.get('targetAudience.groupIds')?.value || [];
  
  if (event.target.checked) {
    groupIds.push(groupId);
  } else {
    const index = groupIds.indexOf(groupId);
    if (index > -1) {
      groupIds.splice(index, 1);
    }
  }
  
  this.announcementForm.get('targetAudience.groupIds')?.setValue(groupIds);
}

getAcceptedResponsesCount(need: NeedPublication): number {
  return need.responses.filter((r: any) => r.status === 'accepted').length;
}

// Add these methods for audio recording
  startRecording(): void {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Audio recording is not supported in your browser.');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];
        
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.audioChunks.push(event.data);
          }
        };
        
        this.mediaRecorder.onstop = () => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.audioDuration = this.recordingTime;
          this.recordingTime = 0;
          clearInterval(this.recordingInterval);
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };
        
        this.mediaRecorder.start();
        this.isRecording = true;
        this.isPaused = false;
        this.recordingStatusClass = 'status-recording';
        this.recordingStatusText = 'Recording...';
        
        // Start timer
        this.recordingInterval = setInterval(() => {
          if (!this.isPaused) {
            this.recordingTime++;
            this.drawRecordingWaveform();
          }
        }, 1000);
        
        // Draw initial waveform
        this.drawRecordingWaveform();
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check permissions.');
      });
  }

  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.recordingStatusClass = 'status-ready';
      this.recordingStatusText = 'Recording saved';
    }
  }

  togglePauseRecording(): void {
    if (!this.mediaRecorder) return;
    
    if (this.isPaused) {
      this.mediaRecorder.resume();
      this.isPaused = false;
      this.recordingStatusClass = 'status-recording';
      this.recordingStatusText = 'Recording...';
    } else {
      this.mediaRecorder.pause();
      this.isPaused = true;
      this.recordingStatusClass = 'status-paused';
      this.recordingStatusText = 'Paused';
    }
  }

  drawRecordingWaveform(): void {
    const canvas = this.recordingWaveform?.nativeElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw waveform visualization
    ctx.fillStyle = '#4CAF50';
    
    // Simulate waveform based on recording time
    const bars = 50;
    const barWidth = width / bars;
    
    for (let i = 0; i < bars; i++) {
      const barHeight = Math.random() * height * 0.8 + height * 0.1;
      const x = i * barWidth;
      const y = (height - barHeight) / 2;
      
      ctx.fillRect(x, y, barWidth - 2, barHeight);
    }
  }

  playRecording(): void {
    if (!this.audioBlob) return;
    
    const audioUrl = URL.createObjectURL(this.audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };
  }

  deleteRecording(): void {
    this.audioBlob = null;
    this.audioDuration = 0;
    this.recordingTime = 0;
    
    // Clear waveform
    const canvas = this.recordingWaveform?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // File upload methods
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleAudioFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleAudioFile(input.files[0]);
    }
  }

  handleAudioFile(file: File): void {
    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/x-m4a'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid audio file (MP3, WAV, or M4A).');
      return;
    }
    
    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 10MB.');
      return;
    }
    
    this.uploadedFile = file;
    
    // Get audio duration
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.addEventListener('loadedmetadata', () => {
      this.audioDuration = audio.duration;
      URL.revokeObjectURL(audio.src);
    });
  }

  playUploadedAudio(): void {
    if (!this.uploadedFile) return;
    
    const audioUrl = URL.createObjectURL(this.uploadedFile);
    const audio = new Audio(audioUrl);
    audio.play();
    
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };
  }

  removeUploadedFile(): void {
    this.uploadedFile = null;
    this.audioDuration = 0;
  }

  // Formatting helpers
  formatRecordingTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  getAudioDurationFromFile(file: File): string {
    // This is a mock implementation
    // In a real app, you would extract duration from the file
    return '--:--';
  }

  // Audio playback for announcement view
  isPlaying(announcement: Announcement): boolean {
    return this.isPlayingAudio && this.playingAnnouncementId === announcement.id;
  }

  toggleAudioPlayback(announcement: Announcement): void {
    if (this.isPlaying(announcement)) {
      this.stopAudio();
    } else {
      this.playAudioMessage(announcement.audioUrl!);
      this.playingAnnouncementId = announcement.id;
    }
  }

  playAudioMessage(audioUrl: string): void {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer = null;
    }
    
    this.audioPlayer = new Audio(audioUrl);
    this.audioPlayer.play();
    this.isPlayingAudio = true;
    
    this.audioPlayer.ontimeupdate = () => {
      this.currentTime = this.audioPlayer?.currentTime || 0;
    };
    
    this.audioPlayer.onended = () => {
      this.stopAudio();
    };
    
    // Draw waveform
    this.drawAudioWaveform();
  }

  stopAudio(): void {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer = null;
    }
    this.isPlayingAudio = false;
    this.playingAnnouncementId = null;
    this.currentTime = 0;
  }

  drawAudioWaveform(): void {
    const canvas = this.audioWaveform?.nativeElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw waveform
    ctx.fillStyle = '#2196F3';
    
    const bars = 100;
    const barWidth = width / bars;
    
    for (let i = 0; i < bars; i++) {
      const progress = i / bars;
      const barHeight = Math.sin(progress * Math.PI * 4) * 0.5 + 0.5;
      const scaledHeight = barHeight * height * 0.8;
      const x = i * barWidth;
      const y = (height - scaledHeight) / 2;
      
      ctx.fillRect(x, y, barWidth - 1, scaledHeight);
    }
    
    // Draw progress indicator
    const progress = this.getAudioProgress();
    const progressX = progress * width;
    
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(progressX - 2, 0, 4, height);
  }

  getAudioProgress(): number {
    if (!this.audioPlayer || !this.selectedAnnouncement?.audioDuration) return 0;
    return (this.currentTime / (this.selectedAnnouncement.audioDuration || 0)) * 100;
  }

  getAudioDuration(announcement: Announcement): string {
    if (!announcement.audioDuration) return '--:--';
    return this.formatRecordingTime(announcement.audioDuration);
  }

  getAudioSize(announcement: Announcement): string {
    // Mock implementation - in real app, this would come from the announcement data
    return '2.5 MB';
  }

  formatAudioTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Updated createAnnouncement method with audio handling
  createAnnouncement(): void {
    if (this.announcementForm.invalid) return;

    const announcementData = this.announcementForm.value;
    
    // Handle audio file
    if (announcementData.messageType === 'audio') {
      if (!this.audioBlob && !this.uploadedFile) {
        alert('Please record or upload an audio file.');
        return;
      }
      
      // In a real app, you would upload the audio file to a server
      // For now, we'll mock it
      announcementData.audioUrl = 'assets/audio/sample-announcement.mp3';
      announcementData.audioDuration = this.audioDuration;
    }
    
    // Handle scheduledDate properly
    if (announcementData.schedule.scheduledDate && !announcementData.schedule.sendNow) {
      announcementData.schedule.scheduledDate = new Date(announcementData.schedule.scheduledDate);
    } else {
      announcementData.schedule.scheduledDate = undefined;
    }

    this.isLoading = true;
    this.communicationService.createAnnouncement({
      ...announcementData,
      status: announcementData.schedule.sendNow ? 'sent' : 'scheduled',
      sentDate: announcementData.schedule.sendNow ? new Date() : undefined,
      readCount: 0,
      totalRecipients: 200, // Mock value
      createdBy: 'Current User',
      createdAt: new Date(),
      updatedAt: new Date()
    }).subscribe({
      next: () => {
        this.loadData();
        this.loadStats();
        this.showCreateAnnouncementModal = false;
        this.isLoading = false;
        
        // Reset audio recording state
        this.audioBlob = null;
        this.uploadedFile = null;
        this.audioDuration = 0;
        this.recordingTime = 0;
        this.isRecording = false;
        this.isPaused = false;
      },
      error: (error) => {
        console.error('Error creating announcement:', error);
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    // Initialize canvases
    setTimeout(() => {
      this.drawRecordingWaveform();
      this.drawAudioWaveform();
    }, 100);
  }


  getStatusClass(status: string): string {
  switch (status) {
    case 'sent':
    case 'active':
    case 'open':
    case 'paid':
    case 'accepted':
      return 'status-active';
    case 'scheduled':
    case 'pending':
      return 'status-pending';
    case 'draft':
    case 'inactive':
      return 'status-inactive';
    case 'failed':
    case 'suspended':
    case 'cancelled':
    case 'rejected':
      return 'status-suspended';
    case 'processing':
      return 'status-processing';
    default:
      return 'status-unknown';
  }
}

  getUrgencyClass(urgency: string): string {
    switch (urgency) {
      case 'low': return 'urgency-low';
      case 'medium': return 'urgency-medium';
      case 'high': return 'urgency-high';
      case 'critical': return 'urgency-critical';
      default: return 'urgency-unknown';
    }
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'market_prices': return 'category-market';
      case 'weather': return 'category-weather';
      case 'training': return 'category-training';
      case 'payment': return 'category-payment';
      case 'health': return 'category-health';
      default: return 'category-other';
    }
  }

  getNeedCategoryClass(category: string): string {
    switch (category) {
      case 'seeds': return 'need-seeds';
      case 'fertilizers': return 'need-fertilizers';
      case 'equipment': return 'need-equipment';
      case 'labor': return 'need-labor';
      default: return 'need-other';
    }
  }

  // Search and filter methods
  onSearch(): void {
    this.loadData();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  applyFilters(): void {
    this.loadData();
    this.showFiltersModal = false;
  }

  clearFilters(): void {
    this.filters = {};
    this.statusFilter = 'all';
    this.typeFilter = 'all';
    this.categoryFilter = 'all';
    this.applyFilters();
  }

  // Modal management
  closeModal(): void {
    this.showCreateAnnouncementModal = false;
    this.showCreateTemplateModal = false;
    this.showCreateNeedModal = false;
    this.showSendAnnouncementModal = false;
    this.showResponseModal = false;
    this.showImportModal = false;
    this.showExportModal = false;
    this.showFiltersModal = false;
    this.showDeleteModal = false;
    this.selectedAnnouncement = null;
    this.selectedNeed = null;
    this.selectedResponse = null;
    
    // Reset audio recording state
    this.audioBlob = null;
    this.uploadedFile = null;
    this.audioDuration = 0;
    this.recordingTime = 0;
    this.isRecording = false;
    this.isPaused = false;
    this.stopAudio();
  }

  // Read rate calculation
  getReadRate(announcement: Announcement): number {
    return announcement.totalRecipients > 0 
      ? Math.round((announcement.readCount / announcement.totalRecipients) * 100) 
      : 0;
  }

  getReadRateClass(readRate: number): string {
    if (readRate >= 80) return 'rate-excellent';
    if (readRate >= 60) return 'rate-good';
    if (readRate >= 40) return 'rate-fair';
    return 'rate-poor';
  }
}