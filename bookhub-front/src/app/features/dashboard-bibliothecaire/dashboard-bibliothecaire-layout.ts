import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * Layout unique du personnel : les enfants changent dans router-outlet.
 * Contrairement aux anciens écrans, la barre latérale n'est jamais dupliquée.
 */
@Component({
  selector: 'app-dashboard-bibliothecaire-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-bibliothecaire-layout.html',
  styleUrl: './dashboard-bibliothecaire-layout.css',
})
export class DashboardBibliothecaireLayout {}
