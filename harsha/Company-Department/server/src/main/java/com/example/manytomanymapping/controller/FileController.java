package com.example.manytomanymapping.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.example.manytomanymapping.exceptions.MyFileNotFoundException;
import com.example.manytomanymapping.models.File;
import com.example.manytomanymapping.models.FileResponse;
import com.example.manytomanymapping.service.FileStorageService;

@RestController
public class FileController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileStorageService fileStorageService;

	// This block of code is used to upload the file to the DB.
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/uploadFile")
	public FileResponse uploadFile(@RequestParam("file") MultipartFile multipartFile) {
		LOG.info("Start of FileController :: uploadFile ");
		File file = fileStorageService.storeFile(multipartFile);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(file.getFileId()).toUriString();
		LOG.info("End of FileController :: uploadFile ");
		return new FileResponse(file.getFileName(), fileDownloadUri, multipartFile.getContentType(),
				multipartFile.getSize());
	}

	// This block of code is used to download the file from the DB and converted
	// into ByteArrayResource.
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/downloadFile/{fileId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) throws MyFileNotFoundException {
		LOG.info("Start of FileController :: downloadFile ");
		// Load file from database
//		File file = fileStorageService.getFile(fileId);
		File file = fileStorageService.getFileByName(fileId);
		LOG.info("End of FileController :: downloadFile ");
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(file.getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
				.body(new ByteArrayResource(file.getData()));
	}
}