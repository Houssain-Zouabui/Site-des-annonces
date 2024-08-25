import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import {  BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class GererCategoriesService {
  private selectedCategorieIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private firestore: AngularFirestore) { }

  /*getCategories(): Observable<any[]> {
    return this.firestore.collection('categorie').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getCategoriesAdd(): Observable<any[]> {
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getCategorieIdByNom(nom: string): Observable<string | null> {
    return this.firestore.collection('categorie', ref => ref.where('nom', '==', nom))
      .get().pipe(
        map(snapshot => {
          if (snapshot.empty) {
            return null;
          } else {
            return snapshot.docs[0].id;
          }
        })
      );
  }
*/
getCategories(): Observable<any[]> {
  return this.firestore.collection('categorie').snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data }; // Inclut l'ID avec les données
      });
    })
  );
}

// Méthode pour obtenir l'ID de la catégorie en fonction du nom
getCategorieIdByNom(nomCategorie: string): Observable<string | null> {
  return this.firestore.collection('categorie', ref => ref.where('nom', '==', nomCategorie))
    .snapshotChanges()
    .pipe(
      map(actions => {
        if (actions.length > 0) {
          const id = actions[0].payload.doc.id; // Récupère l'ID du premier document correspondant
          return id;
        }
        return null;
      })
    );

}
  getSelectedCategorieId(): Observable<string | null> {
    return this.selectedCategorieIdSubject.asObservable();
  }

  setSelectedCategorieId(id: string | null) {
    this.selectedCategorieIdSubject.next(id);
  }

  getAnnouncementsByCategoryId(categoryId: string): Observable<any[]> {
    return this.firestore.collection('annonce', ref => ref.where('categoryId', '==', categoryId))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
  getClientById(id: string) {
    return this.firestore.collection('client').doc(id).valueChanges();
  }
  getAnnonceByIdd(id: string) {
    return this.firestore.collection('annonce').doc(id).valueChanges();
  }
  getAnnonceById(id: string): Observable<any> {
    return this.firestore.collection('annonce').doc(id).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as any;
        const annonceId = action.payload.id;
        return { id: annonceId, ...data };
      })
    );
  }
  searchAnnonces(searchTerm: string): Observable<any[]> {
    return this.firestore.collection('annonce', ref =>
      ref.where('titre', '>=', searchTerm)
         .where('titre', '<=', searchTerm + '\uf8ff')
    ).valueChanges();
  }
  
}