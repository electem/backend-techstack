/**
 * 
 */
package com.example.manytomanymapping.exceptions;

/**
 * @author Cybertech1
 *
 */
public class FileStorageException extends RuntimeException {
	/**
	 * @param message
	 */
	public FileStorageException(final String message) {
		super(message);
	}

	/**
	 * @param message
	 * @param cause
	 */
	public FileStorageException(final String message, final Throwable cause) {
		super(message, cause);
	}

}
