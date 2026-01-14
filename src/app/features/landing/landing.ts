import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-landing',
  standalone: true,  
  imports: [RouterModule], 
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent implements OnInit {
  usersCount = '100K';
  cooperativesCount = '1K';
    menuOpen = false

  constructor() { }

  ngOnInit(): void { }

    toggleMenu() {
    this.menuOpen = !this.menuOpen;
    // Prevent background scroll when menu is open
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
