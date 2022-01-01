/**
 * 
 */
package com.example.postgresdemo.exception;

/**
 * @author Cybertech1
 *
 */
public class FileStorageException extends Exception {
	/**
	 * @param message
	 */
	public FileStorageException(String message) {
		super(message);
	}

	/**
	 * @param message
	 * @param cause
	 */
	public FileStorageException(String message, Throwable cause) {
		super(message, cause);
	}

}
