import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-lecteur-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-lecteur-layout.html',
  styleUrl: './dashboard-lecteur-layout.css',
})
export class DashboardLecteurLayout {}
