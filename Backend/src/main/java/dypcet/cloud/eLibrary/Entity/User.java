package dypcet.cloud.eLibrary.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection= "users")
@NoArgsConstructor
public class User{
    @Id
    private String email;
    private String password;
    private Role role;
}
