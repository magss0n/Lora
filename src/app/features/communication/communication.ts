import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
  targetAudience: 'all' | 'group' | 'individual';
  sentDate: Date;
  status: 'draft' | 'sent' | 'scheduled';
  language: string;
}

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communication.html',
  styleUrls: ['./communication.scss']
})
export class CommunicationComponent implements OnInit {
  messages: Message[] = [];
  activeTab: 'announcements' | 'needs' | 'templates' = 'announcements';
  showCreateModal: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    // TODO: Load from service
  }

  switchTab(tab: 'announcements' | 'needs' | 'templates'): void {
    this.activeTab = tab;
  }

  createAnnouncement(): void {
    this.showCreateModal = true;
  }

  recordAudio(): void {
    console.log('Record audio message');
  }

  sendMessage(messageId: string): void {
    console.log('Send message:', messageId);
  }
}