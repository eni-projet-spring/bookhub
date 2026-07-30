
// utilisateur-response.model.ts
import { Role } from './role';

export interface UtilisateurResponse {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  role: Role
}
