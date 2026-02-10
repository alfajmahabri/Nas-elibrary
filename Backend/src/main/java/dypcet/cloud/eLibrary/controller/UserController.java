package dypcet.cloud.eLibrary.controller;

import dypcet.cloud.eLibrary.Entity.User;
import dypcet.cloud.eLibrary.repository.UserRepository;
import dypcet.cloud.eLibrary.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import dypcet.cloud.eLibrary.service.UserEntryService;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    private UserEntryService userEntryService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userEntryService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );

        // 2️⃣ Load user from DB to get role
        User dbUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3️⃣ Generate JWT with role
        String token = jwtService.generateToken(
                dbUser.getEmail(),
                dbUser.getRole().name()
        );
        return ResponseEntity.ok(token);
    }

}
