import { Component } from '@angular/core';
import { GererCategoriesService } from '../services/gerer-categories.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-annonce-card',
  templateUrl: './annonce-card.component.html',
  styleUrl: './annonce-card.component.css'
})
export class AnnonceCardComponent {
  annonces: any[] = [];
  idCategorie: string = '';
  filteredAnnonces: any[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private categoryService: GererCategoriesService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de la catégorie depuis l'URL
    this.route.params.subscribe(params => {
      this.idCategorie = params['idCategorie'];
      this.loadAnnouncements();
    });
  }

  loadAnnouncements() {
    this.categoryService.getAnnouncementsByCategoryId(this.idCategorie).subscribe(annonces => {
      this.annonces = annonces;
      this.filteredAnnonces = annonces;
    });
  }
  filterAnnonces(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredAnnonces = this.annonces.filter(annonce =>
      annonce.titre.toLowerCase().includes(searchTermLower) ||
      annonce.description.toLowerCase().includes(searchTermLower)
    );
  }
  
}
export class AnnoncesService {

  constructor(private firestore: AngularFirestore) { }

  // Récupère toutes les annonces
  getAnnonces(): Observable<any[]> {
    return this.firestore.collection('annonce').valueChanges();
  }

  // Recherche d'annonces par catégorie
  getAnnoncesByCategory(category: string): Observable<any[]> {
    return this.firestore.collection('annonce', ref => ref.where('categorie', '==', category)).valueChanges();
   
  }

  // Recherche d'annonces par terme de recherche
 
}