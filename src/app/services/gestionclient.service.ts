import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Client } from '../client.model';
import { Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class GestionclientService {

  private clientsCollection: AngularFirestoreCollection<Client>;

  constructor(private afs: AngularFirestore,  private afAuth: AngularFireAuth) {
    this.clientsCollection = this.afs.collection<Client>('client');
  }
  addClient(client: Client): Promise<any> {
    const idC = this.afs.createId(); // Générer un ID unique manuellement
    const clientWithId: Client = { ...client, idC }; // Ajouter l'ID généré à l'objet client

    return this.clientsCollection.doc(idC).set(clientWithId);
  }
  getClientNumber(clientId: string) {
    return this.afs.collection('clients').doc(clientId).get();

}
registerClient(client: Client, password: string): Observable<void> {
  return from(this.afAuth.createUserWithEmailAndPassword(client.email, password)).pipe(
    switchMap(userCredential => {
      if (userCredential.user) {
        // Enregistrer les informations du client dans Firestore
        client.idC = userCredential.user.uid; // Assigner l'ID de l'utilisateur
        return from(this.afs.collection('client').doc(client.idC).set(client));
      } else {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }
    }),
    catchError(error => {
      console.error('Erreur lors de l\'enregistrement du client :', error);
      throw error; // Propager l'erreur pour la gestion dans le composant
    })
  );
}
}