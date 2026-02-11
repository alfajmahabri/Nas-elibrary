package dypcet.cloud.eLibrary.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection= "users")
@NoArgsConstructor
public class User{
    @Id
    private String email;
    private String password;
    private Role role;
}
