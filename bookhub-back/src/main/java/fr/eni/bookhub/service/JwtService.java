package fr.eni.bookhub.service;

import fr.eni.bookhub.entity.Utilisateur;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final long expiration;

    public JwtService(
            JwtEncoder jwtEncoder,
            @Value("${security.jwt.expiration}") long expiration
    ) {
        this.jwtEncoder = jwtEncoder;
        this.expiration = expiration;
    }

    public String genererToken(Utilisateur utilisateur) {
        Instant maintenant = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("bookhub")
                .issuedAt(maintenant)
                .expiresAt(
                        maintenant.plusMillis(expiration)
                )
                .subject(utilisateur.getEmail())
                .claim(
                        "idUtilisateur",
                        utilisateur.getIdUtilisateur()
                )
                .claim(
                        "role",
                        utilisateur.getRole().name()
                )
                .build();

        JwsHeader header = JwsHeader
                .with(MacAlgorithm.HS256)
                .build();

        return jwtEncoder
                .encode(
                        JwtEncoderParameters.from(header, claims)
                )
                .getTokenValue();
    }
}