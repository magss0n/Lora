import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule


interface AudioFile {
  language: string;
  url: string;
}

interface Announcement {
  id: number;
  title: string;
  pdfUrl: string;
  audioFiles: AudioFile[];
}

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, FormsModule], // <-- Add FormsModule here
  templateUrl: './announcements.html',
  styleUrl: './announcements.scss',
})
export class Announcements {
   announcements: Announcement[] = []; // List of announcements
  showUploadModal = false;

  newAnnouncement: {
    title: string;
    pdfFile: File | null;
    audioFiles: File[];
  } = {
    title: '',
    pdfFile: null,
    audioFiles: [],
  };

  // Audio recording
  mediaRecorder: any;
  audioChunks: any[] = [];

  // Open upload modal
  openUploadModal() {
    this.showUploadModal = true;
  }

  // Close upload modal
  closeUploadModal() {
    this.showUploadModal = false;
    this.resetNewAnnouncement();
  }

  // Reset form
  resetNewAnnouncement() {
    this.newAnnouncement = {
      title: '',
      pdfFile: null,
      audioFiles: [],
    };
    this.audioChunks = [];
  }

  // Handle PDF upload
  handlePdfUpload(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.newAnnouncement.pdfFile = file;
    } else {
      alert('Please select a valid PDF file.');
    }
  }

  // Handle audio file upload
  handleAudioUpload(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file?.type.startsWith('audio/')) {
        this.newAnnouncement.audioFiles.push(file);
      }
    }
  }

  // Start recording audio
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        this.newAnnouncement.audioFiles.push(new File([blob], 'recorded-audio.mp3', { type: 'audio/mp3' }));
      };

      this.mediaRecorder.start();
      alert('Recording started. Click again to stop.');

      // Stop after 30 seconds automatically if user forgets
      setTimeout(() => {
        if (this.mediaRecorder.state !== 'inactive') {
          this.stopRecording();
        }
      }, 30000);
    } catch (err) {
      console.error(err);
      alert('Microphone access denied or unavailable.');
    }
  }

  // Stop recording audio
  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      alert('Recording stopped.');
    }
  }

  // Upload announcement
  uploadAnnouncement() {
    if (!this.newAnnouncement.title || !this.newAnnouncement.pdfFile) {
      alert('Please provide a title and PDF file.');
      return;
    }

    // Convert audio files to AudioFile objects
    const audioFiles: AudioFile[] = this.newAnnouncement.audioFiles.map((file, index) => {
      return { language: `Audio ${index + 1}`, url: URL.createObjectURL(file) };
    });

    // Add to announcements list
    const newAnn: Announcement = {
      id: this.announcements.length + 1,
      title: this.newAnnouncement.title,
      pdfUrl: URL.createObjectURL(this.newAnnouncement.pdfFile),
      audioFiles: audioFiles,
    };

    this.announcements.push(newAnn);
    this.closeUploadModal();
  }

  // Edit announcement (simplified)
  editAnnouncement(ann: Announcement) {
    alert(`Edit functionality for "${ann.title}" not implemented yet.`);
  }

  // Delete announcement
  deleteAnnouncement(ann: Announcement) {
    if (confirm(`Are you sure you want to delete "${ann.title}"?`)) {
      this.announcements = this.announcements.filter(a => a.id !== ann.id);
    }
  }
}
