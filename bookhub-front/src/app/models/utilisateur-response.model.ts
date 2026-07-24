
// utilisateur-response.model.ts
export interface UtilisateurResponse {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'USER' | 'LIBRARIAN' | 'ADMIN';
}
