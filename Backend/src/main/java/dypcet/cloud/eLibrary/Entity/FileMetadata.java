package dypcet.cloud.eLibrary.Entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.net.URL;

@Document(collection = "files")
@Getter
@Setter
public class FileMetadata {

    @Id
    private String id;
    private String category;
    private String description;
    private String author;
    private String imageCover;
    private String path;
    private String fileName;
}