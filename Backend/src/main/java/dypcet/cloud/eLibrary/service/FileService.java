package dypcet.cloud.eLibrary.service;

import jakarta.annotation.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {
    private static final String BASE_PATH="/mnt/nas/elibrary/";

    public String saveFile(MultipartFile file, String storedName){
        try{
            Path dir = Paths.get(BASE_PATH);
            Files.createDirectories(dir);
            Path filePath = dir.resolve(storedName);
            Files.copy(file.getInputStream(),filePath);
            return filePath.toString();
        }catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    public Resource loadFile(String path){
        try{
            Path filePath = Paths.get(path);
            return new Uri
        }
    }
}
