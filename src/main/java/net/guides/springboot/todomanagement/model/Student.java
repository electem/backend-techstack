/**
 * 
 */
package net.guides.springboot.todomanagement.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * @author elect
 *
 */
@Entity
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long studentId;
	/**
	 * student Name
	 */
	private String studentName;
	/**
	 * student Email 
	 */
	private String studentEmail;
	/**
	 * status 
	 */
	private String status = "REGISTER";
	/**
	 * @return the studentId
	 */
	public long getStudentId() {
		return studentId;
	}
	/**
	 * @param studentId the studentId to set
	 */
	public void setStudentId(final Long studentId) {
		this.studentId = studentId;
	}

	/**
	 * @return the studentName
	 */
	public String getStudentName() {
		return studentName;
	}
	/**
	 * @param studentName the studentName to set
	 */
	public void setStudentName(final String studentName) {
		this.studentName = studentName;
	}
	/**
	 * @return the studentEmail
	 */
	public String getStudentEmail() {
		return studentEmail;
	}
	/**
	 * @param studentEmail the studentEmail to set
	 */
	public void setStudentEmail(final String studentEmail) {
		this.studentEmail = studentEmail;
	}
	/**
	 * @param studentName
	 * @param studentEmail
	 */
	public Student(final String studentName,final String studentEmail, final String status) {
		super();
		this.studentName = studentName;
		this.studentEmail = studentEmail;
		this.status = status;
	}
	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(final String status) {
		this.status = status;
	}
	/**
	 * Student
	 */
	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}
}
