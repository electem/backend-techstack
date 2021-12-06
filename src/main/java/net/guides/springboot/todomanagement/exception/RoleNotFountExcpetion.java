/**
 * 
 */
package net.guides.springboot.todomanagement.exception;

/**
 * @author elect
 *
 */
public class RoleNotFountExcpetion extends RuntimeException {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6872848307079954189L;
	
	public RoleNotFountExcpetion(final String exception) {
	    super(exception);
	  }

	public RoleNotFountExcpetion() {	
	}

}
