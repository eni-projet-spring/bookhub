import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreResponse, LivreService } from '../../services/livre';
import { Observable, switchMap } from 'rxjs';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogComponent implements OnInit {
  private readonly livreService = inject(LivreService);
  private readonly route = inject(ActivatedRoute);

  books$!: Observable<LivreResponse[]>;

  // Base URL of your Spring Boot backend (adjust port if necessary)
  private readonly backendBaseUrl = 'http://localhost:8080';

  ngOnInit(): void {
    this.books$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        const searchTerm = params.get('search') || '';
        return this.livreService.getAllBooks(searchTerm);
      }),
    );
  }

  /**
   * Returns the full, valid URL for a book cover.
   * Handles legacy external URLs and new local relative paths from Spring Boot.
   */
  getCoverImageUrl(couverture: string | null | undefined): string {
    // 1. Fallback if no cover is provided (replace with your actual default image path if you have one)
    if (!couverture) {
      return '';
    }

    // 2. If it's already a full external URL (legacy data), return it as-is
    if (couverture.startsWith('http://') || couverture.startsWith('https://')) {
      return couverture;
    }

    // 3. If it's a relative path starting with '/' (new local uploads), prepend the backend URL
    if (couverture.startsWith('/')) {
      return `${this.backendBaseUrl}${couverture}`;
    }

    // 4. Fallback for any other unexpected format
    return `${this.backendBaseUrl}/${couverture}`;
  }
}
