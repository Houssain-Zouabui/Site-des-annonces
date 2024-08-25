import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import 'firebase/compat/auth';

import { Observable } from 'rxjs';
import { GestionannonceService } from '../services/gestionannonce.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  annonceId!: string | null; // Déclarez annonceId comme pouvant être null
  annonce$!: Observable<any>;
  
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private gAnnonce:GestionannonceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.annonceId = params['id'];
      if (this.annonceId) {
        this.annonce$ = this.gAnnonce.getAnnonceDetails(this.annonceId);
        console.log('Annonce ID:', this.annonceId); 
      } else {
        console.error('ID d\'annonce non trouvé.');
      }
    });
  }

}


