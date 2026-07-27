package fr.eni.bookhub.exception;

public class UtilisateurNotFoundException extends RuntimeException {
    public UtilisateurNotFoundException(String message) {
        super(message);
    }
}