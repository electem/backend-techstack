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
public class MailServiceImpl implements MailService {
	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${inputFile}")
	private String fileToAttach;

	@Override
	public void sendEmail(Mail mail) {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setSubject(mail.getMailSubject());
			mimeMessageHelper.setFrom(new InternetAddress(mail.getMailFrom()));
			mimeMessageHelper.setTo(mail.getMailTo());
			mimeMessageHelper.setText(mail.getMailContent());
			FileSystemResource file = new FileSystemResource("C:\\Users\\Comp\\Desktop\\MTR.txt");
			mimeMessageHelper.addAttachment("MTR.txt", file);
			javaMailSender.send(mimeMessageHelper.getMimeMessage());
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
