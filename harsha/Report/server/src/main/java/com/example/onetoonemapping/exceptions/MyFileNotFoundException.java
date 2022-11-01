/**
 * 
 */
package com.example.onetoonemapping.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Cybertech1
 *
 */

@ResponseStatus
public class MyFileNotFoundException extends Exception {

	/**
	 * @param message
	 */
	public MyFileNotFoundException(final String message) {
		super(message);
	}

	/**
	 * @param message
	 * @param cause
	 */
	public MyFileNotFoundException(final String message, final Throwable cause) {
		super(message, cause);
	}

}
