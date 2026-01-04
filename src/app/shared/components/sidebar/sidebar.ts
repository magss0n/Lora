import { Component, Output, EventEmitter, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import SVG icons
import { 
  DashboardIcon, 
  UsersIcon, 
  PalletIcon, 
  PlantIcon, 
  CreditIcon,
  SalesIcon,
  ContractIcon,
  CommunicationIcon,
  ReportsIcon,
  SettingsIcon,
  LogoIcon
} from '../svg-icons/svg-icons';

interface NavItem {
  title: string;
  icon: any;
  route: string;
  badge?: number;
  section?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // Import SVG icons
    DashboardIcon,
    UsersIcon,
    PalletIcon,
    PlantIcon,
    CreditIcon,
    SalesIcon,
    ContractIcon,
    CommunicationIcon,
    ReportsIcon,
    SettingsIcon,
    LogoIcon
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>();

  // Create a map for icons
  iconMap = new Map<any, string>([
    [DashboardIcon, 'dashboard-icon'],
    [UsersIcon, 'users-icon'],
    [PalletIcon, 'pallet-icon'],
    [PlantIcon, 'plant-icon'],
    [CreditIcon, 'credit-icon'],
    [SalesIcon, 'sales-icon'],
    [ContractIcon, 'contract-icon'],
    [CommunicationIcon, 'communication-icon'],
    [ReportsIcon, 'reports-icon'],
    [SettingsIcon, 'settings-icon']
  ]);

  navItems: NavItem[] = [
    // Main Section
    { title: 'Dashboard', icon: DashboardIcon, route: '/dashboard', section: 'Main' },
    { title: 'Member Management', icon: UsersIcon, route: '/farmer-management', section: 'Main' },
    { title: 'Production & Stock', icon: PalletIcon, route: '/production-stock', section: 'Main' },
    { title: 'Plant Health', icon: PlantIcon, route: '/plant-health', section: 'Main' },
    
    // Financial Section
    { title: 'Credit Management', icon: CreditIcon, route: '/credit-management', section: 'Financial' },
    { title: 'Sales & Payments', icon: SalesIcon, route: '/sales-payment', section: 'Financial' },
    { title: 'Contracts', icon: ContractIcon, route: '/contracts', section: 'Financial' },
    
    // Operations Section
    { title: 'Communication Hub', icon: CommunicationIcon, route: '/communication', section: 'Operations' },
    { title: 'Reports & Analytics', icon: ReportsIcon, route: '/reports', section: 'Operations' },
    { title: 'Settings', icon: SettingsIcon, route: '/settings', section: 'Operations' }
  ];

  get sections(): string[] {
    return Array.from(new Set(this.navItems.map(item => item.section).filter(Boolean))) as string[];
  }

  getItemsBySection(section: string): NavItem[] {
    return this.navItems.filter(item => item.section === section);
  }

  onCloseSidebar(): void {
    this.closeSidebar.emit();
  }

  // Method to get icon selector
  getIconSelector(icon: any): string {
    return this.iconMap.get(icon) || '';
  }
}