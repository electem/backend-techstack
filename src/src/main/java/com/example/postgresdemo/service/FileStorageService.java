/**
 * 
 */
package com.example.postgresdemo.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.postgresdemo.exception.FileStorageException;
import com.example.postgresdemo.exception.MyFileNotFoundException;
import com.example.postgresdemo.model.DBFile;
import com.example.postgresdemo.model.FileStorageProperties;
import com.example.postgresdemo.repository.DBFileRepository;

/**
 * @author Cybertech1
 *
 */
@Service
public class FileStorageService {

	/**
	 * dbFileRepository
	 */
	@Autowired
   private DBFileRepository dbFileRepository;

	/**
	 * fileStorageLocation
	 */
	transient private Path fileStoreLoc;

	/**
	 * @param fileStorageProperties
	 * @throws FileStorageException
	 */
	@Autowired
	public FileStorageService(final FileStorageProperties fileStorProp) throws FileStorageException {
		this.fileStoreLoc = (Path) Paths.get(fileStorProp.getUploadDir()).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStoreLoc);
		} catch (Exception ex) {
			throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
					ex);
		}
	}

	/**
	* 
	*/
	public FileStorageService() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param file
	 * @return
	 * @throws FileStorageException
	 */
	public String storeFile(final MultipartFile file) throws FileStorageException {
		// Normalize file name
		final String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with
			// the same name)
			final Path targetLocation = this.fileStoreLoc.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			final DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());
			dbFileRepository.save(dbFile);
			return fileName;
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	/**
	 * @param fileName
	 * @return
	 * @throws MyFileNotFoundException
	 */
	public Resource loadFileAsResource(final String fileName) throws MyFileNotFoundException {
		try {
			final Path filePath = this.fileStoreLoc.resolve(fileName).normalize();
			final Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new MyFileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName, ex);
		}
	}
}

