package dypcet.cloud.eLibrary.controller;

import dypcet.cloud.eLibrary.Entity.FileMetadata;
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

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        fileService.uploadFile(file);
        return ResponseEntity.ok("File uploaded");
    }

    @GetMapping("/{id}/view")
    public ResponseEntity<Resource> view(@RequestParam("id") String id) {
        Resource pdf = fileService.viewPdf(id);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(pdf);
    }
    @GetMapping("/list")
    public ResponseEntity<List<FileMetadata>> list() {
        return ResponseEntity.ok(fileService.listFiles());
    }
}
