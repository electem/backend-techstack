/**
 *@author elect 
 */
package net.guides.springboot.todomanagement.service;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import org.apache.commons.io.FileUtils;
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
import net.guides.springboot.todomanagement.exception.StudentNotFoundException;
import net.guides.springboot.todomanagement.model.Student;
import net.guides.springboot.todomanagement.repository.StudentRepository;
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
	 * update status url
	 */
	@Value("${service.url}")
	private String url;
	/**
	 * email subject
	 */
	@Value("${spring.mail.subject}")
	private StringBuilder subject;
	/**
	 * templateEngine
	 */
	private final TemplateEngine templateEngine;
	/**
	 * javaMailSender
	 */
	private final JavaMailSender javaMailSender;
	/**
	 * STATUS
	 */
	public static final String STATUS = "ACTIVE";

	/**
	 * creating the student
	 * 
	 * @param student
	 * @return
	 */
	public Student createStudent(final Student student) throws StudentNotFoundException {
		log.info("Start of StudentService :: createStudent ");
		Student saveStudent = null;
		// Email is need.
		if (student.getStudentEmail() != null) {
			saveStudent = studentRepository.save(student);
		} else {
			throw new StudentNotFoundException("Student email id miss");
		}
		log.info("End of StudentService :: createStudent " + saveStudent);
		return student;
	}

	/**
	 * StudentService
	 * @param templateEngine
	 * @param javaMailSender
	 */
	public StudentService(TemplateEngine templateEngine, JavaMailSender javaMailSender) {
		this.templateEngine = templateEngine;
		this.javaMailSender = javaMailSender;
	}

	/**
	 * send to email
	 * @param student
	 * @throws MessagingException
	 */
	@Async
	public void sendMail(final Student student) throws MessagingException {
		log.info("Start of StudentService :: sendMail ");
		final Context context = new Context();
		// set variable
		context.setVariable("student", student);
		context.setVariable("url", url);
		final String process = templateEngine.process("emails/student.html", context);
		log.info("thymleaf " + process);
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
		helper.setSubject(subject + student.getStudentName());
		helper.setText(process, true);
		helper.setTo(student.getStudentEmail());
		// send message
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
		updateStudent.setStatus(String.format(STATUS));
		updateStudent.setStudentId(studentId);
		studentRepository.save(updateStudent);
		log.info("End of StudentService :: updateStudent " + studentId);
	}

	/**
	 * In this method save To Json file
	 * @param Takes the stundent Id
	 * @throws IOException
	 */
	public void saveToFile(final @Valid Long studentId) throws IOException {
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
		try {
			if (filePath.canWrite()) {
				FileUtils.write(filePath, jsonList);
			}
		} catch (Exception e) {
			throw new FileNotFoundException("File is not save");

		}
		log.info("End of StudentService :: saveToFile " + studentId);
	}
	/**
	 * @param takes the student name
	 * @return subjects
	 */
	public String readFile(final String studentName) throws FileNotFoundException {
		log.info("Start of StudentService :: readFile " + studentName);
		final File filePath = new File(new File(path), studentName + ".Json");
		String readFileToString = null;
		//Checking file exists or not
		if (filePath.exists() && filePath.canRead()) {
			// read the file
			try {
				readFileToString = FileUtils.readFileToString(filePath);
			} catch (IOException e) {
				log.error("StudentService readFile" + e.getMessage());
			}
		} else {
			throw new FileNotFoundException("File Not exits");
		}
		log.info("End of StudentService :: readFile " + studentName);
		return readFileToString;
	}
}
