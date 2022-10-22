package com.example.onetoonemapping.service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.onetoonemapping.models.Mail;

@Service
public class MailServiceImpl implements MailService
{
	@Value("${filePath}")
	private String filePath;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Override
	public void sendEmail(Mail mail, String filename) 
	{
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setSubject(mail.getMailSubject());
			mimeMessageHelper.setFrom(new InternetAddress(mail.getMailFrom()));
			mimeMessageHelper.setTo(mail.getMailTo());
			mimeMessageHelper.setText(mail.getMailContent());
			FileSystemResource file = new FileSystemResource(filename);
			mimeMessageHelper.addAttachment("index.pdf", file);
			javaMailSender.send(mimeMessageHelper.getMimeMessage());
		} 
		catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
