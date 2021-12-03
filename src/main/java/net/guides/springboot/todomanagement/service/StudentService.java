/**
 * 
 */
package net.guides.springboot.todomanagement.service;
import java.io.File;
import java.io.IOException;
import java.util.List;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage ;
import javax.validation.Valid;
import org.apache.commons.io.FileUtils;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import com.google.gson.Gson;
import net.guides.springboot.todomanagement.model.Student;
import net.guides.springboot.todomanagement.repository.StudentRepository;
/**
 * @author elect
 *
 */
@Service
public class StudentService {
	/**
	 * logger
	 */
	final private Logger logger = LoggerFactory.getLogger(StudentService.class);
	
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
	 * @param student
	 * @return
	 */
	public Student createStudent(final Student student) 
	{
		logger.info("start of StudentService :: createStudent ");
		Student saveStudent = null;
		if (student.getStudentEmail() != null) {
			saveStudent = studentRepository.save(student);
		}
		logger.info("end of StudentService :: createStudent "+saveStudent);
		return saveStudent;
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
	public void sendMail(final Student student) {
		logger.info("start of StudentService :: sendMail ");
        final Context context = new Context();
        context.setVariable("student", student);
        final String process = templateEngine.process("emails/welcome.html", context);
        logger.info("thymleaf "+process);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        final  MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        try {
			helper.setSubject("Welcome " + student.getStudentName());
			helper.setText(process, true);
	        helper.setTo(student.getStudentEmail());
		} 
        catch (MessagingException exception) {
        	logger.error("StudentService :: sendMail :: while sending mail  "+exception.getMessage());
		}
        javaMailSender.send(mimeMessage);
        logger.info("end of StudentService :: sendMail " +process);
    }
	/**
	 * update the student
	 * @param studentId
	 */
	public void updateStudent(final long studentId) {
		logger.info("start of StudentService :: updateStudent " + studentId);
		try {
			if (studentId != 0) {
				final Student updateStudent = studentRepository.findStudentId(studentId);
				updateStudent.setStatus("active");
				updateStudent.setStudentId(studentId);
				studentRepository.save(updateStudent);
			}
		} catch (Exception exception) {
			logger.error("StudentService :: updateStudent :: student Id require " + exception.getMessage());
		}
		logger.info("end of StudentService :: updateStudent " + studentId);
	}
	/**
	 * save To Json file
	 * @param student
	 * @throws IOException 
	 * @throws ParseException 
	 */
	public void saveToFile(final @Valid Long studentId) throws IOException, ParseException {
		logger.info("start of StudentService :: saveToFile " + studentId);
		final File directoryPath = new File(path);
		try {
			if(studentId!=0)
			{
				final String studentName = studentRepository.finByStudentId(studentId);
				final List<String> subjects = studentRepository.finSubjectByStudentId(studentId);
				final File filePath = new File(directoryPath, studentName + ".Json");
				if (!filePath.exists()) {
					filePath.createNewFile();
				}
				final Gson gson = new Gson();
				final String jsonList = gson.toJson(subjects);
				// write the file
				FileUtils.write(filePath, jsonList);
				// read the file
				final String readFileToString = FileUtils.readFileToString(filePath);
			}
		} catch (Exception exception) {
			logger.error("StudentService :: saveToFile :: student Id require " + exception.getMessage());
		}
		logger.info("End of StudentService :: saveToFile " + studentId);
	}
}
