import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

    constructor(private router: Router) {}

  login(ev:Event) {
    ev.preventDefault()
    let role = "government"
    this.router.navigate([role]);
  }

}
