import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-lecteur-accueil',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard-lecteur-accueil.html',
  styleUrl: './dashboard-lecteur-accueil.css',
})
export class DashboardLecteurAccueil {
  currentDate = new Date();
}
