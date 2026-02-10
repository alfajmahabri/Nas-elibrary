package dypcet.cloud.eLibrary.service;

import dypcet.cloud.eLibrary.Entity.FileMetadata;
import dypcet.cloud.eLibrary.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;


@Service
public class FileService {
    @Autowired
    private NasStorageService nasStorageService;
    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    public Resource viewPdf(String fileId) {
        FileMetadata meta = fileMetadataRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        return nasStorageService.loadFile(meta.getPath());
    }

    public void uploadFile(MultipartFile file) {
        if(!file.getContentType().equals("application/pdf")) {
            throw new RuntimeException("Not a PDF file");
        }
        String storedName = UUID.randomUUID()+".pdf";
        String path = nasStorageService.saveFile(file, storedName);

        FileMetadata meta = new FileMetadata();
        meta.setPath(path);
        meta.setFileName(file.getOriginalFilename());
        fileMetadataRepository.save(meta);
    }

    public List<FileMetadata> listFiles() {
        return fileMetadataRepository.findAll();
    }
}
