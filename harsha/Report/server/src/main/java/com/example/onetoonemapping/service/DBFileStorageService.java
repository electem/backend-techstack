package com.example.onetoonemapping.service;

import java.util.stream.Stream;
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

	@Autowired
	private DBFileRepository dbFileRepository;

	public DBFile storeFile(MultipartFile file) {
		final String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}
			DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());

			return dbFileRepository.save(dbFile);
		} catch (Exception ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	public DBFile getFile(final String fileId) throws MyFileNotFoundException {
		return dbFileRepository.findById(fileId)
				.orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
	}

	public DBFile getFileByname(String fileId) {
		return dbFileRepository.getByFileName(fileId);
	}

	public Stream<DBFile> getAllFiles() {
		return dbFileRepository.findAll().stream();
	}
}