import { Component } from '@angular/core';
import { GererCategoriesService } from '../services/gerer-categories.service';
import { GestionclientService } from '../services/gestionclient.service';
import { Client } from '../client.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  client: Client = {
    fullname: '',
    email: '',
    telephone: '',
    address: '',
    sexe: '', // Initialize as empty, assuming you want no default selection
    password: ''
  };


  password: string = ''; // Ajouter un champ pour le mot de passe

  constructor(private clientService: GestionclientService) { }

  onSubmit(): void {
    if (this.client.password && this.client.email) {
      this.clientService.registerClient(this.client, this.client.password)
        .subscribe(
          () => {
            alert('Customer successfully registered');
            // Rediriger ou afficher un message de succès
          },
          error => {
            console.error('Erreur lors de l\'enregistrement du client :', error);
            // Afficher un message d'erreur
          }
        );
    } else {
      alert('Password or email is missing');
      // Afficher un message d'erreur pour les champs manquants
    }
  }
}