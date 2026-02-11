package dypcet.cloud.eLibrary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dypcet.cloud.eLibrary.Entity.FileMetadata;
import dypcet.cloud.eLibrary.Entity.FileUploadRequest;
import dypcet.cloud.eLibrary.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {
    @Autowired
    private FileService fileService;

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> upload(
            @RequestPart("file") MultipartFile file,
            @RequestParam("data") String fileDataJson) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        FileUploadRequest fileData = mapper.readValue(fileDataJson, FileUploadRequest.class);

        fileService.uploadFile(file, fileData);
        return ResponseEntity.ok("File uploaded successfully");
    }

    @GetMapping("/{id}/view")
    public ResponseEntity<Resource> view(@PathVariable("id") String id) {
        Resource pdf = fileService.viewPdf(id);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(pdf);
    }

    @GetMapping("/list")
    public ResponseEntity<List<FileMetadata>> list() {
        return ResponseEntity.ok(fileService.listFiles());
    }
}
