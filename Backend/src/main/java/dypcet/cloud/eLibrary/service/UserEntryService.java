package dypcet.cloud.eLibrary.service;

import dypcet.cloud.eLibrary.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import dypcet.cloud.eLibrary.repository.UserRepository;

import java.util.Optional;

@Component
public class UserEntryService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User user){
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("User Already Exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public boolean loginUser(User user){
        Optional<User> dbuser = userRepository.findByEmail(user.getEmail());
        if(dbuser.isEmpty()){
            return false;
        }
        return passwordEncoder.matches(user.getPassword(),dbuser.get().getPassword());
    }

}
