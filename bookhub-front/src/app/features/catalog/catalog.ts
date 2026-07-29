import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreResponse, LivreService } from '../../services/livre';
import { Observable, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogComponent implements OnInit {
  private readonly livreService = inject(LivreService);
  private readonly route = inject(ActivatedRoute); // Inject the route

  books$!: Observable<LivreResponse[]>;

  ngOnInit(): void {
    // Listen to the URL query parameters
    this.books$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        // Extract the 'search' parameter from the URL (e.g., ?search=prince)
        const searchTerm = params.get('search') || '';

        // Call the service with the search term (or empty string to get all books)
        return this.livreService.getAllBooks(searchTerm);
      }),
    );
  }
}
