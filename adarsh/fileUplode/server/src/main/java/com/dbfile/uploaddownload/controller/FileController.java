package com.dbfile.uploaddownload.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.dbfile.uploaddownload.model.FileModel;
import com.dbfile.uploaddownload.response.FileResponse;
import com.dbfile.uploaddownload.service.FileService;

@RestController
@RequestMapping("/File")
public class FileController {

	@Autowired
	FileService fileService;

	@PostMapping("/Upload")
	public FileResponse uploadFile(@RequestParam("file") MultipartFile file) {

		FileModel model = fileService.saveFile(file);
		String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/").path(model.getFileId())
				.toUriString();
		return new FileResponse(model.getFileName(), model.getFileType(), fileUri);
	}

	@PostMapping("/UploadMultipleFiles")
	public List<FileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
	}

	@GetMapping("/downloadFile/{fileId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
		// Load file from database
		FileModel dbFile = fileService.getFile(fileId);
		// DBFile dbFile=dbFileStorageService.getFileByname(fileId);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(dbFile.getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
				.body(new ByteArrayResource(dbFile.getFileData()));
	}

	@GetMapping("/files")
	public ResponseEntity<List<FileResponse>> getListFiles() {
		List<FileResponse> files = fileService.getAllFiles().map(dbFile -> {
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/files/")
					.path(dbFile.getFileId()).toUriString();
			return new FileResponse(dbFile.getFileName(), fileDownloadUri, dbFile.getFileType());
		}).collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.OK).body(files);
	}
}
