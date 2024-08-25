import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionannonceService } from '../services/gestionannonce.service';
import { Annonce } from '../annonce.model';
import { GererCategoriesService } from '../services/gerer-categories.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-poster-annonce',
  templateUrl: './poster-annonce.component.html',
  styleUrl: './poster-annonce.component.css'
})
export class PosterAnnonceComponent {
  annonceForm: FormGroup;
  categories: any[] = []; // Stockez les catégories ici
  isLoggedIn$!: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private annonceService: GestionannonceService,
    private categorieService: GererCategoriesService,
    private afAuth: AngularFireAuth
  ) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      prix: ['', Validators.required],
      categoryId: ['', Validators.required] // Utilisez l'ID du document
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user) // Vérifie si l'utilisateur est connecté
    );
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `assets/images/${file.name}`;
      this.annonceForm.patchValue({ image: filePath });
    }
  }
  onSubmit(): void {
    if (this.annonceForm.valid) {
      const annonce: Annonce = this.annonceForm.value;
      this.annonceService.createAnnonce(annonce).then(() => {
        alert('ad created successfully');
      }).catch(error => {
        alert('Erreur lors de la création de l\'annonce: ' + error.message);
      });
    } else {
      alert('Please fill in all fieldss');
    }
  }
}