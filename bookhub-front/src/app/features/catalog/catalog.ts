import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreResponse, LivreService } from '../../services/livre';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogComponent implements OnInit {
  private readonly livreService = inject(LivreService);
  books$! : Observable<LivreResponse[]>;
  ngOnInit() {
    this.books$ = this.livreService.getAllBooks();
  }
}
