import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* ---------- Interfaces ---------- */
interface Farmer {
  name: string;
  crop: string;
}

interface Cooperative {
  id: number;
  name: string;
  location: string;
  farmers: Farmer[];
  contact: string;
  active: boolean;
}

@Component({
  selector: 'app-cooperatives',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cooperatives.html',
  styleUrl: './cooperatives.scss',
})
export class Cooperatives {
  /* ---------- State ---------- */
  selectedCoop: Cooperative | null = null;
  showCreateModal = false;

  /* ---------- New Cooperative Model ---------- */
  newCoop = {
    name: '',
    location: '',
    contact: '',
  };

  /* ---------- Data ---------- */
  cooperatives: Cooperative[] = [
    {
      id: 1,
      name: 'Green Leaf Coop',
      location: 'Buea',
      contact: '6815558765',
      active: true,
      farmers: [
        { name: 'John N.', crop: 'Maize' },
        { name: 'Mary K.', crop: 'Cassava' },
        { name: 'Samuel T.', crop: 'Beans' },
      ],
    },
    {
      id: 2,
      name: 'Sunrise Farming Coop',
      location: 'Yaounde',
      contact: '6585554321',
      active: true,
      farmers: [
        { name: 'Paul M.', crop: 'Rice' },
        { name: 'Agnes F.', crop: 'Groundnuts' },
      ],
    },
    {
      id: 3,
      name: 'Harvesters United',
      location: 'Bertoua',
      contact: '675559876',
      active: true,
      farmers: [
        { name: 'Peter B.', crop: 'Cocoa' },
        { name: 'Rose L.', crop: 'Plantain' },
      ],
    },
  ];

  /* ---------- Farmers Modal ---------- */
  openFarmers(coop: Cooperative) {
    this.selectedCoop = coop;
  }

  closeFarmersModal() {
    this.selectedCoop = null;
  }

  /* ---------- Create Cooperative Modal ---------- */
  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createCooperative() {
    if (!this.newCoop.name || !this.newCoop.location) return;

    this.cooperatives.push({
      id: Date.now(),
      name: this.newCoop.name,
      location: this.newCoop.location,
      contact: this.newCoop.contact,
      active: true,
      farmers: [],
    });

    this.newCoop = { name: '', location: '', contact: '' };
    this.closeCreateModal();
  }

  /* ---------- Actions ---------- */
  deactivateCoop(coop: Cooperative) {
    coop.active = false;
  }
}
