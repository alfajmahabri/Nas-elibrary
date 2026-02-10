package dypcet.cloud.eLibrary.repository;

import dypcet.cloud.eLibrary.Entity.FileMetadata;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileMetadataRepository extends MongoRepository<FileMetadata, String> {
}