package fr.eni.bookhub.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IdentifiantsInvalidesException.class)
    public ResponseEntity<Map<String, String>> gererIdentifiantsInvalides(
            IdentifiantsInvalidesException exception
    ) {
        Map<String, String> erreur = Map.of(
                "message",
                exception.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(erreur);
    }
}