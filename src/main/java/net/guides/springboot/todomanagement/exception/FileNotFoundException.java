package net.guides.springboot.todomanagement.exception;

public class FileNotFoundException extends RuntimeException {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @param message takes error
	 */
	public FileNotFoundException(final String message) {
		super(message);
	}
}
