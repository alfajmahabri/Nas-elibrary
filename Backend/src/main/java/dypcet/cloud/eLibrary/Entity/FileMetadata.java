package dypcet.cloud.eLibrary.Entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "files")
@Getter
@Setter
public class FileMetadata {
    @Id
    private String id;
    private String fileName;
    private String path;

}
