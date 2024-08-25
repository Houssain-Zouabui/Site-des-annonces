export interface Client {
  idC?: string; // Identifiant généré automatiquement par Firestore
  fullname: string;
  email: string;
  telephone?: string;
  address?: string;
  sexe?: string;
  password: string;
}
