import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/** L'administration possède son propre menu, distinct de la bibliothèque. */
@Component({
  selector: 'app-dashboard-administrateur-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-administrateur-layout.html',
  styleUrl: '../dashboard-bibliothecaire/dashboard-bibliothecaire-layout.css',
})
export class DashboardAdministrateurLayout {}
