import { Client } from "./client.model";

export interface Annonce {
    id?: string; // Identifiant de l'annonce
    titre: string;
    description: string;
    image: string;
    prix: number;
    categoryId: string; // ID de la catégorie de l'annonce, s'il y en a une
    idC?: string; // ID du client créateur de l'annonce
    userCoords?: Client; // Optionnel: Les coordonnées du client créateur de l'annonce
  }
  