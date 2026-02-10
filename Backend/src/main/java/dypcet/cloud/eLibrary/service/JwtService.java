package dypcet.cloud.eLibrary.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    // must be at least 32 characters
    private static final String SECRET_KEY =
            "very_secret_key_123_very_secret_key_123";

    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // 🔐 Generate JWT
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSignKey())
                .compact();
    }


    // ✅ REQUIRED by JwtAuthFilter
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())   // NEW in 0.12.x
                .build()
                .parseSignedClaims(token)   // NEW in 0.12.x
                .getPayload();
    }

    public boolean isTokenValid(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .after(new Date());
    }
}
