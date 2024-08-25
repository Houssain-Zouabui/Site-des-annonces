import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionannonceService } from '../services/gestionannonce.service';
import { Annonce } from '../annonce.model';
import { Client } from '../client.model';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit {
  annonce$!: Observable<Annonce | null>; // Observable des détails de l'annonce
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private gestionAnnonceService: GestionannonceService,
    private afAuth: AngularFireAuth,
    private modalService: NgbModal
  ) { }

  @ViewChild('detailModal') detailModal!: TemplateRef<any>;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID de l'annonce depuis l'URL
    console.log('ID de l\'annonce:', id);
    if (id) {
      // Vérifie si l'utilisateur est connecté
      this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
  
      // Récupère l'annonce en fonction de l'état de connexion de l'utilisateur
      this.annonce$ = this.isLoggedIn$.pipe(
        switchMap(isLoggedIn => {
          if (isLoggedIn) {
            // Utilisateur connecté, récupérer les détails de l'annonce avec les informations du client
            return this.gestionAnnonceService.getAnnonceWithClientDetails(id).pipe(
              catchError(err => {
                console.error('Erreur lors de la récupération de l\'annonce avec les détails du client :', err);
                return of(null); // Retourne null en cas d'erreur
              })
            );
          } else {
            // Utilisateur non connecté, récupérer uniquement les détails de l'annonce
            return this.gestionAnnonceService.getAnnonceById(id).pipe(
              catchError(err => {
                console.error('Erreur lors de la récupération de l\'annonce :', err);
                return of(null); // Retourne null en cas d'erreur
              })
            );
          }
        })
      );
    }
  }
  

  openModal(userCoords: Client | undefined, annonce: Annonce) {
    if (userCoords) {
      const modalRef = this.modalService.open(this.detailModal, { centered: true });
      modalRef.componentInstance.userCoords = userCoords;
      modalRef.componentInstance.annonce = annonce;
    } else {
      alert('Vous devez être connecté pour consulter les informations du client.');
    }
  }
  
}
  

