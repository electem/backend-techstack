/**
 * 
 */
package com.example.onetoonemapping.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.onetoonemapping.exceptions.FileStorageException;
import com.example.onetoonemapping.exceptions.MyFileNotFoundException;
import com.example.onetoonemapping.models.DBFile;
import com.example.onetoonemapping.repository.DBFileRepository;

/**
 * @author Cybertech1
 *
 */
@Service
public class DBFileStorageService {
	/**
	 * dbFileRepository
	 */
	@Autowired
	private DBFileRepository dbFileRepository;

	/**
	 * @param file
	 * @return
	 * @throws FileStorageException
	 */
	public DBFile storeFile(final MultipartFile file) throws FileStorageException {
		// Normalize file name
		final String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());

			return dbFileRepository.save(dbFile);
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	/**
	 * @param fileId
	 * @return
	 * @throws MyFileNotFoundException
	 */
	public DBFile getFile(final String fileId) throws MyFileNotFoundException {
		return dbFileRepository.findById(fileId)
				.orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
	}

	public DBFile getFileByname(String fileId) {
		// TODO Auto-generated method stub
		return dbFileRepository.getByFileName(fileId);
	}

}
