package com.example.onetoonemapping.service;

import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.example.onetoonemapping.exceptions.FileStorageException;
import com.example.onetoonemapping.exceptions.MyFileNotFoundException;
import com.example.onetoonemapping.models.DBFile;
import com.example.onetoonemapping.repository.DBFileRepository;

@Service
public class DBFileStorageService {

	private static final Logger LOG = LoggerFactory.getLogger(DBFileStorageService.class);

	@Autowired
	private DBFileRepository dbFileRepository;

	public DBFile storeFile(MultipartFile file) {
		LOG.info("Start of DBFileStorageService :: storeFile ");
		final String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}
			DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());
			LOG.info("End of DBFileStorageService :: storeFile ");
			return dbFileRepository.save(dbFile);
		} catch (Exception ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	// This method is used to get file by fileId from DB.
	public DBFile getFile(final String fileId) throws MyFileNotFoundException {
		LOG.info("Start of DBFileStorageService :: getFile ");
		return dbFileRepository.findById(fileId)
				.orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
	}

	// This method is used to get file by fileName from DB.
	public DBFile getFileByName(String fileName) {
		LOG.info("Start of DBFileStorageService :: getFileByName ");
		return dbFileRepository.getByFileName(fileName);
	}

	// This method is used to get all files from DB.
	public Stream<DBFile> getAllFiles() {
		LOG.info("Start of DBFileStorageService :: getAllFiles ");
		return dbFileRepository.findAll().stream();
	}
}