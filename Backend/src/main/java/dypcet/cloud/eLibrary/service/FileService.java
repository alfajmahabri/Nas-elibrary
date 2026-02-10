package dypcet.cloud.eLibrary.service;

import dypcet.cloud.eLibrary.Entity.FileMetadata;
import dypcet.cloud.eLibrary.Entity.FileUploadRequest;
import dypcet.cloud.eLibrary.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
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

    public void uploadFile(MultipartFile file, FileUploadRequest fileUploadRequest) {
        if(!file.getContentType().equals("application/pdf")) {
            throw new RuntimeException("Not a PDF file");
        }
        String storageFileName = UUID.randomUUID().toString() + ".pdf";
        String path = nasStorageService.saveFile(file, storageFileName);

        FileMetadata meta = new FileMetadata();
        meta.setPath(path);
        meta.setFileName(fileUploadRequest.getFileName());
        meta.setAuthor(fileUploadRequest.getAuthor());
        meta.setImageCover(fileUploadRequest.getImagecover());
        meta.setDescription(fileUploadRequest.getDescription());
        meta.setCategory(fileUploadRequest.getCategory());
        fileMetadataRepository.save(meta);
    }

    public List<FileMetadata> listFiles() {
        return fileMetadataRepository.findAll();
    }
}
