import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthentificationService, private router: Router) {}

  async signIn() {
    try {
      const user = await this.authService.signIn(this.email, this.password);
      console.log('Logged in user:', user?.email);
      this.router.navigate(['/accueil']);
      // Redirection vers une autre page ou gestion de la session utilisateur
    } catch (error) {
      // Gérer l'erreur de connexion ici (afficher un message d'erreur, par exemple)
      console.error('Connection error Connection error:', error);
    }
  }

  signOut() {
    this.authService.signOut().then(() => {
      alert('User disconnected');
      // Redirection vers la page de déconnexion ou actualisation de l'état de l'interface utilisateur
    }).catch(error => {
      console.error('Error while logging out:', error);
    });
  }
}