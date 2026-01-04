import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Import SVG icons
import { SearchIcon, BellIcon, MailIcon, MenuIcon } from '../svg-icons/svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SearchIcon,
    BellIcon,
    MailIcon,
    MenuIcon
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  searchQuery: string = '';
  
  notifications = [
    { id: 1, title: 'New member registered', time: '2h ago', read: false },
    { id: 2, title: 'Payment processed', time: '4h ago', read: false },
    { id: 3, title: 'Low stock alert', time: '6h ago', read: true },
    { id: 4, title: 'Weather alert', time: '1d ago', read: true },
    { id: 5, title: 'Harvest season begins', time: '2d ago', read: true }
  ];
  
  messages = [
    { id: 1, title: 'Weather alert', preview: 'Heavy rain expected tomorrow...', time: '1h ago', read: false },
    { id: 2, title: 'Market update', preview: 'Maize prices increased by 15%...', time: '3h ago', read: true },
    { id: 3, title: 'Cooperative meeting', preview: 'Monthly meeting scheduled for...', time: '5h ago', read: true }
  ];
  
  unreadNotifications = this.notifications.filter(n => !n.read).length;
  unreadMessages = this.messages.filter(m => !m.read).length;
  
  // Mock background image URL (you can replace with actual image)
  headerBackgroundImage = 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)';
  
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
  
  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Implement search logic
    }
  }
  
  markAllNotificationsAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.unreadNotifications = 0;
  }
  
  markAllMessagesAsRead(): void {
    this.messages.forEach(m => m.read = true);
    this.unreadMessages = 0;
  }
}