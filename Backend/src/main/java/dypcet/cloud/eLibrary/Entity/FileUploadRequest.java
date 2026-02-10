package dypcet.cloud.eLibrary.Entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileUploadRequest {
    private String fileName;
    private String author;
    private String category;
    private String description;
    private String imagecover;
}
