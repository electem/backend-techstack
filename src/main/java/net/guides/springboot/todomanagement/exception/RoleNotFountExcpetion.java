/**
 * @author elect
 */
package net.guides.springboot.todomanagement.exception;

public class RoleNotFountExcpetion extends RuntimeException {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @param message takes error message.
	 */
	public RoleNotFountExcpetion(final String message) {
		super(message);
	}
}
