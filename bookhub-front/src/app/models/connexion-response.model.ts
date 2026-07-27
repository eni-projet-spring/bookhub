// connexion-response.model.ts
import { UtilisateurResponse } from './utilisateur-response.model';

export interface ConnexionResponse extends UtilisateurResponse {
  token: string;
}
