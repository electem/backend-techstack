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
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long studentId;

	private String studentName;

	private String studentEmail;

	/**
	 * @return the studentId
	 */
	public long getStudentId() {
		return studentId;
	}

	/**
	 * @param studentId the studentId to set
	 */
	public void setStudentId(long studentId) {
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
	public void setStudentName(String studentName) {
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
	public void setStudentEmail(String studentEmail) {
		this.studentEmail = studentEmail;
	}

	/**
	 * @param studentName
	 * @param studentEmail
	 */
	public Student(String studentName, String studentEmail) {
		super();
		this.studentName = studentName;
		this.studentEmail = studentEmail;
	}

	/**
	 * 
	 */
	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

}
