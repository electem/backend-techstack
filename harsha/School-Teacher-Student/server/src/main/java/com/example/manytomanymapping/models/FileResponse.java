package com.example.manytomanymapping.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileResponse {
	
	private String fileName;
	
	private String fileDownloadUri;
	
	private String fileType;
	
	private long size;
}
