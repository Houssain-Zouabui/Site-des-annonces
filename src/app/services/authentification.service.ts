import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  userId!: string;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { this.afAuth.authState.subscribe(user => {
    if (user) {
      this.userId = user.uid; // Get current user's ID
    }
  });}

  // Vérifier l'état de l'authentification de l'utilisateur
 
  checkAuthState() {
    return this.afAuth.authState;
  }
  user$!: Observable<firebase.User | null>;

 
  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  getUser(): Observable<firebase.User | null> {
    return this.user$;
  }
  // Récupérer les informations du client par idC depuis Firestore
  getClientInfo(idC: string) {
    return this.firestore.collection('annonce').doc(idC).get();
  }
  async signIn(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      // Connexion réussie, retourner l'utilisateur connecté
      return userCredential.user;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error; // Propagez l'erreur pour que le composant puisse la gérer
    }
  }

  signOut() {
    return this.afAuth.signOut();
  }
  getUserId(): string {
    let uid = '';
    this.afAuth.authState.subscribe(user => {
      if (user) {
        uid = user.uid;
        console.log('Connected user UID:', uid); // Log the UID here
      } else {
        console.log('No user is currently logged in');
      }
    });
    return uid; // Be cautious: might return an empty string initially
  }
}