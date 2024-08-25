import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GererCategoriesService } from '../services/gerer-categories.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  categories: any[] = [];
  isLoggedIn$!: Observable<boolean>;
  searchTerm: string = '';

  constructor(
    private router: Router,
    private categoryService: GererCategoriesService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategorySelected(event: any): void {
    const idCategorie = event.target.value; // Récupérer l'ID de la catégorie sélectionnée
    if (idCategorie) {
      this.router.navigate(['/annonces', idCategorie]);
    } else {
      console.error('ID de catégorie non trouvé');
    }
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      console.log('User logged out');
    }).catch(error => {
      console.error('Error during logout', error);
    });
  }

  searchAnnonces(): void {
    if (this.searchTerm) {
      this.router.navigate(['/search'], { queryParams: { term: this.searchTerm } });
    }
  }
}
