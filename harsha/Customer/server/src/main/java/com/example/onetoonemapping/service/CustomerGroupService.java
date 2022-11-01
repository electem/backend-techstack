package com.example.onetoonemapping.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.ParseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.example.onetoonemapping.models.Customer;
import com.example.onetoonemapping.models.CustomerGroup;
import com.example.onetoonemapping.models.Mail;
import com.example.onetoonemapping.repository.CustomerGroupRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class CustomerGroupService {

	private static String WKHTMLTOPDF_WINDOWS_URL = "E:\\wkhtmltox\\bin\\wkhtmltopdf.exe";

	@Value("${usermail}")
	private String userEmail;

	ModelAndView mav = new ModelAndView("greeting");

	@Autowired
	CustomerGroupRepository customerGroupRepository;

	@Autowired
	private MailService mailService;

	public ModelAndView createCustomerGroup(CustomerGroup customerGroup) {
		for (Customer customer : customerGroup.getCustomers()) {
			List<Object[]> emailData = customerGroupRepository.getEmailData(customer.getName());
			for (Object[] object : emailData) {
				mav.addObject("Id", object[0]);
				mav.addObject("Email", object[1]);
				mav.addObject("Name", object[2]);
				mav.addObject("Age", object[3]);
				mav.addObject("Occupation", object[4]);
				mav.addObject("Place", object[5]);
				mav.addObject("Graduation", object[6]);

//				Mail mail = new Mail();
//				mail.setMailFrom(userEmail);
//				mail.setMailTo(object[1].toString());
//				mail.setMailSubject("Spring Boot - Email demo");
//				mail.setMailContent("Just testing to send mail");
//				mailService.sendEmail(mail);
			}
		}
//		 customerGroupRepository.save(customerGroup);
		System.out.println(mav);
		return mav;
	}

	public void htmlToPdfAndToSendMail(String data, String name) {
		String fileName = "E:\\EmployeeProject\\" + name + (int) (Math.random() * 100000);
		System.out.println("File Path is " + fileName);
		// Get html file path
		String htmlStr = strToHtmlFile(data, fileName + ".html");
		boolean result1 = convert(htmlStr, fileName + ".pdf");
		if (result1) {
			System.out.println("Generate PDF file successfully!");
		} else {
			System.out.println("Failed to generate PDF file!");
		}
		Mail mail = new Mail();
		mail.setMailFrom(userEmail);
		mail.setMailTo("harsha@electems.com");
		mail.setMailSubject("Spring Boot - Email demo");
		mail.setMailContent("Just testing to send mail");

		mailService.sendEmail(mail, fileName + ".pdf");
	}

	public static String strToHtmlFile(String htmlStr, String path) {
		File file = new File(path);
		try {
			OutputStream outputStream = new FileOutputStream(file);
			outputStream.write(htmlStr.getBytes("UTF-8"));
			outputStream.flush();
			outputStream.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return path;
	}

	public static boolean convert(String htmlFilePath, String pdfFilePath) {
		StringBuilder cmd = new StringBuilder();
		String toPdfTool = WKHTMLTOPDF_WINDOWS_URL;
		if (System.getProperty("os.name").indexOf("Windows") != -1) {
			// windows System
			toPdfTool = WKHTMLTOPDF_WINDOWS_URL;
		}
		cmd.append(toPdfTool).append(" ").append(htmlFilePath).append(" ").append(pdfFilePath);
		boolean result = true;
		try {
			Process proc = Runtime.getRuntime().exec(cmd.toString());
			proc.waitFor();
		} catch (Exception e) {
			result = false;
			e.printStackTrace();
		}
		return result;
	}
}