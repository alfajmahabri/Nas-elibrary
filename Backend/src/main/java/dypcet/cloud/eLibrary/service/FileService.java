package dypcet.cloud.eLibrary.service;

import dypcet.cloud.eLibrary.Entity.FileMetadata;
import dypcet.cloud.eLibrary.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;


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
}
