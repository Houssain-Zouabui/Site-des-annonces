import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Annonce } from '../annonce.model';
import { map } from 'rxjs/operators'; 
import { of, combineLatest } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Client } from '../client.model';
import { AuthentificationService } from './authentification.service';
@Injectable({
  providedIn: 'root'
})
export class GestionannonceService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth,private authService: AuthentificationService) { }

  // Récupère toutes les annonces
  getAnnonces(): Observable<any[]> {
    return this.firestore.collection('annonce').valueChanges();
  }

  // Méthode pour récupérer toutes les annonces
  getAllAnnonces(): Observable<any[]> {
    return this.firestore.collection('annonce').valueChanges();
  }

  // Recherche d'annonces par catégorie
  getAnnoncesByCategory(category: string): Observable<any[]> {
    return this.firestore.collection('annonce', ref => ref.where('categorie', '==', category)).valueChanges();
  }

  // Recherche d'annonces par terme de recherche
  searchAnnonces(searchTerm: string): Observable<any[]> {
    return this.firestore.collection('annonce', ref => ref.where('titre', '>=', searchTerm).where('titre', '<=', searchTerm + '\uf8ff')).valueChanges();
  }
  getAnnonceDetails(annonceId: string): Observable<any> {
    return this.firestore.collection('annonce').doc(annonceId).valueChanges();
  }
  getAnnonceByIdd(id: string): Observable<Annonce> {
    return this.firestore.collection('annonce').doc(id).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Annonce;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
  }
  public getAnnonceWithClientDetails(id: string): Observable<Annonce | null> {
    return this.getAnnonceById(id).pipe(
      switchMap(annonce => {
        if (!annonce) {
          return of(null); // Retourne null si aucune annonce trouvée
        }

        if (!annonce.idC) {
          return of(annonce); // Retourne l'annonce originale si aucun ID client n'est présent
        }

        const clientDoc = this.firestore.doc<Client>(`client/${annonce.idC}`);
        return combineLatest([
          of(annonce), // Retourne l'annonce originale dans combineLatest
          clientDoc.valueChanges().pipe(
            catchError(error => {
              console.error('Error fetching client data:', error);
              return of(null); // Retourne null en cas d'erreur
            })
          )
        ]).pipe(
          map(([annonceData, clientData]) => {
            if (!clientData) {
              console.error('Données client non trouvées.');
              return null;
            }

            return {
              ...annonceData,
              userCoords: {
                fullname: clientData.fullname,
                email: clientData.email,
                telephone: clientData.telephone,
                address: clientData.address,
                sexe: clientData.sexe
                // Ajoutez d'autres champs si nécessaire
              }
            } as Annonce; // Assurez-vous que le résultat est typé comme Annonce
          }),
          catchError(error => {
            console.error('Erreur lors de la combinaison des données:', error);
            return of(null); // Retourne null en cas d'erreur
          })
        );
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'annonce:', error);
        return of(null); // Retourne null en cas d'erreur
      })
    );
  }
 
  getAnnonceById(id: string): Observable<Annonce | null> {
    return this.firestore.collection('annonce').doc(id).valueChanges().pipe(
      map(data => {
        if (data) {
          return { id, ...data } as Annonce;
        }
        return null;
      })
    );
  }
  createAnnonce(annonce: Annonce) {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        annonce.idC = user.uid; // Ajouter l'ID de l'utilisateur connecté

        // Générer un ID unique pour l'annonce
        const annonceId = this.firestore.createId(); // Méthode Firestore pour générer un ID unique
        
        // Ajouter l'annonce avec l'ID généré
        return this.firestore.collection('annonce').doc(annonceId).set({ ...annonce, id: annonceId })
          .then(() => annonceId) // Retourner l'ID généré de l'annonce
          .catch(error => {
            console.error("Erreur lors de l'ajout de l'annonce : ", error);
            throw new Error('Erreur lors de l\'ajout de l\'annonce');
          });
      } else {
        throw new Error('Utilisateur non connecté');
      }
    });
  }
  getUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }
  getUserAnnouncements(): Observable<any[]> {
    return this.getUserId().pipe(
      switchMap(userId => {
        if (userId) {
          console.log('Fetching annonces for user ID:', userId);
          return this.firestore.collection('annonce', ref => ref.where('idC', '==', userId))
            .snapshotChanges()
            .pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data() as any;
                const id = a.payload.doc.id;
                console.log('Annonce data:', { id, ...data });
                return { id, ...data };
              }))
            );
        } else {
          console.log('No user ID available');
          return [];
        }
      })
    );
  }
  updateAnnonce(annonce: any): Promise<void> {
    return this.firestore.doc(`annonce/${annonce.id}`).update({
      titre: annonce.titre,
      description: annonce.description,
      prix: annonce.prix,
      image: annonce.image
    });
  }
  deleteAnnonce(annonceId: string): Promise<void> {
    return this.firestore.doc(`annonce/${annonceId}`).delete();
  }
}


