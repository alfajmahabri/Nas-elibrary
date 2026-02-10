package dypcet.cloud.eLibrary.controller;

import dypcet.cloud.eLibrary.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import dypcet.cloud.eLibrary.service.UserEntryService;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    private UserEntryService userEntryService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userEntryService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        boolean success = userEntryService.loginUser(user);

        if (!success) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok("Login successful");
    }

}
