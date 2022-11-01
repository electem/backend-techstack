/**
 * @author elect
 */
package net.guides.springboot.todomanagement.exception;

public class StudentNotFoundException extends RuntimeException {	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 8330775922016036656L;
	public StudentNotFoundException(String message) {
		super(message);
	}
}
