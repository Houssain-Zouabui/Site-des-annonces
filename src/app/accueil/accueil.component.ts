import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GererCategoriesService } from '../services/gerer-categories.service';
import { Router } from '@angular/router';
import { GestionannonceService } from '../services/gestionannonce.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  categories: any[] = [];
  annonces: any[] = [];

  constructor(
    private router: Router,
    private categoryService: GererCategoriesService,
    private annonceService: GestionannonceService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.annonceService.getAnnonces().subscribe((annonces) => {
      // Filtrer pour obtenir seulement les trois premières annonces
      this.annonces = annonces.slice(0, 3);
    });
  }

  navigateToCategory(categoryId: number) {
    // Navigate to the category's announcement page
    this.router.navigate(['/annonces', categoryId]);
  }
}