package com.example.manytomanymapping.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.example.manytomanymapping.exceptions.FileStorageException;
import com.example.manytomanymapping.exceptions.MyFileNotFoundException;
import com.example.manytomanymapping.models.File;
import com.example.manytomanymapping.repository.FileRepository;

@Service
public class FileStorageService {

	private static final Logger LOG = LoggerFactory.getLogger(FileStorageService.class);

	@Autowired
	private FileRepository fileRepository;

	public File storeFile(MultipartFile multipartFile) {
		LOG.info("Start of FileStorageService :: storeFile ");
		final String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}
			File file = new File(fileName, multipartFile.getContentType(), multipartFile.getBytes());
			LOG.info("End of FileStorageService :: storeFile ");
			return fileRepository.save(file);
		} catch (Exception ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	// This method is used to get file by fileId from DB.
	public File getFile(final String fileId) throws MyFileNotFoundException {
		LOG.info("Start of FileStorageService :: getFile ");
		return fileRepository.findById(fileId)
				.orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
	}

	// This method is used to get file by fileName from DB.
	public File getFileByName(String fileName) {
		LOG.info("Start of FileStorageService :: getFileByName ");
		return fileRepository.getByFileName(fileName);
	}
}