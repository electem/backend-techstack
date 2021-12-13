/**
 * 
 */
package net.guides.springboot.todomanagement.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

import org.apache.commons.io.FileUtils;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;
import net.guides.springboot.todomanagement.model.Student;
import net.guides.springboot.todomanagement.repository.StudentRepository;

/**
 * @author elect
 *
 */
@Service
@EnableAsync
@Slf4j
public class StudentService {
	/**
	 * Inject to StudentRepository
	 */
	@Autowired
	private StudentRepository studentRepository;
	/**
	 * file directory path
	 */
	@Value("${file.upload-dir}")
	private String path;
	/**
	 * templateEngine
	 */
	private final TemplateEngine templateEngine;
	/**
	 * javaMailSender
	 */
	private final JavaMailSender javaMailSender;

	/**
	 * creating the student
	 * 
	 * @param student
	 * @return
	 */
	public Student createStudent(final Student student) {
		log.info("Start of StudentService :: createStudent ");
		Student saveStudent = null;
		if (student.getStudentEmail() != null) {
			saveStudent = studentRepository.save(student);
		}
		log.info("End of StudentService :: createStudent " + saveStudent);
		return student;
	}
	/**
	 * StudentService
	 * 
	 * @param templateEngine
	 * @param javaMailSender
	 */
	public StudentService(TemplateEngine templateEngine, JavaMailSender javaMailSender) {
		this.templateEngine = templateEngine;
		this.javaMailSender = javaMailSender;
	}
	/**
	 * send to email
	 * 
	 * @param student
	 * @throws MessagingException
	 */
	@Async
	public void sendMail(final Student student) throws MessagingException {
		log.info("Start of StudentService :: sendMail ");
		final Context context = new Context();
		//set variable
		context.setVariable("student", student);
		final String process = templateEngine.process("emails/student.html", context);
		log.info("thymleaf " + process);
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
			helper.setSubject("Welcome " + student.getStudentName());
			helper.setText(process, true);
			helper.setTo(student.getStudentEmail());
		//send message
		javaMailSender.send(mimeMessage);
		log.info("End of StudentService :: sendMail " + process);
	}
	/**
	 * In this method update the student status
	 * @param studentId
	 */
	public void updateStudent(final long studentId) {
		log.info("Start of StudentService :: updateStudent " + studentId);
		final Student updateStudent = studentRepository.findStudentId(studentId);
		updateStudent.setStatus("ACTIVE");
		updateStudent.setStudentId(studentId);
		studentRepository.save(updateStudent);
		log.info("End of StudentService :: updateStudent " + studentId);
	}
	/**
	 * In this method save To Json file
	 * @param Takes the stundent Id
	 * @throws IOException
	 * @throws ParseException
	 */
	public void saveToFile(final @Valid Long studentId) throws IOException, ParseException {
		log.info("start of StudentService :: saveToFile " + studentId);
			final String studentName = studentRepository.findStudentId(studentId).getStudentName();
			final List<String> subjects = studentRepository.finSubjectByStudentId(studentId);
			final File filePath = new File(new File(path), studentName + ".Json");
			if (!filePath.exists()) {
				filePath.createNewFile();
			}
			final Gson gson = new Gson();
			final String jsonList = gson.toJson(subjects);
			// write the file
			FileUtils.write(filePath, jsonList);
			log.info("End of StudentService :: saveToFile " + studentId);
	}
	/**
	 * @param takes the student name
	 * @return subjects
	 * @throws IOException
	 */
	public String readFile(final String studentName) throws IOException  {
		log.info("Start of StudentService :: readFile " + studentName);
		final File filePath = new File(new File(path), studentName + ".Json");
		final String searchStudent = studentRepository.searchStudent(studentName);
		String readFileToString = null;
		if (filePath.exists() && searchStudent.equals(studentName))
		{
			// read the file
			readFileToString = FileUtils.readFileToString(filePath);
		}
		else {
			throw new IOException();
		}
		log.info("End of StudentService :: readFile " + studentName);
		 return readFileToString;
	}
}
