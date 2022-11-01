package com.example.onetoonemapping.models;

import java.util.Date;
import org.springframework.core.io.FileSystemResource;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Mail {

	private String mailFrom;
	private String mailTo;
	private String mailCc;
	private String mailBcc;
	private String mailSubject;
	private String mailContent;
	private String contentType = "text/plain";
	private FileSystemResource attachments;

	public Date getMailSendDate() {
		return new Date();
	}

	public void addAttachment(String filename, FileSystemResource file) {
		// TODO Auto-generated method stub

	}
}
