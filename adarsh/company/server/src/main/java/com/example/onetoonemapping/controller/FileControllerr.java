/**
 * 
 */
package com.example.onetoonemapping.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.example.onetoonemapping.exceptions.FileStorageException;
import com.example.onetoonemapping.exceptions.MyFileNotFoundException;
import com.example.onetoonemapping.models.DBFile;
import com.example.onetoonemapping.models.UploadFileResponse;
import com.example.onetoonemapping.repository.DBFileRepository;
import com.example.onetoonemapping.service.DBFileStorageService;

/**
 * @author Cybertech1
 *
 */
@RestController
@CrossOrigin
public class FileControllerr {

	private Logger log = LoggerFactory.getLogger(FileControllerr.class);

	@Autowired
	private DBFileStorageService dbFileStorageService;
	
	
	@Autowired
	private DBFileRepository DBFileRepo;
	
	@GetMapping("/file")
	public List<DBFile> getFileList() {
		log.info("Start of CompanyController :: getFileList ");
		List<DBFile> listOfFiles = (List<DBFile>) DBFileRepo.findAll();
		log.info("End of CompanyController :: getFileList ");
		return listOfFiles;
	}

	@PostMapping("/uploadFile")
	public UploadFileResponse uploadFile(@RequestParam(value = "file") MultipartFile file) throws FileStorageException {
		log.info("Start of FileController :: uploadFile ");
		DBFile dbFile = dbFileStorageService.storeFile(file);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(dbFile.getId()).toUriString();

		return new UploadFileResponse(dbFile.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());

	}

	/**
	 * @param fileId
	 * @return
	 * @throws MyFileNotFoundException
	 */
	@GetMapping("/downloadFile/{fileId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) throws MyFileNotFoundException {
		// Load file from database
		DBFile dbFile = dbFileStorageService.getFile(fileId);
		// DBFile dbFile=dbFileStorageService.getFileByname(fileId);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(dbFile.getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
				.body(new ByteArrayResource(dbFile.getData()));
	}

}
