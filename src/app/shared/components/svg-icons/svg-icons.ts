import { Component } from '@angular/core';

// Dashboard Icon
@Component({
  selector: 'app-dashboard-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  `
})
export class DashboardIcon {}

// Users Icon
@Component({
  selector: 'app-users-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `
})
export class UsersIcon {}

// Pallet Icon (Production & Stock)
@Component({
  selector: 'app-pallet-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
      <path d="M8 10h8"></path>
      <path d="M8 14h8"></path>
    </svg>
  `
})
export class PalletIcon {}

// Plant Health Icon
@Component({
  selector: 'app-plant-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v8"></path>
      <path d="M4.93 10.93l1.41 1.41"></path>
      <path d="M2 18h2"></path>
      <path d="M20 18h2"></path>
      <path d="M19.07 10.93l-1.41 1.41"></path>
      <path d="M22 22H2"></path>
      <path d="M16 6l-4 4-4-4"></path>
      <path d="M16 18a4 4 0 0 0-8 0"></path>
    </svg>
  `
})
export class PlantIcon {}

// Credit Icon
@Component({
  selector: 'app-credit-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  `
})
export class CreditIcon {}

// Sales Icon
@Component({
  selector: 'app-sales-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
      <circle cx="12" cy="15" r="2"></circle>
    </svg>
  `
})
export class SalesIcon {}

// Contract Icon
@Component({
  selector: 'app-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `
})
export class ContractIcon {}

// Communication Icon
@Component({
  selector: 'app-communication-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      <line x1="9" y1="10" x2="15" y2="10"></line>
      <line x1="12" y1="7" x2="12" y2="13"></line>
    </svg>
  `
})
export class CommunicationIcon {}

// Reports Icon
@Component({
  selector: 'app-reports-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  `
})
export class ReportsIcon {}

// Settings Icon
@Component({
  selector: 'app-settings-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  `
})
export class SettingsIcon {}
 

@Component({
  selector: 'app-logo-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 200 300"
      fill="currentColor"
    >
      <g transform="scale(1)">
        <!-- your paths exactly as-is -->
      <path d="M181.7 27.5c-.5 1.6-1.5 5.5-2.4 8.5-3.1 11.4-11 23.8-24.8 39.3l-9.6 10.8 5 5.4c13.9 15.3 16.5 37.1 7.4 61.3-2.4 6.3-2.5 4.6-.2-2.8 6.1-19.7 2-40.5-10.5-53.2-7.8-8-12.8-10.2-22.5-9.6-9.9.6-17.7 4.1-28.6 13.2-9.8 8.1-17.2 11.9-29 14.8l-8.9 2.2 3.9.9c2.2.5 8.3.7 13.5.4 11-.5 20.1-3.2 28.8-8.5 13.8-8.5 17.6-9.1 24.4-3.9 3 2.3 5.5 5.6 8.3 11.1 4 7.8 4 8 3.9 18.5-.1 12.8-3 22.8-9.7 33.8-6.9 11-13.7 26.9-13.7 31.8 0 2.3-.6 1.9-5.2-3.1-2.3-2.5-8.5-7.1-13.7-10.2-5.2-3-11.1-7.1-13.2-8.9-4.6-4.1-7.9-10.7-7.8-15.4 0-3.3.1-3.3 1.5 1.4.9 3 1.9 4.5 2.6 4.1s.8-.3.4.4c-1 1.6 6.8 9 13.4 12.9 8.6 5 8.8 5 10.5.9 3.2-7.5.7-18.1-5.7-23.9-1.7-1.5-7-4.8-11.8-7.2s-9.9-5.8-11.4-7.5c-2.1-2.6-2.6-2.8-2.7-1.3-.1 1-.5.1-1-2-.5-2.2-.7-5-.4-6.4.4-2.5.4-2.5-1.7-.7-1.1 1.1-3.1 4.1-4.4 6.9-2.9 6.1-3.2 16.7-.8 23.8 1.6 4.8 7.5 12.2 12.5 15.8 2.5 1.8 3.2 1.9 4.7.7 1.5-1.1 1.5-1.1.5.3-1.1 1.3-.2 2.1 6 5.4 10.4 5.5 19.8 11.8 23.1 15.3 2.9 3.1 2.9 3.2 2.7 14.4-.1 6.2-.6 13.2-1.2 15.5-2.4 10.9-2 31.2.8 35.6.3.5 2.3-2.3 4.3-6.2 2.1-4 6.3-10.5 9.4-14.5 7.6-9.9 49-54.4 47-50.6-2.8 5.5-11.1 16.8-22.6 30.5-16.8 20.2-24.5 30.8-29.7 41.2-2.2 4.6-4.1 8.5-4.1 8.8s3.9.5 8.8.5c8.1 0 9.4-.3 19-4.5 21.6-9.3 29.1-14.8 37.6-27.3 6.9-10 9.9-19.4 10.4-32.4.6-16.4-3.7-32-14.1-50.8l-4.2-7.5-.6 5.6c-1.3 12-10.8 22.9-29 33.3-12 6.9-19.8 12.4-22.8 16.2-1.1 1.5-2.1 2.4-2.1 2 0-2.2 7.4-14.7 15.2-25.4 4.9-6.9 9.6-13.9 10.5-15.6s2.4-4.2 3.4-5.5 1.6-2.8 1.2-3.4c-.3-.5-.2-.7.4-.4 2.3 1.4 11.4-11.6 15.3-21.8 1.8-4.7 2.4-8.6 2.8-18.5.5-13.4-.8-21.4-4.8-29.4l-1.9-3.8 4.9-8.5c6.1-10.7 10.6-22.9 12.6-34.4 1.6-9.4 1.7-24.2.1-18.4m-110.5 116c-.2 2.8.1 3.5 1.5 3.5 1.5 0 1.6.2.3 1-.9.6-1.7.5-2.2-.3-.9-1.5-2.7 3.2-2 5.3.3 1.1.2 1.2-.6.5-1.3-1.2-.4-8.8.9-7.9 1.2.7 1.1-.3-.1-2.7-.8-1.4-.7-1.9.1-1.9.6 0 .8-.7.4-1.8-.5-1.4-.4-1.5.6-.4.7.6 1.2 2.8 1.1 4.7m5 5.7c-.7.7-1.2 1.7-1.2 2.2 0 .6.4.5.9-.3.8-1.2 1.2-1.2 2.6.3 2.6 2.5 1 3.2-3.1 1.3l-3.6-1.7 2.4-1.9c2.4-2 4-1.9 2 .1m8.2 7.8c1.4 3 1.1 3.6-1.1 2.2-1-.6-1.5-5.2-.7-5.2.2 0 .9 1.3 1.8 3m7.5 2.5c0 .5-.4.3-.9-.5s-.9-2.2-.9-3c0-1.6 1.7 1.6 1.8 3.5m-17.1 1.9c.2 1.4-.1 2.6-.6 2.6-.6 0-.8-.9-.5-2 .4-1.5.1-1.8-1.6-1.5-2.2.4-3.6-.9-2.6-2.5 1.1-1.8 5 .6 5.3 3.4m25.2 1.7c0 .6-.4.7-1 .4-.5-.3-1-1.1-1-1.6 0-.6.5-.7 1-.4.6.3 1 1.1 1 1.6m.8 4.4c-.3.3-.9-.2-1.2-1.2-.6-1.4-.5-1.5.5-.6.7.7 1 1.5.7 1.8m-27.8.6c0 .5-.4.7-1 .4-.5-.3-1-.1-1 .6s-.3 1-.6.6c-.8-.7.4-2.7 1.7-2.7.5 0 .9.5.9 1.1m31 2c0 .5-.4.9-1 .9-.5 0-1-.7-1-1.6 0-.8.5-1.2 1-.9.6.3 1 1 1 1.6m-24.3 6.2c0 .8-.6 1.4-1.4 1.4-.9 0-1-.4-.2-1.4.6-.7 1.2-1.3 1.4-1.3.1 0 .2.6.2 1.3m13.2 1c.8 1 .7 1.4-.2 1.4-.8 0-1.4-.6-1.4-1.4 0-.7.1-1.3.2-1.3.2 0 .8.6 1.4 1.3m9.6 3.7c.3.5.1 1-.4 1-.6 0-1.1-.5-1.1-1 0-.6.2-1 .4-1 .3 0 .8.4 1.1 1"/>
      <path d="M120.8 48c-4.4 2.4-6.5 5.1-7.9 10.4-1.9 7 3.2 15.9 10.6 18.3 10.4 3.5 21.5-5.6 20.2-16.5-1.2-11-13.3-17.4-22.9-12.2m-28.3 73.7c2.9 3.1 5.3 6.9 3.7 5.9-.5-.3-1 1.3-1 3.9-.1 3.7-1.8 9.1-5.9 18.2-.3.8 1.6 2.2 5 3.7 3 1.3 7.3 4 9.5 6 3.2 3 4.1 3.3 4.6 2 .9-2.3.7-7.4-.4-11.4-.8-3.1-.8-3.3.5-1.6 1.9 2.5 2.9 9.7 2.1 15.9-.3 2.9-.3 6.9.1 9l.6 3.9 2.7-6.5c7.8-18.2 6.2-32.7-4.7-43.4-4.2-4-13.1-8.3-17.4-8.3-1.8 0-1.8.2.6 2.7m-39 52.3c-1.9 3.8-3.6 7.8-3.8 8.7-.1 1-.6 2.4-1.1 3.1-3.5 5.7-4.7 25-2.1 33.9 3.8 12.9 12.6 23.2 24.8 29.1 20.9 10.2 24.3 11.7 25.4 11.6.7-.1 1 .2.7.7s.5 1.9 1.7 3.1c1.2 1.3 3 3.6 4 5.3 1.6 2.5 1.9 2.6 1.9 1 0-2.7-2.3-11.1-4.4-16-2.9-6.9-9.8-17.5-10.9-16.8-.5.3-.7.1-.4-.4.7-1.1-10.9-16.3-12.4-16.3-.5 0-.9-.5-.9-1 0-1.6-11-14.5-12.1-14.2-.6.1-.8-.2-.4-.8.3-.5-.7-2.9-2.3-5.2-2.7-3.9-3.9-8.4-2.1-7.2.4.2 1.1-1.1 1.5-3.1.9-4.7 3.4-4.7 3.4 0 0 2.8-.4 3.5-1.6 3.3-.9-.2-1.8.4-1.9 1.4-.4 2 4.9 7.3 6.4 6.4.6-.4.9-.1.5.7-.3.8 3.8 6 10.2 12.8 13.3 14.2 20.3 22.8 24.2 29.9 2.7 4.6 3.2 5.1 3.9 3.5 1.3-3.2.9-20.5-.6-26.5-.7-3-2.4-7.3-3.7-9.6-2.7-4.7-10-11.7-11.4-10.9-.6.4-1 .2-1-.4 0-.5-2.8-2.6-6.2-4.7-3.5-2-7.8-4.8-9.6-6.1s-3.8-2.1-4.5-1.7c-.6.4-.9.4-.5-.1.4-.4-1.1-2.8-3.3-5.3-2.4-2.8-4.5-6.6-5.5-9.9-.8-2.9-1.7-5.3-2-5.3-.2 0-2 3.1-3.9 7m3.5 3c0 3 .3 3.8 1.4 3.4.8-.3 1.9.3 2.4 1.3.9 1.5.7 1.9-.9 2-1.1.1-2.3-.5-2.6-1.3-.3-.7-.9-1.1-1.4-.8-.6.3-.7-.5-.4-1.9.4-1.4.2-2.8-.4-3.1-1.1-.7-.4-3.6 1-3.6.5 0 .9 1.8.9 4m-2.9 4.1c-.6 1.6-1 1.8-1 .7-.1-2.2 1.2-5.5 1.6-4.2.2.6-.1 2.2-.6 3.5m10.3 2.5c.3.8.2 1.2-.4.9s-1-1-1-1.6c0-1.4.7-1.1 1.4.7m-12.1 1.9c-.3.9-.8 1.4-1 1.1-.3-.3-.2-.9.2-1.5.9-1.6 1.5-1.3.8.4m2.8 2.7c.1.7.1 1.7 0 2.2s.4 1.3 1.1 1.7c.7.5.9.9.3.9-1.8 0-3-1.4-3.2-3.8-.2-1.2.2-2.2.7-2.2.6 0 1.1.6 1.1 1.2m11.5 1.3c-.1.8-.5 1.7-.8 2.1-.5.4-.4-1.6.1-3.4.3-.9.9.1.7 1.3m5.7 3.6c.4 1.6.3 1.9-.6 1-.6-.6-2-1.1-3-1.1-1.5 0-1.7-.3-.8-1.3.6-.8.7-1.7.3-2.2-.4-.4.3-.3 1.4.3 1.2.6 2.4 2.1 2.7 3.3m-2.6 2.5c-.3.3-1.2.4-1.9.1-.8-.3-.5-.6.6-.6 1.1-.1 1.7.2 1.3.5m6.8.4c.3.5.1 1-.4 1-.6 0-1.1-.5-1.1-1 0-.6.2-1 .4-1 .3 0 .8.4 1.1 1M59 199c.7 1.4.7 2 0 2-.5 0-1-.7-1-1.6s-.5-1.2-1.2-.8-.8.3-.4-.4c1-1.6 1.4-1.5 2.6.8m15.4-1.4c2 .8 1.1 2.4-1.2 2.3q-1.8 0-.3-.6c1.1-.5 1.1-.7 0-1.4-1.6-1-.8-1.2 1.5-.3m8.6-.2c0 .2-.7.7-1.6 1-.8.3-1.2.2-.9-.4.6-1 2.5-1.4 2.5-.6m1.7 2.2c-.3.3-1.2.4-1.9.1-.8-.3-.5-.6.6-.6 1.1-.1 1.7.2 1.3.5m5.7 3.3c.3.5-.2 1.5-1.2 2.2-1.5 1.2-1.6 1.2-.5-.2.7-.9 1-1.9.6-2.2-.3-.4-.4-.7 0-.7.3 0 .8.4 1.1.9M61.5 206c1.6 1.7 1.6 2 .3 1.5-.9-.4-1.9-1.3-2.2-2.1-.7-1.9-.2-1.8 1.9.6m-5.9 1.7c-1 1-1.9-.5-1-1.8.6-1.1.8-1.1 1.2 0 .2.7.1 1.5-.2 1.8m39.1-1.2c0 .8-.4 1.2-.9.9s-.6-1-.3-1.5c.9-1.3 1.2-1.1 1.2.6M86 209c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1m-7.9 2.3c-1 .9-1.1.8-.5-.6.3-1 .9-1.5 1.2-1.2s0 1.1-.7 1.8m-10.4 1.4c.5-.3.9.3.9 1.3 0 2.6-2.9 1.7-3.3-1.1-.2-1.7 0-2 .6-1 .5.7 1.3 1.1 1.8.8m30 1c.1 2.2-.1 2.4-.8 1-.6-.9-.7-2.2-.4-2.7.9-1.4 1-1.3 1.2 1.7M87.5 218c-.3.5-1.3.6-2.1.3-1.2-.4-1.3-.8-.3-1.4 1.5-.9 3.2-.2 2.4 1.1m-34.8 3.2c-.3.7-.5.2-.5-1.2s.2-1.9.5-1.3c.2.7.2 1.9 0 2.5M101 219c0 .5-.4 1-.9 1-.6 0-1.3-.5-1.6-1-.3-.6.1-1 .9-1 .9 0 1.6.4 1.6 1m-26 3.6c0 .8-.4 1.4-1 1.4-.5 0-.6-.7-.3-1.7.5-1.2.3-1.4-.7-.8-.9.5-1.1.4-.6-.4.9-1.4 2.6-.5 2.6 1.5m-20.1 2c.4-.3.7 1 .7 2.8s-.5 3.3-1.1 3.3-1.1-.8-1.1-1.8.4-1.5.9-1.2.7 0 .5-.8c-.3-.8-1-1.3-1.6-1.2-.7.2-.9-.4-.5-1.4.4-1.1.8-1.3 1.1-.5.2.7.7 1 1.1.8m38.6.4c.3.6-.1.7-.9.4-1.8-.7-2.1-1.4-.7-1.4.6 0 1.3.4 1.6 1m-34.9 8.6c-.3 2.3-1.3 2.6-1.8.6-.3-1.1 0-1.9.7-1.9s1.2.6 1.1 1.3m44.4.3c-.5 1.1-1.5 2.3-2.1 2.7-.6.3-.3-.5.6-2 2-3 3-3.5 1.5-.7m-39.9 4.8c1.3 1.6 1.2 1.7-.3.4-1.7-1.3-2.2-2.1-1.4-2.1.2 0 1 .8 1.7 1.7m8.5 6.9c.1.9 0 1.3-.4 1-.3-.4-.7-1.4-.8-2.2-.1-.9 0-1.3.4-1 .3.4.7 1.4.8 2.2m11.4 3.9c0 .2-.6.5-1.3.8-.8.3-1.4-.1-1.4-.8s.6-1.1 1.4-.8c.7.3 1.3.6 1.3.8m13.4 4c-.4.8 0 2.3.7 3.3 1.2 1.6 1.2 1.6-.5 0-1.6-1.4-1.7-4.8-.2-4.8.3 0 .3.7 0 1.5"/>
      <path d="M58 182c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1"/>
      </g>
    </svg>
  `
})
export class LogoIcon {}



// Search Icon
@Component({
  selector: 'app-search-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `
})
export class SearchIcon {}

// Bell Icon
@Component({
  selector: 'app-bell-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  `
})
export class BellIcon {}

// Mail Icon
@Component({
  selector: 'app-mail-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `
})
export class MailIcon {}

// Menu Icon
@Component({
  selector: 'app-menu-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  `
})
export class MenuIcon {}

// Add these if you want colored icons for the header
@Component({
  selector: 'app-search-icon-colored',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="#4E7C2F" stroke-width="2"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#4E7C2F" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
})
export class SearchIconColored {}

@Component({
  selector: 'app-bell-icon-colored',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#4E7C2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#4E7C2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="18" cy="8" r="3" fill="#4CAF50"/> <!-- Green notification dot -->
    </svg>
  `
})
export class BellIconColored {}

// Package Icon
@Component({
  selector: 'app-package-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"></path>
      <polyline points="2.32 6.16 12 11 21.68 6.16"></polyline>
      <line x1="12" y1="22.76" x2="12" y2="11"></line>
    </svg>
  `
})
export class PackageIcon {}

// Trending Up Icon
@Component({
  selector: 'app-trending-up-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  `
})
export class TrendingUpIcon {}

// Trending Down Icon
@Component({
  selector: 'app-trending-down-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
      <polyline points="17 18 23 18 23 12"></polyline>
    </svg>
  `
})
export class TrendingDownIcon {}

// Alert Icon
@Component({
  selector: 'app-alert-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `
})
export class AlertIcon {}

// Check Circle Icon
@Component({
  selector: 'app-check-circle-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `
})
export class CheckCircleIcon {}

// X Circle Icon
@Component({
  selector: 'app-x-circle-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  `
})
export class XCircleIcon {}

// Clock Icon
@Component({
  selector: 'app-clock-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `
})
export class ClockIcon {}

// Plus Icon
@Component({
  selector: 'app-plus-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `
})
export class PlusIcon {}

// Credit Card Icon
@Component({
  selector: 'app-credit-card-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  `
})
export class CreditCardIcon {}

// Download Icon
@Component({
  selector: 'app-download-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `
})
export class DownloadIcon {}

// Filter Icon
@Component({
  selector: 'app-filter-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  `
})
export class FilterIcon {}

// Edit Icon
@Component({
  selector: 'app-edit-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `
})
export class EditIcon {}

// Trash Icon
@Component({
  selector: 'app-trash-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  `
})
export class TrashIcon {}

// Eye Icon
@Component({
  selector: 'app-eye-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `
})
export class EyeIcon {}

// QrCode Icon
@Component({
  selector: 'app-qr-code-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="5" height="5"></rect>
      <rect x="16" y="3" width="5" height="5"></rect>
      <rect x="3" y="16" width="5" height="5"></rect>
      <line x1="10" y1="9" x2="10" y2="15"></line>
      <line x1="14" y1="9" x2="14" y2="15"></line>
      <line x1="9" y1="10" x2="15" y2="10"></line>
      <line x1="9" y1="14" x2="15" y2="14"></line>
    </svg>
  `
})
export class QrCodeIcon {}

// MapPin Icon
@Component({
  selector: 'app-map-pin-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `
})
export class MapPinIcon {}

// UserPlus Icon
@Component({
  selector: 'app-user-plus-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  `
})
export class UserPlusIcon {}

// Export Icon
@Component({
  selector: 'app-export-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  `
})
export class ExportIcon {}

// Import Icon
@Component({
  selector: 'app-import-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `
})
export class ImportIcon {}

// Phone Icon
@Component({
  selector: 'app-phone-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  `
})
export class PhoneIcon {}

// Add Farmer Icon
@Component({
  selector: 'app-add-farmer-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  `
})
export class AddFarmerIcon {}

// Edit Farmer Icon
@Component({
  selector: 'app-edit-farmer-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `
})
export class EditFarmerIcon {}

// View Farmer Icon
@Component({
  selector: 'app-view-farmer-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `
})
export class ViewFarmerIcon {}

// Delete Farmer Icon
@Component({
  selector: 'app-delete-farmer-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  `
})
export class DeleteFarmerIcon {}

// QR Code Icon
@Component({
  selector: 'app-qr-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="5" height="5" rx="1"></rect>
      <rect x="16" y="3" width="5" height="5" rx="1"></rect>
      <rect x="3" y="16" width="5" height="5" rx="1"></rect>
      <line x1="9" y1="9" x2="9" y2="15"></line>
      <line x1="15" y1="9" x2="15" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="9"></line>
      <line x1="9" y1="15" x2="15" y2="15"></line>
    </svg>
  `
})
export class QrIcon {}

// Upload Icon
@Component({
  selector: 'app-upload-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  `
})
export class UploadIcon {}

// File Icon
@Component({
  selector: 'app-file-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  `
})
export class FileIcon {}

// Add these to your existing SVG_ICONS array

// Bar Chart Icon
@Component({
  selector: 'app-bar-chart-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  `
})
export class BarChartIcon {}

// Warehouse Icon
@Component({
  selector: 'app-warehouse-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22V12"></path>
      <path d="M2 8l10-6 10 6v12H2z"></path>
      <path d="M17 12h1"></path>
      <path d="M22 18v2"></path>
      <path d="M2 18v2"></path>
      <path d="M7 12h1"></path>
    </svg>
  `
})
export class WarehouseIcon {}

// Scale Icon
@Component({
  selector: 'app-scale-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"></path>
      <path d="M3 12h18"></path>
      <path d="M3 18h18"></path>
    </svg>
  `
})
export class ScaleIcon {}

// Calendar Icon
@Component({
  selector: 'app-calendar-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  `
})
export class CalendarIcon {}

// Tag Icon
@Component({
  selector: 'app-tag-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  `
})
export class TagIcon {}

// Truck Icon
@Component({
  selector: 'app-truck-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  `
})
export class TruckIcon {}

// Refresh Icon
@Component({
  selector: 'app-refresh-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  `
})
export class RefreshIcon {}

// Chart Icon Component
@Component({
  selector: 'app-chart-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  `
})
export class ChartIcon {}

// Dollar Icon
@Component({
  selector: 'app-dollar-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  `
})
export class DollarIcon {}

// Percent Icon
@Component({
  selector: 'app-percent-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="5" x2="5" y2="19"></line>
      <circle cx="6.5" cy="6.5" r="2.5"></circle>
      <circle cx="17.5" cy="17.5" r="2.5"></circle>
    </svg>
  `
})
export class PercentIcon {}

// Calculator Icon
@Component({
  selector: 'app-calculator-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"></rect>
      <line x1="8" y1="6" x2="16" y2="6"></line>
      <line x1="8" y1="10" x2="8" y2="10"></line>
      <line x1="12" y1="10" x2="12" y2="10"></line>
      <line x1="16" y1="10" x2="16" y2="10"></line>
      <line x1="8" y1="14" x2="8" y2="14"></line>
      <line x1="12" y1="14" x2="12" y2="14"></line>
      <line x1="16" y1="14" x2="16" y2="14"></line>
      <line x1="8" y1="18" x2="16" y2="18"></line>
    </svg>
  `
})
export class CalculatorIcon {}

// Receipt Icon
@Component({
  selector: 'app-receipt-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path>
      <path d="M16 8h-6"></path>
      <path d="M12 12h-2"></path>
      <path d="M16 16h-6"></path>
    </svg>
  `
})
export class ReceiptIcon {}

// Shield Icon
@Component({
  selector: 'app-shield-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  `
})
export class ShieldIcon {}

// ... existing code ...

// Add these new icons after the existing ones:

// Contract-specific icons
@Component({
  selector: 'app-add-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="16" y1="14" x2="12" y2="14"></line>
    </svg>
  `
})
export class AddContractIcon {}

@Component({
  selector: 'app-edit-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `
})
export class EditContractIcon {}

@Component({
  selector: 'app-view-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
      <circle cx="18" cy="15" r="1"></circle>
    </svg>
  `
})
export class ViewContractIcon {}

@Component({
  selector: 'app-delete-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  `
})
export class DeleteContractIcon {}

@Component({
  selector: 'app-download-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    </svg>
  `
})
export class DownloadContractIcon {}

@Component({
  selector: 'app-print-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  `
})
export class PrintContractIcon {}

@Component({
  selector: 'app-share-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  `
})
export class ShareContractIcon {}

@Component({
  selector: 'app-export-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <path d="M16 13H8"></path>
      <path d="M16 17H8"></path>
      <path d="M10 9H8"></path>
      <path d="M12 22v-4"></path>
      <path d="m17 17 5 5"></path>
      <path d="m17 22 5-5"></path>
    </svg>
  `
})
export class ExportContractIcon {}

// Additional icons needed for contracts
@Component({
  selector: 'app-renew-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  `
})
export class RenewIcon {}

@Component({
  selector: 'app-money-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  `
})
export class MoneyIcon {}

@Component({
  selector: 'app-money-icons',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
    </svg>
  `
})
export class MoneyIcons {}

@Component({
  selector: 'app-check-circle-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `
})
export class CheckCircleContractIcon {}

@Component({
  selector: 'app-template-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `
})
export class TemplateIcon {}

@Component({
  selector: 'app-document-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `
})
export class DocumentIcon {}

@Component({
  selector: 'app-analytics-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  `
})
export class AnalyticsIcon {}

@Component({
  selector: 'app-signature-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
  `
})
export class SignatureIcon {}

@Component({
  selector: 'app-filter-contract-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  `
})
export class FilterContractIcon {}

@Component({
  selector: 'app-status-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `
})
export class StatusIcon {}
 

// Custom icons for communication
@Component({
  selector: 'app-announcement-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      <circle cx="12" cy="8" r="2"></circle>
    </svg>
  `
})
export class AnnouncementIcon {}
  
@Component({
  selector: 'app-needs-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
  `
})
export class NeedsIcon {}

@Component({
  selector: 'app-audio-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  `
})
export class AudioIcon {}

@Component({
  selector: 'app-send-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  `
})
export class SendIcon {}
 

@Component({
  selector: 'app-megaphone-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 11v3"></path>
      <path d="M5 11h14l1 7H4l1-7Z"></path>
      <path d="M9 11a5 5 0 0 1 6 0"></path>
      <path d="M9 11V7a3 3 0 0 1 6 0v4"></path>
    </svg>
  `
})
export class MegaphoneIcon {}
 
@Component({
  selector: 'app-play-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  `
})
export class PlayIcon {}

@Component({
  selector: 'app-duplicate-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `
})
export class DuplicateIcon {}

@Component({
  selector: 'app-supplier-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      <path d="M18 19v-6"></path>
      <path d="M21 16l-3 3-3-3"></path>
    </svg>
  `
})
export class SupplierIcon {}

@Component({
  selector: 'app-add-communication-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  `
})
export class AddCommunicationIcon {}
 
@Component({
  selector: 'app-mic-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `
})
export class MicIcon {}

@Component({
  selector: 'app-pause-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  `
})
export class PauseIcon {}

@Component({
  selector: 'app-stop-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  `
})
export class StopIcon {}

@Component({
  selector: 'app-text-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 7V4h16v3"></path>
      <path d="M9 20h6"></path>
      <path d="M12 4v16"></path>
    </svg>
  `
})
export class TextIcon {}

// Export all icons
export const SVG_ICONS = [
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
  LogoIcon,
  SearchIcon,
  BellIcon,
  MailIcon,
  MenuIcon,
  SearchIconColored,
  BellIconColored,
  PackageIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlusIcon,
  CreditCardIcon,
  DownloadIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  QrCodeIcon,
  MapPinIcon,
  UserPlusIcon,
  ExportIcon,
  ImportIcon,
  PhoneIcon,
  AddFarmerIcon,
  EditFarmerIcon,
  ViewFarmerIcon,
  DeleteFarmerIcon,
  ExportIcon,
  ImportIcon,
  FilterIcon,
  QrIcon,
  DownloadIcon,
  UploadIcon,
  FileIcon,
  BarChartIcon,
  WarehouseIcon,
  ScaleIcon,
  CalendarIcon,
  TagIcon,
  TruckIcon,
  RefreshIcon,
  ChartIcon,
  DollarIcon,
  PercentIcon,
  CalculatorIcon,
  ReceiptIcon,
  ShieldIcon,
  AddContractIcon,
  EditContractIcon,
  ViewContractIcon,
  DeleteContractIcon,
  DownloadContractIcon,
  PrintContractIcon,
  ShareContractIcon,
  ExportContractIcon,
  RenewIcon,
  MoneyIcon,
  MoneyIcons,
  CalendarIcon,
  CheckCircleContractIcon,
  TemplateIcon,
  DocumentIcon,
  AnalyticsIcon,
  SignatureIcon,
  FilterContractIcon,
  StatusIcon,
  AnnouncementIcon,
  NeedsIcon,
  AudioIcon,
  SendIcon,
  MegaphoneIcon,
  PlayIcon,
  DuplicateIcon,
  SupplierIcon,
  AddCommunicationIcon,
  MicIcon,
  PauseIcon,
  StopIcon,
  TextIcon
];